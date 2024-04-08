package org.example.response;

import org.example.dto.UserDto;

public class AuthResponse implements Response {

    private String jwtToken;
    private UserDto loggedUser;

    public AuthResponse(String jwtToken, UserDto loggedUser) {
        this.jwtToken = jwtToken;
        this.loggedUser = loggedUser;
    }

    // Getters and Setters

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public UserDto getLoggedUser() {
        return loggedUser;
    }

    public void setLoggedUser(UserDto loggedUser) {
        this.loggedUser = loggedUser;
    }
}
