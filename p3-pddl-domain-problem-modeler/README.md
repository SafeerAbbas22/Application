# p3-pddl-domain-problem-modeler

This is a microservice of Project 3, providing access to the **pddl** planning tool.
The microservice is used to model PDDL domains and problems.

## How to launch

To launch Project 3, of which the **p3-pddl-domain-problem-modeler** microservice is a component, use the `docker-compose.yml` file, as described in the **p3-docker-compose** repository.

To launch the microservice on its own via Docker, clone the repository and execute the following commands:

```
cd p3-pddl-domain-problem-modeler
docker build -t p3-pddl-domain-problem-modeler .
```

The Dockerfile will install the required dependencies, build the microservice, clone and build the planning tool, and launch the microservice in a Docker container.

## License
**p3-pddl-domain-problem-modeler** is published under the GNU GPLv3 license.

**pddl** is published under the MIT license and can be found here:

* [GitHub](https://github.com/AI-Planning/pddl)
* [PyPI](https://pypi.org/project/pddl/)
