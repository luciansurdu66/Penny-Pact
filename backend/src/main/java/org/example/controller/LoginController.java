package org.example.controller;

import org.example.dto.UserDto;
import org.example.mapper.Mapper;
import org.example.request.LoginRequest;
import org.example.response.AuthResponse;
import org.example.response.Response;
import org.example.service.LoginService;
import org.example.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;
    private final UserService userService;
    private final Mapper mapper;
    private final Logger logger;

    public LoginController(
        LoginService loginService,
        UserService userService,
        Mapper mapper
    ) {
        this.loginService = loginService;
        this.logger = LoggerFactory.getLogger(LoginController.class);
        this.userService = userService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<Response> login(
        @RequestBody LoginRequest loginRequest
    ) {
        logger.info(loginRequest.toString());

        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        String jwtToken = loginService.authenticate(email, password);

        if (jwtToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .build();
        }

        UserDto loggedUser = mapper.toUserDto(userService.getByEmail(email));

        return ResponseEntity.ok(new AuthResponse(jwtToken, loggedUser));
    }
}
