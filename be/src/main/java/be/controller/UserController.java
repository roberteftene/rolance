package be.controller;

import be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/account")
public class UserController {

    @Autowired
    UserService userService;


//    @PostMapping("/employees/{serviceId}")
//    @PreAuthorize("hasRole('BUSINESSOWNER') or hasRole('ADMIN')")
//    public MessageResponse addEmployee(@PathVariable(value = "serviceId")int serviceId, @Valid @RequestBody EmployeeUsername employeeUsername) {
//        String username = employeeUsername.getUserName();
//        return userService.addEmployeeAccount(username,serviceId);
//    }
//
//    @GetMapping("/employees/{ownerId}")
//    @PreAuthorize("hasRole('BUSINESSOWNER') or hasRole('ADMIN')")
//    public List<UserAccountModel> getAllEmployees(@PathVariable(value = "ownerId") Long ownerId) {
//        return userService.getAllEmployeesByOwnerId(ownerId);
//    }
//
//    @PutMapping("/employees")
//    @PreAuthorize("hasRole('BUSINESSOWNER') or hasRole('ADMIN')")
//    public MessageResponse removeEmployee(@RequestBody EmployeeUsername employeeUsername) {
//        String username = employeeUsername.getUserName();
//        return userService.removeEmployee(username);
//    }
}
