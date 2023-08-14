package com.microservices.p3hddlplansolver.constants;

public class FilePaths {
    private static final String USER_HOME_DIR = System.getProperty("user.home");

    public static final String WORK_DIR = USER_HOME_DIR + "/workdir";
    public static final String DOMAIN_HDDL = USER_HOME_DIR + "/workdir/domain.hddl";
    public static final String PROBLEM_HDDL = USER_HOME_DIR + "/workdir/problem.hddl";
}
