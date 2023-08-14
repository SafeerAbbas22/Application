package com.microservices.p3hddlplansolver.tools;

import com.microservices.p3hddlplansolver.constants.FilePaths;
import com.microservices.p3hddlplansolver.constants.LilotaneCommands;
import com.microservices.p3toolslibrary.custom_exceptions.CustomServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ToolExecutor {
    private final static Logger logger = LoggerFactory.getLogger(ToolExecutor.class);

    private static final String NEWLINE = System.getProperty("line.separator");

    public static String execute() throws CustomServiceException {
        try {
            logger.trace("Building command for execution of Lilotane solver.");
            String[] commandArray = {
                    LilotaneCommands.LILOTANE_EXECUTABLE,
                    FilePaths.DOMAIN_HDDL,
                    FilePaths.PROBLEM_HDDL};

            logger.trace("Executing Lilotane solver on provided domain.hddl and problem.hddl files.");
            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.command(commandArray);
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();
            process.waitFor();

            logger.trace("Capturing Lilotane solver output.");
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
            throw new CustomServiceException("ERROR: could not execute Lilotane solver to generate plan.");
        }
    }
}
