# p3-pddl-plan-solver

This is a microservice of Project 3, providing access to the **Fast Downward** planning tool.
The microservice is used to generate plans from provided PDDL domains and problems.

## How to launch

To launch Project 3, of which the **p3-pddl-plan-solver** microservice is a component, use the `docker-compose.yml` file, as described in the **p3-docker-compose** repository.

To launch the microservice on its own via Docker, clone the repository and execute the following commands:

```
cd p3-pddl-plan-solver
docker build -t p3-pddl-plan-solver .
```

The Dockerfile will install the required dependencies, build the microservice, clone and build the planning tool, and launch the microservice in a Docker container.

## License
**p3-pddl-plan-solver** is published under the GNU GPLv3 license.

**Fast Downward** is published under the GNU GPLv3 license and can be found here:

* [GitHub](https://github.com/aibasel/downward)
* [Wiki](https://www.fast-downward.org)
