package exception;

public class EntityNotFoundException extends RepositoryException {
    public EntityNotFoundException() {
        super();
    }

    public EntityNotFoundException(String message) {
        super(message);
    }
}
