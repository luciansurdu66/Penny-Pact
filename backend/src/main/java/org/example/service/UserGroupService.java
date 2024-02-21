package org.example.service;

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

    public List<Integer> getGroupIdsByUserId(int userId) {
        return (List<Integer>) userGroupRepository.findGroupIdsByUserId(userId);
    }

    public boolean hasUserGroupKeyPair(int userId, int groupId) {
        return userGroupRepository.containsUserGroupKeyPair(userId, groupId);
    }
}
