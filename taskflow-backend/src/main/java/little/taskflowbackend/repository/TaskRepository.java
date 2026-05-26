package little.taskflowbackend.repository;

import little.taskflowbackend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {

    List<Task> findByCompleted(boolean completed);
}
