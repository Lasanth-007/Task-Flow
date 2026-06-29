package little.taskflowbackend.controller;

import little.taskflowbackend.dto.TaskPatchDto;
import little.taskflowbackend.dto.TaskRequestDto;
import little.taskflowbackend.dto.TaskResponseDto;
import little.taskflowbackend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskResponseDto>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDto> getTaskById
            (@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PostMapping
    public ResponseEntity<TaskResponseDto> createTask
            (@RequestBody TaskRequestDto dto) {
        TaskResponseDto created = taskService.createTask(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);

    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDto> updateTask(@PathVariable Long id, @RequestBody TaskRequestDto dto) {
        return ResponseEntity.ok(taskService.updateTask(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
    @PatchMapping("/{id}")
    public ResponseEntity<TaskResponseDto> patchTask(
            @PathVariable Long id,
            @RequestBody TaskPatchDto dto) {
        return ResponseEntity.ok(taskService.patchTask(id, dto));
    }

    @GetMapping("/search")
    public ResponseEntity<List<TaskResponseDto>> getTasksByStatus(
            @RequestParam(name = "completed", defaultValue = "false") boolean completed) {
        return ResponseEntity.ok(taskService.getTasksByStatus(completed));
    }
}
