package be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity(name = "employee")
@Data
public class EmployeeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "employee_id")
    private long employeeId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "useraccount_id", referencedColumnName = "id")
    @JsonIgnore
    private UserAccountModel userAccountModel;


    public EmployeeModel() {
    }

}