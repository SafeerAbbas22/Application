package com.microservices.p3hddlplansolver.tools;

import com.microservices.p3hddlplansolver.constants.FilePaths;
import com.microservices.p3toolslibrary.custom_exceptions.CustomServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ToolOutputParser {
    private final static Logger logger = LoggerFactory.getLogger(ToolOutputParser.class);

    public static String execute(String output) throws CustomServiceException {
        if (output.contains("Parse error")) {
            /*
             * This returns filepath too, e.g.:
             * [0m in file /home/admin/workdir/domain.hddl in line [1m1[0m
             * unexpected NAME, expecting KEY_DOMAIN or KEY_PROBLEM
             */
            String errorOutput = output.split("Parse error")[1].trim(); // Cannot use variables here.
            String errorOutputSanitized = errorOutput.replace(FilePaths.WORK_DIR + "/", "");

            logger.warn("A plan could not be generated.");
            throw new CustomServiceException(errorOutputSanitized);
        }

        if (output.contains("==>") && output.contains("<==")) {
            logger.trace("A plan was generated.");
            String plan = output.split("==>")[1].split("<==")[0].trim(); // Cannot use variables here.

            if (plan.contains("setdone")) {
                plan = plan.split("setdone")[0]; //
                plan = plan + "setdone";
                return plan;
            }

            if (plan.contains("finished")) {
                plan = plan.split("finished")[0]; //
                plan = plan + "finished";
                return plan;
            }
        }

        throw new CustomServiceException("ERROR: could not parse Lilotane output.");
    }
}
