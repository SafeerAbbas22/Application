# p3-frontend-app

This is the frontend application of Project 3.

## How to launch

To launch Project 3, of which the **p3-frontend-app** application is a component, use the `docker-compose.yml` file, as described in the **p3-docker-compose** repository.

To launch the application on its own via Docker, clone the repository and execute the following commands:

```
cd p3-frontend-app
docker build -t p3-frontend-app .
```

The Dockerfile will install the required dependencies, build the application, and launch it in a Docker container.

## License
**p3-frontend-app** is published under the GNU GPLv3 license.
