package com.visitapplicationform.app.controller;

import com.visitapplicationform.app.model.MarsVisitApplication;
import com.visitapplicationform.app.service.MarsVisitApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class MarsVisitApplicationController {

    @Autowired
    private MarsVisitApplicationService applicationService;

    @PostMapping
    public ResponseEntity<MarsVisitApplication> addApplication(@RequestBody MarsVisitApplication application) {
        application.setApplicationDate(LocalDate.now());
        MarsVisitApplication createdApplication = applicationService.addApplication(application);
        return ResponseEntity.ok(createdApplication);
    }

    @GetMapping
    public ResponseEntity<List<MarsVisitApplication>> getAllApplications() {
        List<MarsVisitApplication> applications = applicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarsVisitApplication> getApplicationById(@PathVariable Long id) {
        MarsVisitApplication application = applicationService.getApplicationById(id);
        return application != null ? ResponseEntity.ok(application) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<MarsVisitApplication> updateApplication(@PathVariable Long id, @RequestBody MarsVisitApplication application) {
        MarsVisitApplication updatedApplication = applicationService.updateApplication(id, application);
        return updatedApplication != null ? ResponseEntity.ok(updatedApplication) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }
}
