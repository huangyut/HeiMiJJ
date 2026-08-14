package com.heimijiejie.common.api;

import java.time.Instant;

public record ApiResponse<T>(
        int code,
        String message,
        T data,
        String requestId,
        Instant timestamp
) {
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(0, "success", data, null, Instant.now());
    }

    public static <T> ApiResponse<T> failure(int code, String message) {
        return new ApiResponse<>(code, message, null, null, Instant.now());
    }
}
