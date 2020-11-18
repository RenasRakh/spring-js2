package Springjs.service;

import Springjs.dao.RoleDao;
import Springjs.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class RoleServiceImp implements  RoleService{
    @Autowired
    private RoleDao roledao;

    @Override
    @Transactional
    public Set<Role> getRoleSet(Set<String> roles){
        return roledao.getRoleSet(roles);
    }

    @Override
    @Transactional
    public Role getRoleById(int id){
        return roledao.getRoleById(id);
    }

    @Override
    @Transactional
    public Role getRoleByName(String name){
        return roledao.getRoleByName(name);
    }


}
