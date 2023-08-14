package com.microservices.p3pddlplansolver.tools;

import com.microservices.p3pddlplansolver.constants.FilePaths;
import com.microservices.p3toolslibrary.custom_exceptions.CustomServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class PlanReader {
    private final static Logger logger = LoggerFactory.getLogger(PlanReader.class);

    public static String read() throws CustomServiceException {
        try {
            logger.trace("Checking if a 'plan_file' file was created.");
            File planFile = new File(FilePaths.PLAN_FILE);
            if (!planFile.exists()) {
                logger.trace("A plan file does not exist.");
                throw new CustomServiceException("ERROR: a plan could not be generated.");
            }

            logger.trace("Reading plan file as string.");
            return Files.readString(Paths.get(FilePaths.PLAN_FILE));
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
            throw new CustomServiceException("ERROR: a plan could not be generated.");
        }
    }
}
