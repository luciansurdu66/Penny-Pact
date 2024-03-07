package org.example.request;

public class AuthRequest {

    private String email;
    private String password;

    // Override

    @Override
    public String toString() {
        return "{ email: " + email + ", " + "password: " + password + "}";
    }


    // Getters and Setters

    public String getEmail() {
        return email;
    }

    public void setUsername(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}