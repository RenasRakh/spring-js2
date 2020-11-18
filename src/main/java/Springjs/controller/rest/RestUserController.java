package Springjs.controller.rest;

import Springjs.model.User;
import Springjs.service.UserRepository;
import Springjs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("user/")
public class RestUserController {

    @Autowired
    private UserService userService;

    @GetMapping("authUser")
    public ResponseEntity<User> getAuthUser(Principal user){
        User user2 = userService.getUserByUserName(user.getName());
        return user != null
                ? new ResponseEntity<>(user2, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
