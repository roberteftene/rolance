package be.controller;

import be.models.JobModel;
import be.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/job")
public class JobController {

    @Autowired
    JobService jobService;

    @PostMapping("/{userId}")
    @ResponseBody
    @PreAuthorize("hasRole('BUSINESSOWNER') or hasRole('ADMIN')")
    public void addJob(@RequestBody JobModel jobModel, @PathVariable(name = "userId") long userId) {
        jobService.addJob(jobModel,userId);
    }
}
