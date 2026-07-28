# User Authentication & Profile System SDLC Blueprint

## Waterfall Approach

### Analysis
- Gather requirements for user registration, login, logout, password reset, and profile management.
- Define security requirements such as password encryption and authentication rules.
- Obtain stakeholder approval before moving to the next phase.

### Design
- Design the database structure for user accounts and profiles.
- Create wireframes for the login, registration, and profile pages.
- Design the authentication workflow and security architecture.

### Implementation
- Develop the registration feature.
- Develop the login and logout functionality.
- Implement password hashing and session management.
- Develop the user profile management feature.

### Testing
- Perform unit testing on authentication functions.
- Conduct integration testing for the complete login workflow.
- Perform security testing for password encryption and unauthorized access.
- Fix defects before deployment.

### Main Risk of Waterfall

The biggest risk of using the Waterfall methodology for this authentication system is that changes in user requirements or security standards discovered late in development are difficult and costly to implement because each phase must be completed before moving to the next.

---

## Agile Approach

### Sprint 1: User Registration and Login
**Goal**
- Create the user database.
- Build the registration page.
- Build the login page.
- Validate user credentials.

### Sprint 2: Password Recovery
**Goal**
- Implement the password reset feature.
- Send password reset email.
- Improve login validation and error messages.

### Sprint 3: User Profile Management
**Goal**
- Allow users to edit profile information.
- Upload profile pictures.
- Improve profile security and usability.

### User Stories

- As a registered user, I want to securely log into my account using encrypted credentials so that my account remains protected.

- As a registered user, I want to update my profile information so that my account details remain accurate.