package org.example.repository;

import org.example.model.UserGroup;

public interface UserGroupRepository extends Repository<UserGroup, Integer> {

    /**
     * Retrieves the groups of a user.
     * @param userId The id of the user.
     * @return An iterable containing the specific groups.
     */
    Iterable<Integer> findGroupIdsByUserId(int userId);

    /**
     * Checks if the given user-group key pair exists
     * within the repo.
     * @param userId A user id.
     * @param groupId A group id.
     * @return True if exists, false otherwise.
     */
    boolean containsUserGroupKeyPair(int userId, int groupId);

    /**
     * Removes all user-group pairs that contain
     * the given group id.
     * @param groupId The id of the group.
     */
    void removeAllPairsHavingGroupId(int groupId);
}
