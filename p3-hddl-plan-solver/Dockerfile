#Command for creating the Docker image:
#>docker build -t p3-hddl-plan-solver .
#>docker build -t p3-hddl-plan-solver-test . --progress=plain
#>docker build -t p3-hddl-plan-solver-test . --progress=plain --no-cache

#Environment:
FROM debian:bullseye-slim

#Make /tmp-proj the working directory:
WORKDIR /tmp-proj

#Copy necessary app files to image:
COPY . ./

#Install:
RUN apt-get update && \
apt-get install -y --no-install-recommends gradle wget git cmake make bison flex zlib1g-dev build-essential && \

rm -r /usr/share/gradle && \
wget https://downloads.gradle-dn.com/distributions/gradle-8.0.1-bin.zip && \
unzip gradle-8.0.1-bin.zip && \
mv gradle-8.0.1 /usr/share && \
mv /usr/share/gradle-8.0.1 /usr/share/gradle && \

rm -r /usr/lib/jvm/java-11-openjdk-amd64 && \
wget https://download.oracle.com/java/19/archive/jdk-19.0.2_linux-x64_bin.deb --no-check-certificate && \
apt-get install -y ./jdk-19.0.2_linux-x64_bin.deb && \
update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-19/bin/java 1 && \

git clone https://github.com/domschrei/lilotane && \
mkdir lilotane/build && \
mkdir ../root/lilotane && \
cmake -B ./lilotane/build/ -S ./lilotane/ -DCMAKE_BUILD_TYPE=RELEASE -DIPASIRSOLVER=glucose4 && \
cd lilotane/build/ && make && \
cd ../.. && mv lilotane/build ../root/lilotane && \

gradle build && \
mkdir ../p3-hddl-plan-solver && \
mv build/libs/p3-hddl-plan-solver-1.0.0.jar ../p3-hddl-plan-solver && \
rm -r /tmp-proj && \

apt-get remove -y wget gradle git cmake make bison flex && \
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
#RUN apt-get install -y --no-install-recommends git cmake make bison flex zlib1g-dev build-essential
#RUN git clone https://github.com/domschrei/lilotane
#RUN mkdir -p lilotane/build
#RUN cmake -B ./lilotane/build/ -S ./lilotane/ -DCMAKE_BUILD_TYPE=RELEASE -DIPASIRSOLVER=glucose4
#RUN cd lilotane/build/ && make
#RUN mv lilotane/build ../root
#_______________________________________________________
#RUN gradle build
#RUN mkdir ../p3-hddl-plan-solver
#RUN mv build/libs/p3-hddl-plan-solver-1.0.0.jar ../p3-hddl-plan-solver
#RUN rm -r /tmp-proj
#_______________________________________________________
#RUN apt-get remove -y wget
#RUN apt-get remove -y gradle
#RUN apt-get remove -y git cmake make bison flex
#RUN apt-get autoremove -y
#RUN apt-get clean
#RUN rm -rf /var/lib/apt/lists/*



#Make /p3-hddl-plan-solver the working directory:
WORKDIR /p3-hddl-plan-solver

#Run app (from WORKDIR):
ENTRYPOINT ["java", "-jar", "p3-hddl-plan-solver-1.0.0.jar"]
