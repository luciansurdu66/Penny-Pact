package org.example.exception;

public class RepositoryException extends RuntimeException {

    public RepositoryException() {
        super();
    }

    public RepositoryException(String message) {
        super(message);
    }
}
