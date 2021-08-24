package be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "user_details")
@Getter
@Setter
public class UserDetailsModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Integer uId;

    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "birthday")
    private String birthday;
    @Column(name = "phone")
    private String phone;
    @Column(name="country")
    private String country;
    @Column(name = "city")
    private String city;
    @Column(name = "experience")
    private String experienceDescription;
    @Column(name = "skills")
    private String skills;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "useraccount_id", referencedColumnName = "id")
    @JsonIgnore
    private UserAccountModel userAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_id", referencedColumnName = "subscription_id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private SubscriptionModel subscriptionModel;



    public UserDetailsModel() {
    }

    public UserDetailsModel(String firstName, String lastName,String phone, String birthday, String country, String city) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.phone = phone;
        this.country = country;
        this.city = city;
    }

    public UserDetailsModel(String firstName, String lastName,String phone, String birthday, String country, String city, String experienceDescription, String skills) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.birthday = birthday;
        this.country = country;
        this.city = city;
        this.experienceDescription = experienceDescription;
        this.skills = skills;
    }

    public UserDetailsModel(String firstName, String lastName,String phone, String birthday, String country, String city, String experienceDescription, String skills, UserAccountModel userAccount, SubscriptionModel subscriptionModel) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.birthday = birthday;
        this.country = country;
        this.city = city;
        this.experienceDescription = experienceDescription;
        this.skills = skills;
        this.userAccount = userAccount;
        this.subscriptionModel = subscriptionModel;
    }
}
