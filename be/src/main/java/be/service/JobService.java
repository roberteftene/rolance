package be.service;

import be.models.JobModel;
import be.models.UserAccountModel;
import be.repository.JobRepository;
import be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobService {

    @Autowired
    JobRepository jobRepository;

    @Autowired
    UserRepository userRepository;

    public void addJob(JobModel jobModel, long userId) {
        UserAccountModel userAccountModel = userRepository.findById(userId).get();
        jobModel.setUserAccount(userAccountModel);
        jobRepository.save(jobModel);
    }
}
