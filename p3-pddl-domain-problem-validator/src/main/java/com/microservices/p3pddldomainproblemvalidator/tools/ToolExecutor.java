package com.microservices.p3pddldomainproblemvalidator.tools;

import com.microservices.p3pddldomainproblemvalidator.constants.FilePaths;
import com.microservices.p3pddldomainproblemvalidator.constants.PddlToolCommands;
import com.microservices.p3toolslibrary.custom_exceptions.CustomServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ToolExecutor {
    private final static Logger logger = LoggerFactory.getLogger(ToolExecutor.class);

    private final static String NEWLINE = System.getProperty("line.separator");

    public static String validateDomain() throws CustomServiceException {
        try {
            logger.trace("Building command for execution of 'pddl' validator.");
            String[] commandArray = {PddlToolCommands.PDDL_COMMAND, PddlToolCommands.DOMAIN_COMMAND, FilePaths.DOMAIN_FILE};

            logger.trace("Executing 'pddl' validator on provided domain.pddl file.");
            return ToolExecutor.execute(commandArray);
        } catch (IOException | InterruptedException ex) {
            logger.error(ex.getMessage());
            throw new CustomServiceException("ERROR: could not execute 'pddl' tool to validate PDDL domain.");
        }
    }

    public static String validateProblem() throws CustomServiceException {
        try {
            logger.trace("Building command for execution of 'pddl' validator.");
            String[] commandArray = {PddlToolCommands.PDDL_COMMAND, PddlToolCommands.PROBLEM_COMMAND, FilePaths.PROBLEM_FILE};

            logger.trace("Executing 'pddl' validator on provided problem.pddl file.");
            return ToolExecutor.execute(commandArray);
        } catch (IOException | InterruptedException ex) {
            logger.error(ex.getMessage());
            throw new CustomServiceException("ERROR: could not execute 'pddl' tool to validate PDDL problem.");
        }
    }

    private static String execute(String[] commandArray) throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command(commandArray);
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        process.waitFor();

        logger.trace("Capturing 'pddl' validator output.");
        StringBuilder result = new StringBuilder(1000);
        try (BufferedReader input = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            while (true) {
                String line = input.readLine();
                if (line == null) {
                    break;
                }
                result.append(line).append(NEWLINE);
            }
        }
        return result.toString();
    }
}
