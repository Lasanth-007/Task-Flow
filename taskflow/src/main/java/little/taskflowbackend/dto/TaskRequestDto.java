package little.taskflowbackend.dto;

public record TaskRequestDto(
        String title,
        String description,
        boolean completed
) {
}
