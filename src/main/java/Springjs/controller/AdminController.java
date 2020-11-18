package Springjs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import Springjs.model.User;
import Springjs.service.RoleService;
import Springjs.service.UserService;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;
import java.util.Set;

@Controller
@RequestMapping("admin/")
public class AdminController {
    @Autowired
    UserService userService;

    @Autowired
    RoleService roleServiceImp;

    @GetMapping("/")
    public String admin() {

        return "redirect:/admin/users/";
    }

    @GetMapping("/users")
    public ModelAndView allUsers2(Principal admin) {


        User user = new User();
        ModelAndView modelAndView = new ModelAndView("admin/users");
        User adm = userService.getUserByUserName(admin.getName());

        modelAndView.addObject("admin", adm)
                .addObject("user", user)
                .addObject("userupd", new User())
                .addObject("users", userService.allUsers());
        return modelAndView;
    }


    @PostMapping(value = "delete")
    public String deleteUser(@RequestParam("id") int id) {
        userService.delete(userService.getById(id));
        return "redirect:/admin/users/";
    }


    @PostMapping("edituser")
    public String updateUser2(@RequestParam("id") int id, @ModelAttribute("user") User user, @RequestParam(required = false, name = "roles1") Set<String> roless) {

        System.out.println(id + "_______________");
        System.out.println(user.toString() + "_______________");
        user.setRoles(roleServiceImp.getRoleSet(roless));
        userService.edit(id, user);
        return "redirect:/admin/users/";
    }

    @PostMapping("/add_user")
    public String addNewUser(@ModelAttribute("user") User user, @RequestParam(required = false, name = "roles1") Set<String> roless) {
        user.setRoles(roleServiceImp.getRoleSet(roless));
        userService.add(user);

        return "redirect:/admin/users/";
    }

}
