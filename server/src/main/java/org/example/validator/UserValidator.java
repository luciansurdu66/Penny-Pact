package org.example.validator;

import org.example.exception.ValidatorException;
import org.example.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserValidator implements Validator<User> {

    @Override
    public void validate(User user) throws ValidatorException {
        // TODO: Check if the user is valid. (e.g., the username,
        //  email, and password are not empty Strings.)
        //
        //  Code Example:
        //
        //      String username = user.getUsername(),
        //              email = user.getPassword(),
        //              password = user.getPassword();
        //
        //      if (username.isEmpty()) {
        //          throw new ValidatorException("Empty username");
        //      }
        //
        //      ...
    }
}
