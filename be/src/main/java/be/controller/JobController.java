package be.controller;

import be.models.JobModel;
import be.models.JobsUserBridgeModel;
import be.models.UserAccountModel;
import be.payload.request.FilterRequestPayload;
import be.service.JobService;
import be.service.JobUserBridgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/job")
public class JobController {

    @Autowired
    JobService jobService;
    @Autowired
    JobUserBridgeService jobUserBridgeService;

    @PostMapping("/{userId}")
    @ResponseBody
    @PreAuthorize("hasRole('BUSINESSOWNER') or hasRole('ADMIN')")
    public void addJob(@RequestBody JobModel jobModel, @PathVariable(name = "userId") long userId) {
        jobService.addJob(jobModel,userId);
    }

    @PostMapping("/find")
    public List<JobModel> getFilteredJobs(@RequestBody FilterRequestPayload filterRequestPayload) {
        return jobService.getFilteredJobs(filterRequestPayload);
    }

    @GetMapping("/find/locations")
    public List<String> getJobsLocations() {
        return jobService.jobLocations();
    }

    @GetMapping("/{jobId}")
    public JobModel getJobById(@PathVariable(value = "jobId") Integer jobId) {
        return jobService.getJobById(jobId);
    }

    @PostMapping("/apply")
    public void addApplicant(@RequestBody JobsUserBridgeModel jobsUserBridgeModel) {
        jobUserBridgeService.applyToJob(jobsUserBridgeModel);
    }

    @GetMapping("/applicants/{jobId}")
    public List<UserAccountModel> getApplicants(@PathVariable(value = "jobId") Integer jobId) {
        return jobUserBridgeService.getApplicants(jobId);
    }

    @GetMapping("/jobsApplied/{userId}")
    public List<JobModel> getJobsApplied(@PathVariable(value = "userId") Long userId) {
        return jobUserBridgeService.getJobsApplied(userId);
    }

}
