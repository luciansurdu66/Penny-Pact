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

    /**
     * Finds the first matching group by name.
     * @param name The name of the group.
     * @return The first group found with the given name.
     *         Null if not found.
     */
    Group findByName(String name);
}
