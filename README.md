Mars Visit Application Form
Overview
This project is a web application for managing applications to visit Mars. It allows users to submit their application forms, view all applications, and manage individual applications. The application is built using Spring Boot and includes security configurations, RESTful APIs, and a database for storing application data.
The application is running on localhost port 8080 (http://localhost:8080/)
Features
•	User Authentication: Secure login and access control using Spring Security.
•	Application Management: Create, read, update, and delete (CRUD) operations for Mars visit applications.
•	RESTful APIs: Endpoints for managing applications.
•	Database Integration: Persistent storage of application data using JPA and Hibernate.
•	Front-End Integration: Basic HTML pages for user interaction.
Project Structure
•	com.visitapplicationform.app.config: Contains security configurations.
•	com.visitapplicationform.app.controller: Contains REST controllers for handling HTTP requests.
•	com.visitapplicationform.app.model: Contains entity classes representing the data model.
•	com.visitapplicationform.app.service: Contains service classes for business logic.
Getting Started
Prerequisites
•	Java 22
•	Maven 3.6.0 
•	A database
Installation
1.	Clone the repository:
2.	git clone https://github.com/Hamiduh1/VisitApplicationForm.git
3.	Navigate to the project directory:
4.	cd mars-visit-application
5.	Build the project using Maven:
6.	mvn clean install
Running the Application
1.	Run the application:
2.	mvn spring-boot:run
3.	Access the application at http://localhost:8080.
Security Configuration
The security configuration is defined in SecurityConfig.java. It includes:
•	Permitting access to public endpoints such as /api/applications/
•	Disabling CSRF protection and frame options for H2 console access.
•	Using BCryptPasswordEncoder for password encoding.
Database Configuration
The application uses JPA and Hibernate for database interactions. The MarsVisitApplication entity represents the application data model.
