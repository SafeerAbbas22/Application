package com.microservices.p3pddldomainproblemmodeler.tools;

import com.microservices.p3pddldomainproblemmodeler.constants.FilePaths;
import com.microservices.p3pddldomainproblemmodeler.constants.PddlToolCommands;
import com.microservices.p3toolslibrary.custom_exceptions.CustomServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ToolExecutor {
    private final static Logger logger = LoggerFactory.getLogger(ToolExecutor.class);

    private final static String NEWLINE = System.getProperty("line.separator");

    public static String generateDomainProblem() throws CustomServiceException {
        try {
            logger.trace("Building command for execution of pddl modeler.");
            String[] commandArray = {PddlToolCommands.PYTHON_COMMAND, FilePaths.PDDL_SCRIPT_PYTHON};

            logger.trace("Executing 'pddl' modeler on provided pddl_script.py file.");
            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.command(commandArray);
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();
            process.waitFor();

            logger.trace("Capturing 'pddl' modeler output.");
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

        } catch (IOException | InterruptedException ex) {
            logger.error(ex.getMessage());
            throw new CustomServiceException("ERROR: could not execute 'pddl' tool to generate PDDL domain and/or problem.");
        }
    }
}
