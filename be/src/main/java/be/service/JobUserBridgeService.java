package be.service;

import be.models.JobModel;
import be.models.JobsUserBridgeModel;
import be.models.UserAccountModel;
import be.repository.JobRepository;
import be.repository.JobsUserBridgeRepository;
import be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobUserBridgeService {

    @Autowired
    JobsUserBridgeRepository jobsUserBridgeRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JobRepository jobRepository;

    public void applyToJob(JobsUserBridgeModel jobsUserBridgeModel) {
        jobsUserBridgeRepository.save(jobsUserBridgeModel);
    }

    public List<UserAccountModel> getApplicants(Integer serviceId) {
        List<JobsUserBridgeModel> applicantsIds  = jobsUserBridgeRepository.findAll()
                .stream()
                .filter(bridge -> bridge.getServiceId().equals(serviceId))
                .collect(Collectors.toList());
        List<UserAccountModel> accountModels = new ArrayList<>();
        for (JobsUserBridgeModel applicantsId : applicantsIds) {
            UserAccountModel userAccountModel = new UserAccountModel();
            userAccountModel = userRepository.findById(applicantsId.getUserId()).get();
           accountModels.add(userAccountModel);
        }
        return accountModels;
    }

    public List<JobModel> getJobsApplied(Long userId) {
        List<JobsUserBridgeModel> applicantsIds  = jobsUserBridgeRepository.findAll()
                .stream()
                .filter(bridge -> bridge.getUserId().equals(userId))
                .collect(Collectors.toList());
        List<JobModel> jobsApplied = new ArrayList<>();
        for (JobsUserBridgeModel applicantsId : applicantsIds) {
            JobModel jobModel = new JobModel();
            jobModel = jobRepository.findById(applicantsId.getServiceId()).get();
            jobsApplied.add(jobModel);
        }
        return jobsApplied;
    }
}
