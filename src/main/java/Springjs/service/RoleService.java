package Springjs.service;

import Springjs.model.Role;

import java.util.Set;

public interface RoleService {
    Set<Role> getRoleSet(Set<String> roles);
    Role getRoleById(int id);
    Role getRoleByName(String name);
}
