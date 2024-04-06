package org.example.service;

import org.example.exception.DuplicatedEntityException;
import org.example.model.UserGroup;
import org.example.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserGroupService {

    private final UserGroupRepository userGroupRepository;

    public UserGroupService(
        @Qualifier("mockUserGroupRepository") UserGroupRepository userGroupRepository
    ) {
        this.userGroupRepository = userGroupRepository;
    }

    public boolean addUserGroupPair(int userId, int groupId) {
        int newId = userGroupRepository.size() + 1;
        UserGroup newUserGroup = new UserGroup(newId, userId, groupId);

        try {
            userGroupRepository.save(newUserGroup);
        } catch (DuplicatedEntityException ignored) {
            return false;
        }

        return true;
    }

    public List<Integer> getGroupIdsByUserId(int userId) {
        return (List<Integer>) userGroupRepository.findGroupIdsByUserId(userId);
    }

    public boolean hasUserGroupKeyPair(int userId, int groupId) {
        return userGroupRepository.containsUserGroupKeyPair(userId, groupId);
    }
}
