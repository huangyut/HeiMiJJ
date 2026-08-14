package com.heimijiejie.modules.health;

import com.heimijiejie.common.api.ApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/v1/health")
public class HealthController {

    private final String applicationName;
    private final String applicationVersion;

    public HealthController(
            @Value("${spring.application.name}") String applicationName,
            @Value("${info.app.version:dev}") String applicationVersion
    ) {
        this.applicationName = applicationName;
        this.applicationVersion = applicationVersion;
    }

    @GetMapping
    public ApiResponse<HealthResponse> health() {
        return ApiResponse.success(new HealthResponse(
                "UP", applicationName, applicationVersion, Instant.now()));
    }

    public record HealthResponse(
            String status,
            String application,
            String version,
            Instant timestamp
    ) {}
}
