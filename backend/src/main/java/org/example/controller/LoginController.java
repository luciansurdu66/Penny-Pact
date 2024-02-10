package org.example.controller;

import org.example.request.AuthRequest;
import org.example.response.AuthResponse;
import org.example.response.Response;
import org.example.service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    public ResponseEntity<Response> authenticate(
        @RequestBody AuthRequest loginRequest
    ) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        String jwtToken = loginService.authenticate(email, password);

        if (jwtToken == null) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .build();
        }

        return ResponseEntity
            .ok(new AuthResponse(jwtToken));
    }
}
