package com.microservices.p3pddldomainproblemvalidator.constants;

public class FilePaths {
    private static final String USER_HOME_DIR = System.getProperty("user.home");

    public static final String WORK_DIR = USER_HOME_DIR + "/workdir";
    public static final String DOMAIN_FILE = USER_HOME_DIR + "/workdir/domain.pddl";
    public static final String PROBLEM_FILE = USER_HOME_DIR + "/workdir/problem.pddl";
}
