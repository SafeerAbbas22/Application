# p3-hddl-plan-solver

This is a microservice of Project 3, providing access to the **Lilotane** planning tool.
The microservice is used to generate plans from provided HDDL domains and problems.

## How to launch

To launch Project 3, of which the **p3-hddl-plan-solver** microservice is a component, use the `docker-compose.yml` file, as described in the **p3-docker-compose** repository.

To launch the microservice on its own via Docker, clone the repository and execute the following commands:

```
cd p3-hddl-plan-solver
docker build -t p3-hddl-plan-solver .
```

The Dockerfile will install the required dependencies, build the microservice, clone and build the planning tool, and launch the microservice in a Docker container.

## License
**p3-hddl-plan-solver** is published under the GNU GPLv3 license.

**Lilotane** is published under the GNU GPLv3 license and can be found here:

* [GitHub](https://github.com/domschrei/lilotane)
* [GitLab](https://gitlab.anu.edu.au/u1092535/htn2020-competitor-1)
