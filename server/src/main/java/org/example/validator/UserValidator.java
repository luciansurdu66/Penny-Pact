package org.example.validator;

import org.example.exception.ValidatorException;
import org.example.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserValidator implements Validator<User> {

    @Override
    public void validate(User user) throws ValidatorException {
        validateUserId(user.getId());
        validateStringFieldNotBlank(
            user.getUsername(),
            user.getEmail(),
            user.getPassword()
        );
    }

    /**
     * Validates the id of a user.
     * @param id The id of the user.
     * @throws ValidatorException The id is invalid.
     */
    private void validateUserId(int id) throws ValidatorException {
        if (id <= 0) {
            throw new ValidatorException("Invalid user id");
        }
    }

    /**
     * Validates that a user string field (e.g., username) is not blank.
     * @param fields The validated field.
     * @throws ValidatorException The field is blank.
     */
    private void validateStringFieldNotBlank(
        String... fields
    ) throws ValidatorException {
        for (String field : fields) {
            if (field.isBlank()) {
                throw new ValidatorException("Blank user field");
            }
        }
    }
}
