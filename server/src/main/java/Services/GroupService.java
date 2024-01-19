package Services;

import model.Group;
import repository.GroupRepository;

public class GroupService {
    GroupRepository groupRepository;

    public GroupService(GroupRepository _groupRepository){
        groupRepository = _groupRepository;
    }

    public void save(Group group){
        groupRepository.save(group);
    }

    public void remove(Integer id){
        groupRepository.remove(id);
    }

    public void update(Group group){
        groupRepository.update(group);
    }

    public Iterable<Group> getAll(){
        return groupRepository.findAll();
    }
}
