package com.microservices.p3pddldomainproblemmodeler.tools;

import com.microservices.p3pddldomainproblemmodeler.constants.FilePaths;
import com.microservices.p3pddldomainproblemmodeler.message_entities.ResponseEntity;
import com.microservices.p3toolslibrary.custom_exceptions.CustomServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OutputParser {
    private final static Logger logger = LoggerFactory.getLogger(OutputParser.class);

    public static ResponseEntity parse(String output) throws CustomServiceException {
        String domain = "";
        logger.trace("Checking if PDDL domain was generated.");
        if (output.contains("DOMAIN START") && output.contains("DOMAIN END")) {
            logger.trace("Extracting PDDL domain from 'pddl' output.");
            domain = output.split("DOMAIN START")[1].split("DOMAIN END")[0].trim(); // Cannot use variables here.
        }

        String problem = "";
        logger.trace("Checking if PDDL problem was generated.");
        if (output.contains("PROBLEM START") && output.contains("PROBLEM END")) {
            logger.trace("Extracting PDDL problem from 'pddl' output.");
            problem = output.split("PROBLEM START")[1].split("PROBLEM END")[0].trim(); // Cannot use variables here.
        }

        if (domain.equals("") && problem.equals("")) {
            logger.warn("The 'pddl' output contains neither PDDL domain nor PDDL problem.");
            String outputErrorSanitized = output.replace(FilePaths.WORK_DIR, "").trim();

            if (outputErrorSanitized.equals("")) {
                outputErrorSanitized = "ERROR: neither PDDL domain nor PDDL problem could be found in output.\nMake sure 'DOMAIN START', 'DOMAIN END', 'PROBLEM START' and 'PROBLEM END' markers are printed out.";
            }

            throw new CustomServiceException(outputErrorSanitized);
        }

        return new ResponseEntity(domain, problem);
    }
}
