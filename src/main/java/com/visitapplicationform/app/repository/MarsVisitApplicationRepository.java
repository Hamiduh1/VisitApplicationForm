package com.visitapplicationform.app.repository;

import com.visitapplicationform.app.model.MarsVisitApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarsVisitApplicationRepository extends JpaRepository<MarsVisitApplication, Long> {
    // Add custom query methods if needed
}
