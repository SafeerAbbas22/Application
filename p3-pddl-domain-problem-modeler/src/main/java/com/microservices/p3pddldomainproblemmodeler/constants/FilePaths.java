package com.microservices.p3pddldomainproblemmodeler.constants;

public class FilePaths {
    private static final String USER_HOME_DIR = System.getProperty("user.home");

    public static final String WORK_DIR = USER_HOME_DIR + "/workdir";
    public static final String PDDL_SCRIPT_PYTHON = USER_HOME_DIR + "/workdir/pddl_script.py";
}
