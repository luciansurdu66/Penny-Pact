package repository;

import model.User;

public interface UserRepository extends Repository<User, Integer> {
    /**
     * Retrieves a user based on a given username.
     *
     * @param username The username of the user.
     * @return The user or null if not found.
     */
    User findByUsername(String username);
}
