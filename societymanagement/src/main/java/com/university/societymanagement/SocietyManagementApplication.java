package com.university.societymanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SocietyManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(SocietyManagementApplication.class, args);
    }
}
