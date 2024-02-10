package org.example.service;

import org.example.dto.UserDto;
import org.example.mapper.Mapper;
import org.example.model.User;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final UserRepository userRepository;

    public LoginService(
        @Qualifier("mockUserRepository") UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    /**
     * Authenticates a user based on their
     * email and password.
     *
     * @param email The email of the user.
     * @param password The password of the user.
     * @return The user if successful, otherwise null.
     */
    public UserDto authenticate(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user == null ||
            !user.getPassword().equals(password)) {
            return null;
        }

        return Mapper.toUserDto(user);
    }
}
