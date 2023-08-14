# p3-api-gateway

This is the API gateway service of Project 3.
It routes requests from **p3-frontend-app** to the project's microservices.

## How to launch

To launch Project 3, of which the **p3-api-gateway** service is a component, use the `docker-compose.yml` file, as described in the **p3-docker-compose** repository.

To launch the service on its own via Docker, clone the repository and execute the following commands:

```
cd p3-api-gateway
docker build -t p3-api-gateway .
```

The Dockerfile will install the required dependencies, build the service, and launch it in a Docker container.

## License
**p3-api-gateway** is published under the GNU GPLv3 license.
