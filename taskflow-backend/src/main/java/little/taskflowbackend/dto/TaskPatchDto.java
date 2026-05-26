package little.taskflowbackend.dto;

public record TaskPatchDto(
        String title,
        String description,
        Boolean completed
) {
}
