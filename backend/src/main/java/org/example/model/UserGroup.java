package org.example.model;

import java.util.Objects;

public class UserGroup {

    private int id,
        userId,
        groupId;

    // Overrides

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserGroup userGroup = (UserGroup) o;
        return userId == userGroup.userId && groupId == userGroup.groupId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, groupId);
    }

    public UserGroup(int id, int userId, int groupId) {
        this.id = id;
        this.userId = userId;
        this.groupId = groupId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }
}
