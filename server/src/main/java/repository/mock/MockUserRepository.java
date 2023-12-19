package repository.mock;

import exception.DuplicatedEntityException;
import exception.EntityNotFoundException;
import model.User;
import repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

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
                        "dan.nechita@example.com"),
                2, new User(
                        2,
                        "Havi",
                        "passwd2"),
                3, new User(
                        3,
                        "Gio",
                        "passwd3"
                )
        ));
    }

    // Overrides.

    @Override
    public void save(User user) throws DuplicatedEntityException {
        if (users.containsKey(user.getId())) {
            throw new DuplicatedEntityException();
        }

        users.put(user.getId(), user);
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
}
