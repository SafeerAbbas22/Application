package com.microservices.p3servicediscovery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class P3ServiceDiscoveryApplication {

	public static void main(String[] args) {
		SpringApplication.run(P3ServiceDiscoveryApplication.class, args);
	}
}
