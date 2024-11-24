package com.visitapplicationform.app.service;

import com.visitapplicationform.app.model.MarsVisitApplication;
import com.visitapplicationform.app.repository.MarsVisitApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarsVisitApplicationService {

    @Autowired
    private MarsVisitApplicationRepository applicationRepository;

    // Add a new application
    public MarsVisitApplication addApplication(MarsVisitApplication application) {
        return applicationRepository.save(application);
    }

    // Get all applications
    public List<MarsVisitApplication> getAllApplications() {
        return applicationRepository.findAll();
    }

    // Get application by ID
    public MarsVisitApplication getApplicationById(Long id) {
        Optional<MarsVisitApplication> application = applicationRepository.findById(id);
        return application.orElse(null);
    }

    // Update application
    public MarsVisitApplication updateApplication(Long id, MarsVisitApplication updatedApplication) {
        if (!applicationRepository.existsById(id)) {
            return null; // or throw an exception
        }
        updatedApplication.setId(id);
        return applicationRepository.save(updatedApplication);
    }

    // Delete application
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}
