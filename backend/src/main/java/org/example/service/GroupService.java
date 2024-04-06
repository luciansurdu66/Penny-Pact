package org.example.service;

import org.example.exception.EntityNotFoundException;
import org.example.model.Group;
import org.example.model.User;
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

    public int createGroup(String groupName, int creatorId) {
        int groupId = generateUniqueGroupId();
        Group newGroup = new Group(groupId, creatorId, groupName);

        groupRepository.save(newGroup);

        return groupId;
    }

    public Group getGroupById(int groupId) {
        return groupRepository.findById(groupId);
    }

    public List<Group> getGroupsByIds(List<Integer> groupIds) {
        return groupRepository.findGroupsByIds(groupIds);
    }

    public void deleteGroupById(int groupId) {
        groupRepository.remove(groupId);
    }

    /**
     * This function will be removed as id generation will be handled by the database.
     * @return A unique group id.
     */
    private int generateUniqueGroupId() {
        int id = 0;
        for (Group group : groupRepository.findAll()) {
            id = Math.max(id, group.getId());
        }

        return ++id;
    }
}
