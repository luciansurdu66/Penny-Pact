package org.example.controller;

import org.example.dto.UserDto;
import org.example.request.AuthRequestBody;
import org.example.service.LoginService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    public UserDto authenticate(@RequestBody AuthRequestBody authRequestBody) {
        String email = authRequestBody.getEmail();
        String password = authRequestBody.getPassword();

        return loginService.authenticate(email, password);
    }
}
