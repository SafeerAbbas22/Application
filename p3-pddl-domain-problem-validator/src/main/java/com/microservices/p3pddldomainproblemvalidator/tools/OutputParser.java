package com.microservices.p3pddldomainproblemvalidator.tools;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OutputParser {
    private final static Logger logger = LoggerFactory.getLogger(OutputParser.class);

    public static String execute(String output) {
        logger.trace("Checking if PDDL domain/problem was validated successfully.");
        if (!output.contains("Traceback")) {
            return output;
        }

        logger.trace("Parsing PDDL domain/problem failed validation.");
        String validationPart1 = output.split("\\n\\n")[1].trim();
        String validationPart2 = output.split("\\n\\n")[2].trim();
        String validation = validationPart1 + "\n\n" + validationPart2;

        logger.trace("Checking if PDDL domain/problem failed validation could be parsed.");
        if (validation.equals("\n\n")) {
            logger.warn("Parsing of PDDL domain/problem failed validation failed.");
            validation = "PDDL domain/problem validation produced no results.";
        }

        return validation;
    }
}
