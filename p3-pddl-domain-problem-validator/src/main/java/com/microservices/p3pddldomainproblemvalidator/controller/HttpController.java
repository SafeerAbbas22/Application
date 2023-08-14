package com.microservices.p3pddldomainproblemvalidator.controller;

import com.microservices.p3pddldomainproblemvalidator.constants.FilePaths;
import com.microservices.p3pddldomainproblemvalidator.message_entities.DomainRequestEntity;
import com.microservices.p3pddldomainproblemvalidator.message_entities.DomainResponseEntity;
import com.microservices.p3pddldomainproblemvalidator.message_entities.ProblemRequestEntity;
import com.microservices.p3pddldomainproblemvalidator.message_entities.ProblemResponseEntity;
import com.microservices.p3pddldomainproblemvalidator.tools.OutputParser;
import com.microservices.p3pddldomainproblemvalidator.tools.ToolExecutor;
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

    @PutMapping(value = "/api/p3-pddl-domain-validator", produces = MediaType.APPLICATION_JSON_VALUE)
    public DomainResponseEntity handleDomainPutRequest(@RequestBody DomainRequestEntity requestJson) throws CustomServiceException {
        logger.info("PUT request to PDDL domain validator received.");

        logger.trace("Checking if request contains PDDL domain field.");
        if (requestJson.domain() == null) {
            throw new CustomServiceException("ERROR: PDDL domain not received.");
        }

        logger.trace("Extracting PDDL domain payload.");
        String domainBase64 = requestJson.domain();

        logger.trace("Checking if request contains PDDL domain content.");
        if (domainBase64.equals("")) {
            throw new CustomServiceException("ERROR: PDDL domain not received.");
        }

        logger.trace("Decoding PDDL domain Base64.");
        String domain = Base64Decoder.decode(domainBase64);

        logger.trace("Saving PDDL domain as file in ~/workdir directory.");
        FileCreator.saveFile(FilePaths.WORK_DIR, FilePaths.DOMAIN_FILE, domain);
        logger.trace("Executing 'pddl' validator tool to validate PDDL domain.");
        String output = ToolExecutor.validateDomain();
        logger.trace("Parsing 'pddl' modeler tool domain validation.");
        String domainValidation = OutputParser.execute(output);
        logger.trace("Deleting ~/workdir contents.");
        FileRemover.clearDirectory(FilePaths.WORK_DIR);

        logger.trace("Encoding PDDL domain as Base64 string.");
        String domainValidationBase64 = Base64Encoder.encode(domainValidation);

        logger.trace("Creating PUT response entity.");
        DomainResponseEntity responseEntity = new DomainResponseEntity(domainValidationBase64);

        logger.info("PUT request to PDDL domain validator finished successfully.");
        return responseEntity;
    }

    @PutMapping(value = "/api/p3-pddl-problem-validator", produces = MediaType.APPLICATION_JSON_VALUE)
    public ProblemResponseEntity handleProblemPutRequest(@RequestBody ProblemRequestEntity requestJson) throws CustomServiceException {
        logger.info("PUT request to PDDL problem validator received.");

        logger.trace("Checking if request contains PDDL problem field.");
        if (requestJson.problem() == null) {
            throw new CustomServiceException("ERROR: PDDL problem not received.");
        }

        logger.trace("Extracting PDDL problem payload.");
        String problemBase64 = requestJson.problem();

        logger.trace("Checking if request contains PDDL problem content.");
        if (problemBase64.equals("")) {
            throw new CustomServiceException("ERROR: PDDL problem not received.");
        }

        logger.trace("Decoding PDDL problem Base64.");
        String problem = Base64Decoder.decode(problemBase64);

        logger.trace("Saving PDDL problem as file in ~/workdir directory.");
        FileCreator.saveFile(FilePaths.WORK_DIR, FilePaths.PROBLEM_FILE, problem);
        logger.trace("Executing 'pddl' validator tool to validate PDDL problem.");
        String output = ToolExecutor.validateProblem();
        logger.trace("Parsing 'pddl' modeler tool problem validation.");
        String problemValidation = OutputParser.execute(output);
        logger.trace("Deleting ~/workdir contents.");
        FileRemover.clearDirectory(FilePaths.WORK_DIR);

        logger.trace("Encoding PDDL problem as Base64 string.");
        String problemValidationBase64 = Base64Encoder.encode(problemValidation);

        logger.trace("Creating PUT response entity.");
        ProblemResponseEntity responseEntity = new ProblemResponseEntity(problemValidationBase64);

        logger.info("PUT request to PDDL problem validator finished successfully.");
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
