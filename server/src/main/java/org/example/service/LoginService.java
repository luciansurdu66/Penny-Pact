package org.example.service;

import com.nimbusds.jose.proc.BadJWSException;
import org.example.dto.UserDto;
import org.example.mapper.Mapper;
import org.example.model.User;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final UserRepository userRepository;
    private final TokenService tokenService;

    public LoginService(
        @Qualifier("mockUserRepository") UserRepository userRepository,
        TokenService tokenService
    ) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    /**
     * Authenticates a user based on their
     * email and password.
     *
     * @param email The email of the user.
     * @param password The password of the user.
     * @return A JWT token associated with that user if successful, null otherwise.
     */
    public String authenticate(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user == null ||
            !user.getPassword().equals(password)) {
            return null;
        }

        return tokenService.generateJwt(user);
    }
}
