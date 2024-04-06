package org.example.request;

public class CreateGroupRequest {

    private String groupName;

    // Overrides

    @Override
    public String toString() {
        return "CreateGroupRequest{" +
            "groupName='" + groupName + '\'' +
            '}';
    }

    // Getters and Setters

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
}
