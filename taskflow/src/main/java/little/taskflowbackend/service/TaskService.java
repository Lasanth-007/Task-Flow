package little.taskflowbackend.service;

import little.taskflowbackend.dto.TaskPatchDto;
import little.taskflowbackend.dto.TaskRequestDto;
import little.taskflowbackend.dto.TaskResponseDto;
import little.taskflowbackend.entity.Task;
import little.taskflowbackend.exception.TaskNotfoundException;
import little.taskflowbackend.mapper.TaskMapper;
import little.taskflowbackend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public List<TaskResponseDto> getAllTasks(){
        return taskRepository.findAll()
                .stream()
                .map(taskMapper::toDto)
                .toList();
    }
    public TaskResponseDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotfoundException("Task with ID " + id + " could not be found."));
        return taskMapper.toDto(task);
    }

    public TaskResponseDto createTask(TaskRequestDto dto) {
        Task task = taskMapper.toEntity(dto);
        Task savedTask = taskRepository.save(task);
        return taskMapper.toDto(savedTask);
    }

    public TaskResponseDto updateTask(Long id, TaskRequestDto dto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotfoundException("Task with ID " + id + " could not be found."));

        taskMapper.updateEntityFromDto(dto, task);
        Task updatedTask = taskRepository.save(task);
        return taskMapper.toDto(updatedTask);
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotfoundException("Task with ID " + id + " could not be found.");
        }
        taskRepository.deleteById(id);
    }

    public TaskResponseDto patchTask(Long id, TaskPatchDto dto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotfoundException("Task with ID " + id + " could not be found."));

        taskMapper.patchEntityFromDto(dto, task);

        Task updatedTask = taskRepository.save(task);
        return taskMapper.toDto(updatedTask);
    }

    public List<TaskResponseDto> getTasksByStatus(boolean completed) {
        return taskRepository.findByCompleted(completed).stream()
                .map(taskMapper::toDto)
                .toList();
    }
}
