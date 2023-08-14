package com.microservices.p3pddlplansolver.controller;

import com.microservices.p3pddlplansolver.constants.FilePaths;
import com.microservices.p3pddlplansolver.message_entities.PutRequestEntity;
import com.microservices.p3pddlplansolver.message_entities.PutResponseEntity;
import com.microservices.p3pddlplansolver.tools.PlanReader;
import com.microservices.p3pddlplansolver.tools.ToolExecutor;
import com.microservices.p3toolslibrary.custom_exceptions.CustomServiceException;
import com.microservices.p3toolslibrary.custom_exceptions.ExceptionEntity;
import com.microservices.p3toolslibrary.tools.Base64Decoder;
import com.microservices.p3toolslibrary.tools.Base64Encoder;
import com.microservices.p3toolslibrary.tools.FileCreator;
import com.microservices.p3toolslibrary.tools.FileRemover;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableDiscoveryClient
public class HttpController {
    private final Logger logger = LoggerFactory.getLogger(HttpController.class);

    @PutMapping(value = "/api/p3-pddl-plan-solver", produces = MediaType.APPLICATION_JSON_VALUE)
    public PutResponseEntity handlePutRequest(@RequestBody PutRequestEntity requestJson) throws CustomServiceException {
        logger.info("PUT request to PDDL solver received.");

        logger.trace("Checking if request contains PDDL domain and problem fields.");
        if (requestJson.domain() == null || requestJson.problem() == null) {
            throw new CustomServiceException("ERROR: PDDL domain and/or problem not received.");
        }

        logger.trace("Extracting PDDL domain and problem payload.");
        String domainBase64 = requestJson.domain();
        String problemBase64 = requestJson.problem();

        logger.trace("Checking if request contains PDDL domain and problem content.");
        if (domainBase64.equals("") || problemBase64.equals("")) {
            throw new CustomServiceException("ERROR: PDDL domain and/or problem not received.");
        }

        logger.trace("Decoding PDDL domain and problem Base64 strings.");
        String domain = Base64Decoder.decode(domainBase64);
        String problem = Base64Decoder.decode(problemBase64);

        logger.trace("Saving PDDL domain and problem as files in ~/workdir directory.");
        FileCreator.saveFile(FilePaths.WORK_DIR, FilePaths.DOMAIN_FILE, domain);
        FileCreator.saveFile(FilePaths.WORK_DIR, FilePaths.PROBLEM_FILE, problem);

        logger.trace("Executing Fast-Downward solver to generate a plan.");
        ToolExecutor.execute();
        logger.trace("Reading generated plan as string.");
        String plan = PlanReader.read();

        logger.trace("Deleting ~/workdir contents.");
        FileRemover.clearDirectory(FilePaths.WORK_DIR);

        logger.trace("Encoding plan as Base64 string.");
        String planBase64 = Base64Encoder.encode(plan);

        logger.trace("Creating PUT response entity.");
        PutResponseEntity responseEntity = new PutResponseEntity(planBase64);

        logger.info("PUT request to PDDL solver finished successfully.");
        return responseEntity;
    }

    @ExceptionHandler(CustomServiceException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ExceptionEntity handleException(CustomServiceException ex) {
        logger.error(ex.getMessage());
        return new ExceptionEntity(ex.getMessage());
    }
}
