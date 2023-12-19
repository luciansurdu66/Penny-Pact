package exception;

public class DuplicatedEntityException extends RepositoryException {
    public DuplicatedEntityException() {
        super();
    }

    public DuplicatedEntityException(String message) {
        super(message);
    }
}
