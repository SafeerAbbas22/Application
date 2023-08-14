package com.microservices.p3pddlplansolver.tools;

import com.microservices.p3pddlplansolver.constants.FastDownwardCommands;
import com.microservices.p3pddlplansolver.constants.FilePaths;
import com.microservices.p3toolslibrary.custom_exceptions.CustomServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ToolExecutor {
    private final static Logger logger = LoggerFactory.getLogger(ToolExecutor.class);

    public static void execute() throws CustomServiceException {
        try {
            logger.trace("Building command for execution of Fast-Downward solver.");
            String[] commandArray = {
                    FastDownwardCommands.FD_EXECUTABLE,
                    FastDownwardCommands.PLAN_OPTION,
                    FilePaths.PLAN_FILE,
                    FilePaths.DOMAIN_FILE,
                    FilePaths.PROBLEM_FILE,
                    FastDownwardCommands.SEARCH_OPTION,
                    FastDownwardCommands.SEARCH_PARAM};

            logger.trace("Executing Fast-Downward solver on provided domain.pddl and problem.pddl files.");
            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.command(commandArray);
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();
            process.waitFor();

            logger.trace("Waiting for Fast-Downward solver to finish writing output.");
            try (BufferedReader input = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                while (true) {
                    if (input.readLine() == null) {
                        break;
                    }
                }
            }

            logger.trace("Timeout to give Fast-Downward some time to create 'plan_file' file.");
            Thread.sleep(1000);
        } catch (IOException | InterruptedException ex) {
            logger.error(ex.getMessage());
            throw new CustomServiceException("ERROR: could not execute Fast-Downward solver to generate plan.");
        }
    }
}
