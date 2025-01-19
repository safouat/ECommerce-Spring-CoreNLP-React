package com.safouat;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow CORS for all endpoints
                .allowedOrigins("http://localhost:3000") // Allow frontend on port 3000
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow specific methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials if needed
    }
}