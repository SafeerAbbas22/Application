package com.microservices.p3pddlplanvalidator.controller;

import com.microservices.p3pddlplanvalidator.constants.FilePaths;
import com.microservices.p3pddlplanvalidator.message_entities.PutRequestEntity;
import com.microservices.p3pddlplanvalidator.message_entities.PutResponseEntity;
import com.microservices.p3pddlplanvalidator.tools.ToolExecutor;
import com.microservices.p3pddlplanvalidator.tools.ToolOutputParser;
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

    @PutMapping(value = "/api/p3-pddl-plan-validator", produces = MediaType.APPLICATION_JSON_VALUE)
    public PutResponseEntity handlePutRequest(@RequestBody PutRequestEntity requestJson) throws CustomServiceException {
        logger.info("PUT request to PDDL plan validator received.");

        logger.trace("Checking if request contains PDDL domain, problem and plan fields.");
        if (requestJson.domain() == null || requestJson.problem() == null || requestJson.plan() == null) {
            throw new CustomServiceException("ERROR: PDDL domain, problem and/or plan not received.");
        }

        logger.trace("Extracting PDDL domain, problem and plan payload.");
        String domainBase64 = requestJson.domain();
        String problemBase64 = requestJson.problem();
        String planBase64 = requestJson.plan();

        logger.trace("Checking if request contains PDDL domain, problem and plan content.");
        if (domainBase64.equals("") || problemBase64.equals("") || planBase64.equals("")) {
            throw new CustomServiceException("ERROR: PDDL domain, problem and/or plan not received.");
        }

        logger.trace("Decoding PDDL domain, problem and plan Base64 strings.");
        String domain = Base64Decoder.decode(domainBase64);
        String problem = Base64Decoder.decode(problemBase64);
        String plan = Base64Decoder.decode(planBase64);

        logger.trace("Saving PDDL domain, problem and plan as files in ~/workdir directory.");
        FileCreator.saveFile(FilePaths.WORK_DIR, FilePaths.DOMAIN_FILE, domain);
        FileCreator.saveFile(FilePaths.WORK_DIR, FilePaths.PROBLEM_FILE, problem);
        FileCreator.saveFile(FilePaths.WORK_DIR, FilePaths.PLAN_FILE, plan);

        logger.trace("Executing VAL plan validator to validate a plan.");
        String output = ToolExecutor.execute();
        logger.trace("Parsing VAL plan validator output.");
        String planValidation = ToolOutputParser.execute(output);

        logger.trace("Deleting ~/workdir contents.");
        FileRemover.clearDirectory(FilePaths.WORK_DIR);

        logger.trace("Encoding plan validation as Base64 string.");
        String planValidationBase64 = Base64Encoder.encode(planValidation);

        logger.trace("Creating PUT response entity.");
        PutResponseEntity responseEntity = new PutResponseEntity(planValidationBase64);

        logger.info("PUT request to PDDL plan validator finished successfully.");
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
