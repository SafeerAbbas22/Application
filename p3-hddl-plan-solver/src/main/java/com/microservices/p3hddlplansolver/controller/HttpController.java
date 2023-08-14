package com.microservices.p3hddlplansolver.controller;

import com.microservices.p3hddlplansolver.constants.FilePaths;
import com.microservices.p3hddlplansolver.message_entities.PutRequestEntity;
import com.microservices.p3hddlplansolver.message_entities.PutResponseEntity;
import com.microservices.p3hddlplansolver.tools.ToolExecutor;
import com.microservices.p3hddlplansolver.tools.ToolOutputParser;
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

    @PutMapping(value = "/api/p3-hddl-plan-solver", produces = MediaType.APPLICATION_JSON_VALUE)
    public PutResponseEntity handlePutRequest(@RequestBody PutRequestEntity requestJson) throws CustomServiceException {
        logger.info("PUT request to HDDL solver received.");

        logger.trace("Checking if request contains HDDL domain and problem fields.");
        if (requestJson.domain() == null || requestJson.problem() == null) {
            throw new CustomServiceException("ERROR: HDDL domain and/or problem not received.");
        }

        logger.trace("Extracting HDDL domain and problem payload.");
        String domainBase64 = requestJson.domain();
        String problemBase64 = requestJson.problem();

        logger.trace("Checking if request contains HDDL domain and problem content.");
        if (domainBase64.equals("") || problemBase64.equals("")) {
            throw new CustomServiceException("ERROR: HDDL domain and/or problem not received.");
        }

        logger.trace("Decoding HDDL domain and problem Base64 strings.");
        String domain = Base64Decoder.decode(domainBase64);
        String problem = Base64Decoder.decode(problemBase64);

        logger.trace("Saving HDDL domain and problem as files in ~/workdir directory.");
        FileCreator.saveFile(FilePaths.WORK_DIR, FilePaths.DOMAIN_HDDL, domain);
        FileCreator.saveFile(FilePaths.WORK_DIR, FilePaths.PROBLEM_HDDL, problem);

        logger.trace("Executing Lilotane solver to generate a plan.");
        String output = ToolExecutor.execute();
        logger.trace("Parsing Lilotane solver output.");
        String plan = ToolOutputParser.execute(output);

        logger.trace("Deleting ~/workdir contents.");
        FileRemover.clearDirectory(FilePaths.WORK_DIR);

        logger.trace("Encoding plan as Base64 string.");
        String planBase64 = Base64Encoder.encode(plan);

        logger.trace("Creating PUT response entity.");
        PutResponseEntity responseEntity = new PutResponseEntity(planBase64);

        logger.info("PUT request to HDDL solver finished successfully.");
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
