package org.example.mapper;

import org.example.dto.UserDto;
import org.example.model.User;

public class Mapper {
    public static UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }

        int id = user.getId();
        String username = user.getUsername(),
                email = user.getEmail();

        return new UserDto(id, username, email);
    }
}
