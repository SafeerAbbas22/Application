package com.microservices.p3pddlplanvalidator.tools;

import com.microservices.p3toolslibrary.custom_exceptions.CustomServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ToolOutputParser {
    private final static Logger logger = LoggerFactory.getLogger(ToolOutputParser.class);

    public static String execute(String output) throws CustomServiceException {
        logger.trace("Checking if domain.pddl is invalid.");
        if (output.contains("Problem in domain definition!")) {
            logger.warn("Domain PDDL file is invalid.");
            return output.trim();
        }

        logger.trace("Checking if problem.pddl is invalid.");
        if (output.contains("Segmentation fault") || output.equals("")) {
            logger.warn("Problem PDDL file is invalid.");
            return "Problem in problem definition!"; // Returning a readable string instead of Segmentation fault stack trace.
        }

        logger.trace("Checking if plan file is invalid.");
        if (output.contains("Failed plans")) {
            String result = output.split("plan_file")[1].split("Failed plans")[0]; // Cannot use variables here.
            return result.trim();
        }

        logger.trace("Checking if plan validation was successful.");
        if (output.contains("Successful plans")) {
            String result = output.split("plan_file")[1].split("Successful plans")[0]; // Cannot use variables here.
            return result.trim();
        }

        throw new CustomServiceException("ERROR: could not parse plan validation.");
    }
}
