package be.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "JobsUserBridgeModel")
@Data
public class JobsUserBridgeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    Integer serviceId;
    Long userId;

    public JobsUserBridgeModel() {
    }

    public JobsUserBridgeModel(Integer serviceId, Long userId) {
        this.serviceId = serviceId;
        this.userId = userId;
    }
}
