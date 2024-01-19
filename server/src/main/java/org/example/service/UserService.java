package org.example.service;

import org.example.model.User;
import org.example.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    UserRepository userRepository;

    public UserService(UserRepository _userRepository) {
        userRepository = _userRepository;
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public void removeUser(Integer id) {
        userRepository.remove(id);
    }

    public void updateUser(User user) {
        userRepository.update(user);
    }

    public Iterable<User> getAll() {
        return userRepository.findAll();
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User getById(Integer id) {
        return userRepository.findById(id);
    }
}
