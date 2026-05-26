package little.taskflowbackend.mapper;

import little.taskflowbackend.dto.TaskPatchDto;
import little.taskflowbackend.dto.TaskRequestDto;
import little.taskflowbackend.dto.TaskResponseDto;
import little.taskflowbackend.entity.Task;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    TaskResponseDto toDto(Task task);

    Task toEntity(TaskRequestDto dto);

    void updateEntityFromDto(TaskRequestDto dto, @MappingTarget Task task);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void patchEntityFromDto(TaskPatchDto dto, @MappingTarget Task task);
}
