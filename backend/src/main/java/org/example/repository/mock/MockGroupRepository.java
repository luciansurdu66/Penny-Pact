package org.example.repository.mock;

import org.example.exception.DuplicatedEntityException;
import org.example.exception.EntityNotFoundException;
import org.example.model.Group;
import org.example.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@Qualifier("mockGroupRepository")
public class MockGroupRepository implements GroupRepository {

    Map<Integer, Group> groups;

    public MockGroupRepository() {
        groups = new HashMap<>(Map.of(
            1, new Group(1, 3, "Apartament 48"),
            2, new Group(2, 3, "Trip Bucuresti"),
            3, new Group(3, 3, "Me & Adi"),
            4, new Group(4, 4, "Penny Pact")
        ));
    }

    // Overrides

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
    public Group findByName(String name) {
        return groups.values()
                .stream()
                .filter(group -> group.getName().equals(name))
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<Group> findGroupsByIds(List<Integer> groupIds) {
        return groupIds.stream()
            .map(groupId -> groups.get(groupId))
            .toList();
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
