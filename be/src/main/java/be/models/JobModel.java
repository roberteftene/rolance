package be.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Entity(name = "job")
@Data
public class JobModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "job_id")
    private Integer jobId;
    private String jobTitle;
    private String jobLocation;
    private String jobDescription;
    private String startDate;
    private String jobDuration;
    private String jobPayment;
    private String skills;
    private String categorie;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private UserAccountModel userAccount;

    public JobModel() {
    }

    public JobModel(String jobTitle,String jobLocation, String jobDescription, String startDate, String jobDuration, String jobPayment, String skills, String categorie, UserAccountModel userAccount) {
        this.jobDescription = jobDescription;
        this.jobTitle = jobTitle;
        this.startDate = startDate;
        this.jobDuration = jobDuration;
        this.jobPayment = jobPayment;
        this.skills = skills;
        this.jobLocation = jobLocation;
        this.categorie = categorie;
        this.userAccount = userAccount;
    }

    public JobModel(String jobTitle,String jobLocation,String jobDescription, String startDate, String jobDuration, String jobPayment, String skills, String categorie) {
        this.jobDescription = jobDescription;
        this.jobTitle = jobTitle;
        this.startDate = startDate;
        this.jobLocation = jobLocation;
        this.jobDuration = jobDuration;
        this.jobPayment = jobPayment;
        this.skills = skills;
        this.categorie = categorie;
    }

    public JobModel(String jobTitle,String jobLocation,String jobDescription, String jobPayment, String skills, String categorie) {
        this.jobDescription = jobDescription;
        this.jobTitle = jobTitle;
        this.jobLocation = jobLocation;
        this.jobPayment = jobPayment;
        this.skills = skills;
        this.categorie = categorie;
    }

    public JobModel(String jobTitle,String jobLocation,String jobDescription, String jobDuration, String jobPayment, String skills, String categorie) {
        this.jobDescription = jobDescription;
        this.jobTitle = jobTitle;
        this.jobLocation = jobLocation;
        this.jobDuration = jobDuration;
        this.jobPayment = jobPayment;
        this.skills = skills;
        this.categorie = categorie;
    }


}
