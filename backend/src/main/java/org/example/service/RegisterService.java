package org.example.service;

import org.example.dto.UserDto;
import org.example.exception.ValidatorException;
import org.example.mapper.Mapper;
import org.example.model.User;
import org.example.repository.UserRepository;
import org.example.validator.UserValidator;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    private final UserRepository userRepository;
    private final UserValidator userValidator;
    private final TokenService tokenService;

    public RegisterService(
        @Qualifier("mockUserRepository") UserRepository userRepository,
        UserValidator userValidator,
        TokenService tokenService
    ) {
        this.userRepository = userRepository;
        this.userValidator = userValidator;
        this.tokenService = tokenService;
    }

    /**
     * Registers a new user to the repository.
     *
     * @param username The username of the user.
     * @param email The email of the user.
     * @param password The password of the user.
     * @return The token associated with the new user.
     */
    public String register(
        String username,
        String email,
        String password
    ) {
        int id = generateUniqueUserId();

        User user = new User(id, username, email, password);

        userValidator.validate(user);
        user = userRepository.save(user);

        return tokenService.generateJwt(user);
    }

    /**
     * This function will be removed as id generation
     * will be handled by the database.
     * @return A unique user id.
     */
    @Deprecated
    private int generateUniqueUserId() {
        int id = 0;
        for (User user : userRepository.findAll()) {
            id = Math.max(id, user.getId());
        }

        return ++id;
    }
}
