package org.example.exception;

public class ValidatorException extends RuntimeException {

    public ValidatorException() {
        super();
    }

    public ValidatorException(String message) {
        super(message);
    }
}
