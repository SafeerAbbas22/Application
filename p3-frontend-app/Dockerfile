#Command for creating the Docker image:
#>docker build -t p3-frontend-app .
#>docker build -t p3-frontend-app-test . --progress=plain
#>docker build -t p3-frontend-app-test . --progress=plain --no-cache

#Environment:
FROM debian:bullseye-slim

#Make /p3-frontend-app the working directory:
WORKDIR /p3-frontend-app

#Copy necessary app files to image:
COPY . ./

#Install:
RUN apt-get update && \
apt-get install -y --no-install-recommends curl nodejs npm && \
curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
apt-get install -y --no-install-recommends nodejs && \
npm install -g npm@9.6.5 serve && \
apt-get remove -y curl && \
apt-get clean && \
rm -rf /var/lib/apt/lists/* && \
npm install && \
npm run build

#Install:
#RUN apt-get update
#RUN apt-get install -y --no-install-recommends curl nodejs npm
#RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
#RUN apt-get install -y --no-install-recommends nodejs
#RUN npm install -g npm@9.6.5 serve
#RUN apt-get remove -y curl
#RUN apt-get clean
#RUN rm -rf /var/lib/apt/lists/*
#RUN npm install
#RUN npm run build

EXPOSE 3000

#Run app (from WORKDIR):
ENTRYPOINT ["serve", "-s", "build"]
