package com.microservices.p3pddlplansolver.constants;

public class FastDownwardCommands {
    private static final String USER_HOME_DIR = System.getProperty("user.home");

    public static final String FD_EXECUTABLE = USER_HOME_DIR + "/downward/fast-downward.py";
    public static final String PLAN_OPTION = "--plan-file";
    public static final String SEARCH_OPTION = "--search";
    public static final String SEARCH_PARAM = "astar(blind())";
}
