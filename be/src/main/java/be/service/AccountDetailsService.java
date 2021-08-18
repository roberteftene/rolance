package be.service;

import be.models.SubscriptionModel;
import be.models.UserAccountModel;
import be.models.UserDetailsModel;
import be.repository.AccountDetailsRepository;
import be.repository.SubscriptionRepository;
import be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountDetailsService {

    @Autowired
    AccountDetailsRepository accountDetailsRepository;

    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Autowired
    UserRepository userRepository;

    public UserDetailsModel addDetails(UserDetailsModel userDetailsModel, long userId) {
        UserAccountModel userAccountModel = userRepository.findById(userId).get();
        userDetailsModel.setUserAccount(userAccountModel);
        accountDetailsRepository.save(userDetailsModel);
        return userDetailsModel;
    }

    public UserDetailsModel getDetailsByUserId(long userId) {
        return accountDetailsRepository
                .findByUserAccountId(userId)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

}