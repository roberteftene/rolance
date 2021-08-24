package be.repository;

import be.models.JobsUserBridgeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobsUserBridgeRepository extends JpaRepository<JobsUserBridgeModel,Integer> {
}
