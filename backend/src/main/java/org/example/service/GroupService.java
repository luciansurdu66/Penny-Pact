package org.example.service;

import org.example.model.Group;
import org.example.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {

    GroupRepository groupRepository;

    public GroupService(
        @Qualifier("mockGroupRepository") GroupRepository _groupRepository
    ) {
        groupRepository = _groupRepository;
    }

    public List<Group> getGroupsByIds(List<Integer> groupIds) {
        return groupRepository.findGroupsByIds(groupIds);
    }
}
