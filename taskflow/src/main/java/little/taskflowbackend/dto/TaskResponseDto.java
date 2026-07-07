package little.taskflowbackend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record TaskResponseDto(
        Long id,
        String title,
        String description,
        boolean completed,
        LocalDateTime createdAt
) {
}
