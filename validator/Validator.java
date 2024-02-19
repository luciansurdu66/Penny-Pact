package org.example.validator;

import org.example.exception.ValidatorException;

public interface Validator<T> {

    /**
     * Validates a given entity.
     * @throws ValidatorException The entity is not valid.
     */
    void validate(T entity) throws ValidatorException;
}
