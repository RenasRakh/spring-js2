package Springjs.service;

import Springjs.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> allUsers();
    void add(User user);
    void delete(User user);
    void edit(int id, User user);
    User getById(int id);
    User getUserByUserName(String name);
}
