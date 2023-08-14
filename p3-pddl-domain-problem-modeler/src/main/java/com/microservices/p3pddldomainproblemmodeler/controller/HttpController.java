package com.microservices.p3pddldomainproblemmodeler.controller;

import com.microservices.p3pddldomainproblemmodeler.constants.FilePaths;
import com.microservices.p3pddldomainproblemmodeler.message_entities.RequestEntity;
import com.microservices.p3pddldomainproblemmodeler.message_entities.ResponseEntity;
import com.microservices.p3pddldomainproblemmodeler.tools.OutputParser;
import com.microservices.p3pddldomainproblemmodeler.tools.ToolExecutor;
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

    @PutMapping(value = "/api/p3-pddl-domain-problem-modeler", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity handlePutRequest(@RequestBody RequestEntity requestJson) throws CustomServiceException {
        logger.info("PUT request to PDDL modeler tool received.");

        logger.trace("Extracting modeler script payload.");
        String modelerScriptBase64 = requestJson.modelerScript();
        if (modelerScriptBase64 == null) {
            throw new CustomServiceException("ERROR: modeler script not received.");
        }

        logger.trace("Decoding modeler script Base64.");
        String modelerScript = Base64Decoder.decode(modelerScriptBase64);

        logger.trace("Saving modeler script as file in ~/workdir directory.");
        FileCreator.saveFile(FilePaths.WORK_DIR, FilePaths.PDDL_SCRIPT_PYTHON, modelerScript);
        logger.trace("Executing 'pddl' modeler tool to generate PDDL domain and/or problem.");
        String output = ToolExecutor.generateDomainProblem();
        logger.trace("Parsing 'pddl' modeler tool output.");
        ResponseEntity domainAndProblem = OutputParser.parse(output);
        logger.trace("Deleting ~/workdir contents.");
        FileRemover.clearDirectory(FilePaths.WORK_DIR);

        logger.trace("Encoding PDDL domain as Base64 string.");
        String domainBase64 = Base64Encoder.encode(domainAndProblem.domain());

        logger.trace("Encoding PDDL problem as Base64 string.");
        String problemBase64 = Base64Encoder.encode(domainAndProblem.problem());

        logger.trace("Creating PUT response entity.");
        ResponseEntity responseEntity = new ResponseEntity(domainBase64, problemBase64);

        logger.info("PUT request to PDDL modeler tool finished successfully.");
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
