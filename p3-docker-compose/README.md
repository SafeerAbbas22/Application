# p3-docker-compose

This is the `docker-compose.yml` file of Project 3.
It is used to create Docker images and run Docker containers of all services in that project.

## How to launch Project 3

1. Clone the following Project 3 components into a directory (called `example_dir` in this guide):
    * **p3-frontend-app**
    * **p3-api-gateway**
    * **p3-service-discovery**
    * **p3-pddl-domain-problem-modeler**
    * **p3-pddl-domain-problem-validator**
    * **p3-pddl-plan-solver**
    * **p3-pddl-plan-validator**
    * **p3-hddl-plan-solver**
1. Clone the **p3-docker-compose** repository and copy the `docker-compose.yml` file in the `example_dir` directory.
    The directory structure should look like this:
    ```bash
    example_dir:
    ├───p3-frontend-app
    ├───p3-api-gateway
    ├───p3-service-discovery
    ├───p3-pddl-domain-problem-modeler
    ├───p3-pddl-domain-problem-validator
    ├───p3-pddl-plan-solver
    ├───p3-pddl-plan-validator
    ├───p3-hddl-plan-solver
    └───docker-compose.yml
    ```
1. Create Docker images and run Docker containers with the following commands:
    ```
    cd example_dir
    docker-compose up
    ```
    The execution can take several minutes.

1. To delete stopped Docker containers use the command:
    ```
    docker-compose down
    ```

## License
**p3-docker-compose** is published under the GNU GPLv3 license.
