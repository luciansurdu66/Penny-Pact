package org.example.repository.mock;

import org.apache.commons.lang.NotImplementedException;
import org.example.exception.DuplicatedEntityException;
import org.example.exception.EntityNotFoundException;
import org.example.model.UserGroup;
import org.example.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
@Qualifier("mockUserGroupRepository")
public class MockUserGroupRepository implements UserGroupRepository {

    private Map<Integer, UserGroup> userGroupMap;

    public MockUserGroupRepository() {
        this.userGroupMap = new HashMap<>(Map.of(
            1, new UserGroup(1, 1, 1),
            2, new UserGroup(2, 2, 1),
            3, new UserGroup(3, 3, 1),
            4, new UserGroup(4, 3, 2),
            5, new UserGroup(5, 3, 3),
            6, new UserGroup(6, 3, 4),
            7, new UserGroup(7, 4, 4)
        ));
    }

    // Overrides


    @Override
    public List<Integer> findUserIdsByGroupId(int groupId) {
        return userGroupMap.values()
            .stream()
            .filter(userGroup -> userGroup.getGroupId() == groupId)
            .map(UserGroup::getUserId)
            .toList();
    }

    @Override
    public UserGroup save(UserGroup userGroup) throws DuplicatedEntityException {
        if (userGroupMap.containsValue(userGroup)) {
            throw new DuplicatedEntityException();
        }

        userGroupMap.put(userGroup.getId(), userGroup);

        return userGroup;
    }

    @Override
    public UserGroup findById(Integer integer) {
        throw new NotImplementedException();
    }

    @Override
    public Iterable<UserGroup> findAll() {
        return userGroupMap.values();
    }

    @Override
    public void update(UserGroup modifiedEntity) throws EntityNotFoundException {
        throw new NotImplementedException();
    }

    @Override
    public void removeAllPairsHavingGroupId(int groupId) {
        Map<Integer, UserGroup> updatedUserGroupMap = new HashMap<>();

        for (var entry : userGroupMap.entrySet()) {
            int key = entry.getKey();
            UserGroup value = entry.getValue();

            if (value.getGroupId() != groupId) {
                updatedUserGroupMap.put(key, value);
            }
        }

        userGroupMap = updatedUserGroupMap;
    }

    @Override
    public UserGroup remove(Integer integer) throws EntityNotFoundException {
        throw new NotImplementedException();
    }

    @Override
    public int size() {
        return userGroupMap.size();
    }

    @Override
    public Iterable<Integer> findGroupIdsByUserId(int userId) {
        return userGroupMap.values()
            .stream()
            .filter(userGroup -> userGroup.getUserId() == userId)
            .map(UserGroup::getGroupId)
            .toList();
    }

    @Override
    public boolean containsUserGroupKeyPair(int userId, int groupId) {
        return userGroupMap.values()
            .stream()
            .anyMatch(userGroup -> userGroup.getUserId() == userId &&
                userGroup.getGroupId() == groupId
            );
    }
}
