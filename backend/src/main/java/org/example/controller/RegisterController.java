package org.example.controller;

import org.example.dto.UserDto;
import org.example.exception.DuplicatedEntityException;
import org.example.exception.ValidatorException;
import org.example.mapper.Mapper;
import org.example.request.RegisterRequest;
import org.example.response.AuthResponse;
import org.example.response.ErrorResponse;
import org.example.response.Response;
import org.example.service.RegisterService;
import org.example.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class RegisterController {

    private final RegisterService registerService;
    private final UserService userService;
    private final Mapper mapper;

    public RegisterController(
        RegisterService registerService,
        UserService userService,
        Mapper mapper
    ) {
        this.registerService = registerService;
        this.userService = userService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<Response> register(
        @RequestBody RegisterRequest registerRequestBody
    ) {
        String username = registerRequestBody.getUsername();
        String email = registerRequestBody.getEmail();
        String password = registerRequestBody.getPassword();

        ResponseEntity<Response> response;

        try {
            String jwtToken = registerService.register(username, email, password);
            UserDto loggedUser = mapper.toUserDto(userService.getByEmail(email));

            response = ResponseEntity.ok(new AuthResponse(jwtToken, loggedUser));
        } catch (ValidatorException e) {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(e.getMessage()));
        } catch (DuplicatedEntityException e) {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Email already exists"));
        }

        return response;
    }
}
