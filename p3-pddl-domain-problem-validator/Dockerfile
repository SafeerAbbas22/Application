#Command for creating the Docker image:
#>docker build -t p3-pddl-domain-problem-validator .
#>docker build -t p3-pddl-domain-problem-validator-test . --progress=plain
#>docker build -t p3-pddl-domain-problem-validator-test . --progress=plain --no-cache

#Environment:
FROM debian:bullseye-slim

#Make /tmp-proj the working directory:
WORKDIR /tmp-proj

#Copy necessary app files to image:
COPY . ./

#Install:
RUN apt-get update && \
apt-get install -y --no-install-recommends python3-pip wget gradle && \
pip install pddl && \

rm -r /usr/share/gradle && \
wget https://downloads.gradle-dn.com/distributions/gradle-8.0.1-bin.zip && \
unzip gradle-8.0.1-bin.zip && \
mv gradle-8.0.1 /usr/share && \
mv /usr/share/gradle-8.0.1 /usr/share/gradle && \

rm -r /usr/lib/jvm/java-11-openjdk-amd64 && \
wget https://download.oracle.com/java/19/archive/jdk-19.0.2_linux-x64_bin.deb --no-check-certificate && \
apt-get install -y ./jdk-19.0.2_linux-x64_bin.deb && \
update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-19/bin/java 1 && \

gradle build && \
mkdir ../p3-pddl-domain-problem-validator && \
mv build/libs/p3-pddl-domain-problem-validator-1.0.0.jar ../p3-pddl-domain-problem-validator && \
rm -r /tmp-proj && \

apt-get remove -y wget gradle && \
apt-get autoremove -y && \
apt-get clean && \
rm -rf /var/lib/apt/lists/*



#Install:
#RUN apt-get update
#RUN apt-get install -y --no-install-recommends wget
#_______________________________________________________
#RUN apt-get install -y gradle
#RUN rm -r /usr/share/gradle
#RUN wget https://downloads.gradle-dn.com/distributions/gradle-8.0.1-bin.zip
#RUN unzip gradle-8.0.1-bin.zip
#RUN mv gradle-8.0.1 /usr/share
#RUN mv /usr/share/gradle-8.0.1 /usr/share/gradle
#_______________________________________________________
#RUN rm -r /usr/lib/jvm/java-11-openjdk-amd64
#RUN wget https://download.oracle.com/java/19/archive/jdk-19.0.2_linux-x64_bin.deb --no-check-certificate
#RUN apt-get install -y ./jdk-19.0.2_linux-x64_bin.deb
#RUN update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-19/bin/java 1
#_______________________________________________________
#RUN gradle build
#RUN mkdir ../p3-pddl-domain-problem-validator
#RUN mv build/libs/p3-pddl-domain-problem-validator-1.0.0.jar ../p3-pddl-domain-problem-validator
#RUN rm -r /tmp-proj
#_______________________________________________________
#RUN apt-get install -y --no-install-recommends python3-pip
#RUN pip install pddl
#_______________________________________________________
#RUN apt-get remove -y wget
#RUN apt-get remove -y gradle
#RUN apt-get autoremove -y
#RUN apt-get clean
#RUN rm -rf /var/lib/apt/lists/*



#Make /p3-pddl-domain-problem-validator the working directory:
WORKDIR /p3-pddl-domain-problem-validator

#Run app (from WORKDIR):
ENTRYPOINT ["java", "-jar", "p3-pddl-domain-problem-validator-1.0.0.jar"]
