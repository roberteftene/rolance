package be.service;

import be.models.JobModel;
import be.models.UserAccountModel;
import be.payload.request.FilterRequestPayload;
import be.repository.JobRepository;
import be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

    public void deleteJob(Integer jobId) {
        JobModel jobModel = jobRepository.getById(jobId);
        jobModel.setUserAccount(null);
        jobRepository.delete(jobModel);
    }

    //Todo: Filters jobs by city, category, price, skill uri
    public boolean checkSkills(JobModel jobModel, String skillsDesired) {
        String[] skillsRequested = skillsDesired.split(",");
        String[] jobSkills = jobModel.getSkills().split(",");
        List<String> skills = Arrays.asList(jobSkills);
        for (String sk : skillsRequested) {
            if (skills.contains(sk)) {
                return true;
            }
        }
        return false;
    }

    public List<String> jobLocations() {
        List<JobModel> jobs = jobRepository.findAll();
        List<String> jobLocations = new ArrayList<>();
        for (JobModel job : jobs) {
            jobLocations.add(job.getJobLocation());
        }

        return jobLocations;
    }

    public List<JobModel> getJobsByUserId(Long userID) {
        return jobRepository.findAll().stream().filter(job -> job.getUserAccount().getId().equals(userID)).collect(Collectors.toList());
    }

    public List<JobModel> getFilteredJobs(FilterRequestPayload filterRequestPayload) {
        List<JobModel> jobs = jobRepository.findAll();
        List<JobModel> filteredJobs = new ArrayList<>();
        if (filterRequestPayload.getCity() != "" && filterRequestPayload.getSkills() != "" && filterRequestPayload.getPrice() != "") {
            for (JobModel job : jobs) {
                if (job.getJobPayment() == null || job.getJobLocation() == null || job.getSkills() == null) {

                } else if (job.getJobLocation().equals(filterRequestPayload.getCity()) &&
                        job.getCategorie().equals(filterRequestPayload.getCategory()) &&
                        Integer.parseInt(job.getJobPayment()) >= Integer.parseInt(filterRequestPayload.getPrice()) &&
                        checkSkills(job, filterRequestPayload.getSkills())) {
                    filteredJobs.add(job);
                }
            }
        } else if (filterRequestPayload.getCity() == "" && filterRequestPayload.getSkills() != "" && filterRequestPayload.getPrice() != "") {
            for (JobModel job : jobs) {

                if (job.getJobPayment() == null || job.getSkills() == null) {

                } else if (job.getCategorie().equals(filterRequestPayload.getCategory()) &&
                        Integer.parseInt(job.getJobPayment()) >= Integer.parseInt(filterRequestPayload.getPrice()) &&
                        checkSkills(job, filterRequestPayload.getSkills())) {
                    filteredJobs.add(job);
                }
            }
        } else if (filterRequestPayload.getCity() == "" && filterRequestPayload.getSkills() == "" && filterRequestPayload.getPrice() != "") {
            for (JobModel job : jobs) {
                if (job.getJobPayment() == null) {

                } else if (job.getCategorie().equals(filterRequestPayload.getCategory()) &&
                        Integer.parseInt(job.getJobPayment()) >= Integer.parseInt(filterRequestPayload.getPrice())) {
                    filteredJobs.add(job);
                }
            }
        } else if (filterRequestPayload.getCity() == "" && filterRequestPayload.getSkills() == "" && filterRequestPayload.getPrice() == "") {
            for (JobModel job : jobs) {
                if (job.getCategorie().equals(filterRequestPayload.getCategory())) {
                    filteredJobs.add(job);
                }
            }
        } else if (filterRequestPayload.getCity() != "" && filterRequestPayload.getSkills() != "" && filterRequestPayload.getPrice() == "") {
            for (JobModel job : jobs) {

                if (job.getJobLocation() == null || job.getSkills() == null) {

                } else if (job.getCategorie().equals(filterRequestPayload.getCategory()) &&
                        job.getJobLocation().equals(filterRequestPayload.getCity()) &&
                        checkSkills(job, filterRequestPayload.getSkills())) {
                    filteredJobs.add(job);
                }
            }
        } else if (filterRequestPayload.getCity() != "" && filterRequestPayload.getSkills() == "" && filterRequestPayload.getPrice() != "") {
            for (JobModel job : jobs) {

                if (job.getJobLocation() == null || job.getJobPayment() == null) {

                } else if (job.getCategorie().equals(filterRequestPayload.getCategory()) &&
                        job.getJobLocation().equals(filterRequestPayload.getCity()) &&
                        Integer.parseInt(job.getJobPayment()) >= Integer.parseInt(filterRequestPayload.getPrice())) {
                    filteredJobs.add(job);
                }
            }
        }
        else if (filterRequestPayload.getCity() != "" && filterRequestPayload.getSkills() == "" && filterRequestPayload.getPrice() == "") {
            for (JobModel job : jobs) {

                if (job.getJobLocation() == null) {

                } else if (job.getCategorie().equals(filterRequestPayload.getCategory()) &&
                        job.getJobLocation().equals(filterRequestPayload.getCity())) {
                    filteredJobs.add(job);
                }
            }
        }

        return filteredJobs;
    }

    public JobModel getJobById(Integer jobId) {
        return jobRepository.findById(jobId).get();
    }

    public void joinJob(Long userId, Integer jobId) {

    }
}
