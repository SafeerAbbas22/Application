# p3-pddl-plan-validator

This is a microservice of Project 3, providing access to the **VAL** planning tool.
The microservice is used to validate plans generated from PDDL domains and problems.

## How to launch

To launch Project 3, of which the **p3-pddl-plan-validator** microservice is a component, use the `docker-compose.yml` file, as described in the **p3-docker-compose** repository.

To launch the microservice on its own via Docker, clone the repository and execute the following commands:

```
cd p3-pddl-plan-validator
docker build -t p3-pddl-plan-validator .
```

The Dockerfile will install the required dependencies, build the microservice, clone and build the planning tool, and launch the microservice in a Docker container.

## License
**p3-pddl-plan-validator** is published under the GNU GPLv3 license.

**VAL** is published under the BSD 3-Clause license and can be found on [GitHub](https://github.com/KCL-Planning/VAL).
