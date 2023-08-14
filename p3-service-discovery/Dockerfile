#Command for creating the Docker image:
#>docker build -t p3-service-discovery .
#>docker build -t p3-service-discovery-test . --progress=plain
#>docker build -t p3-service-discovery-test . --progress=plain --no-cache

#Environment:
FROM debian:bullseye-slim

#Make /tmp-proj the working directory:
WORKDIR /tmp-proj

#Copy necessary app files to image:
COPY . ./

#Install:
RUN apt-get update && \
apt-get install -y --no-install-recommends maven wget && \
rm -r /usr/lib/jvm/java-11-openjdk-amd64 && \
wget https://download.oracle.com/java/19/archive/jdk-19.0.2_linux-x64_bin.deb --no-check-certificate && \
apt-get install ./jdk-19.0.2_linux-x64_bin.deb -y && \
update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-19/bin/java 1 && \
mvn clean package && \
mkdir ../p3-service-discovery && \
mv target/p3-service-discovery-1.0.0.jar ../p3-service-discovery && \
rm -r /tmp-proj && \
apt-get remove -y maven wget && \
apt-get autoremove -y && \
apt-get clean && \
rm -rf /var/lib/apt/lists/*

#Install:
#RUN apt-get update
#RUN apt-get install -y --no-install-recommends maven
#RUN rm -r /usr/lib/jvm/java-11-openjdk-amd64
#RUN apt-get install -y --no-install-recommends wget
#RUN wget https://download.oracle.com/java/19/archive/jdk-19.0.2_linux-x64_bin.deb --no-check-certificate
#RUN apt-get install ./jdk-19.0.2_linux-x64_bin.deb -y
##RUN apt-get --fix-broken install -y
#RUN update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-19/bin/java 1
#RUN mvn clean package
#RUN mkdir ../p3-service-discovery
#RUN mv target/p3-service-discovery-1.0.0.jar ../p3-service-discovery
#RUN rm -r /tmp-proj
#RUN apt-get remove -y maven
#RUN apt-get remove -y wget
#RUN apt-get autoremove -y
#RUN apt-get clean
#RUN rm -rf /var/lib/apt/lists/*

EXPOSE 8761

#Make /p3-service-discovery the working directory:
WORKDIR /p3-service-discovery

#Run app (from WORKDIR):
ENTRYPOINT ["java", "-jar", "p3-service-discovery-1.0.0.jar"]
