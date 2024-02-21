package org.example.repository;

import org.example.model.Group;

import java.util.List;

public interface GroupRepository extends Repository<Group, Integer> {

    /**
     * Receives the groups by some given ids.
     * @param groupIds The ids of the groups.
     * @return The groups associated with the given ids.
     */
    List<Group> findGroupsByIds(List<Integer> groupIds);
}
