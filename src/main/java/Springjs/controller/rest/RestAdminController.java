package Springjs.controller.rest;

import Springjs.model.User;
import Springjs.service.RoleService;
import Springjs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/admin/**")
public class RestAdminController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "usersTable")
    public ResponseEntity<List<User>> read() {
        final List<User> users = userService.allUsers();

        return users != null &&  !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(name = "id") int id) {
        User user = userService.getById(id);
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        try {

            userService.edit(user.getId().intValue(), user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("deleteUser/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable(name = "id") Long id) {
        try {
            userService.delete(userService.getById(id.intValue()));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("newUser")
    public ResponseEntity<User> newUser(@RequestBody User user){//}), @RequestParam(required = false, name = "roleSet") Set<String> roless) {
        try {

           // user.setRoles(roleServiceImp.getRoleSet(roless));
            userService.add(user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


}
