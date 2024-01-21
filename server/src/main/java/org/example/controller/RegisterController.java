package org.example.controller;

import org.example.dto.UserDto;
import org.example.request.RegisterRequestBody;
import org.example.service.RegisterService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class RegisterController {

    private final RegisterService registerService;

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping
    public UserDto register(
        @RequestBody RegisterRequestBody registerRequestBody
    ) {
        String username = registerRequestBody.getUsername();
        String email = registerRequestBody.getEmail();
        String password = registerRequestBody.getPassword();

        return registerService.register(username, email, password);
    }
}
