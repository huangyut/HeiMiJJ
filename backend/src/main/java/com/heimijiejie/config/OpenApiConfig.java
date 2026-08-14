package com.heimijiejie.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    OpenAPI heiMiJieJieOpenApi() {
        return new OpenAPI().info(new Info()
                .title("黑米姐姐 API")
                .description("消费者端、门店端和平台管理端统一业务接口")
                .version("v1"));
    }
}
