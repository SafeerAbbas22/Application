package com.microservices.p3pddlplanvalidator.message_entities;

public record PutRequestEntity(String domain, String problem, String plan) {
}
