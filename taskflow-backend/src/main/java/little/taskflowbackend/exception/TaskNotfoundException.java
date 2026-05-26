package little.taskflowbackend.exception;

public class TaskNotfoundException extends RuntimeException {
    public TaskNotfoundException(String message) {
        super(message);
    }
}
