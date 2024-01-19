package org.example.repository.mock;

import org.example.exception.DuplicatedEntityException;
import org.example.exception.EntityNotFoundException;
import org.example.model.Group;
import org.example.repository.GroupRepository;

import java.util.HashMap;
import java.util.Map;

public class MockGroupRepository implements GroupRepository {

    Map<Integer, Group> groups;

    public MockGroupRepository() {
        groups = new HashMap<>(Map.of(
                1, new Group(1, "Apartament 48"),
                2, new Group(2, "Trip Bucuresti"),
                3, new Group(3, "Me & Adi")
        ));
    }

    // Overrides.

    @Override
    public Group save(Group group) throws DuplicatedEntityException {
        if (groups.containsKey(group.getId())) {
            throw new DuplicatedEntityException();
        }

        groups.put(group.getId(), group);

        return group;
    }

    @Override
    public Group findById(Integer id) {
        return groups.get(id);
    }

    @Override
    public Iterable<Group> findAll() {
        return groups.values();
    }

    @Override
    public void update(Group modifiedGroup) throws EntityNotFoundException {
        Group oldGroup = groups.get(modifiedGroup.getId());

        if (oldGroup == null) {
            throw new EntityNotFoundException();
        }

        groups.put(oldGroup.getId(), modifiedGroup);
    }

    @Override
    public Group remove(Integer id) throws EntityNotFoundException {
        if (!groups.containsKey(id)) {
            throw new EntityNotFoundException();
        }

        return groups.remove(id);
    }

    @Override
    public int size() {
        return groups.size();
    }
}
