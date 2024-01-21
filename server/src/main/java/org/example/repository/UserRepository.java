package org.example.repository;

import org.example.model.User;

public interface UserRepository extends Repository<User, Integer> {

    /**
     * Retrieves a user based on a given username.
     *
     * @param username The username of the user.
     * @return The user or null if not found.
     */
    User findByUsername(String username);

    /**
     * Retrieves a user based on a given email.
     * @param email The email of the user.
     * @return The user or null if not found.
     */
    User findByEmail(String email);

    /**
     * @return All the users.
     */
    Iterable<User> findAll();
}
