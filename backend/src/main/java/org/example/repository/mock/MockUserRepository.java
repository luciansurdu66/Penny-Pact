package org.example.repository.mock;

import org.example.exception.DuplicatedEntityException;
import org.example.exception.EntityNotFoundException;
import org.example.model.User;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
@Qualifier("mockUserRepository")
public class MockUserRepository implements UserRepository {

    Map<Integer, User> users;

    public MockUserRepository() {
        users = new HashMap<>(Map.of(
        1, new User(
                1,
                "Dan",
                "passwd1",
                "Dan",
                "Nehita",
                "dan.nechita@org.example.com"
            ),
        2, new User(
                2,
                "Havi",
                "havi@org.example.com",
                "passwd2"
            ),
        3, new User(
                3,
                "Gio",
                "gio@org.example.com",
                "passwd3"
            ),
        4, new User(
                4,
                "Dalia",
                "dalia@org.example.com",
                "passwd4"
            )
        ));
    }

    // Overrides

    @Override
    public User save(User user) throws DuplicatedEntityException {
        if (users.containsValue(user)) {
            throw new DuplicatedEntityException();
        }

        users.put(user.getId(), user);

        return user;
    }

    @Override
    public User findById(Integer id) {
        return users.get(id);
    }

    @Override
    public Iterable<User> findAll() {
        return users.values();
    }

    @Override
    public void update(User modifiedUser) throws EntityNotFoundException {
        User oldUser = users.get(modifiedUser.getId());

        if (oldUser == null) {
            throw new EntityNotFoundException();
        }

        users.put(oldUser.getId(), modifiedUser);
    }

    @Override
    public User remove(Integer id) throws EntityNotFoundException {
        if (!users.containsKey(id)) {
            throw new EntityNotFoundException();
        }

        return users.remove(id);
    }

    @Override
    public User findByUsername(String username) {
        for (User user : users.values()) {
            if (user.getUsername().equals(username)) {
                return user;
            }
        }

        return null;
    }

    @Override
    public User findByEmail(String email) {
        for (User user : users.values()) {
            if (user.getEmail().equals(email)) {
                return user;
            }
        }

        return null;
    }

    @Override
    public int size() {
        return users.size();
    }
}
