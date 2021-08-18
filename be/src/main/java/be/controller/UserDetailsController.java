package be.controller;


import be.models.UserDetailsModel;
import be.service.AccountDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/account-details")
public class UserDetailsController {

    @Autowired
    AccountDetailsService accountDetailsService;

    @PostMapping("/{uid}")
    @ResponseBody
    public UserDetailsModel addDetails(@RequestBody UserDetailsModel userDetailsModel,
                                       @PathVariable(value = "uid") long userId) {
        accountDetailsService.addDetails(userDetailsModel,userId);
        return  userDetailsModel;
    }

    @GetMapping("/{id}")
    public UserDetailsModel getDetailsByUserId(@PathVariable(value = "id")long userId) {
        return accountDetailsService.getDetailsByUserId(userId);
    }

}