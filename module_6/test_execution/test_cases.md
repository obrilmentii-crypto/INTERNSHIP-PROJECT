# Registration Validator Test Cases

## Test Design

- **BVA:** Username, age, and password boundaries.
- **EP:** Password complexity.

### TC-REG-001
- **Objective:** Username length = 3.
- **Technique:** BVA
- **Inputs:** `username="abc"`, `age=25`, `password="Secure1@"`
- **Expected:** `isValid=false`
- **Actual:** `isValid=false`
- **Status:** PASSED

### TC-REG-002
- **Objective:** Username length = 4.
- **Technique:** BVA
- **Inputs:** `username="Abcd"`, `age=25`, `password="Secure1@"`
- **Expected:** `isValid=true`
- **Actual:** `isValid=true`
- **Status:** PASSED

### TC-REG-003
- **Objective:** Username length = 12.
- **Technique:** BVA
- **Inputs:** `username="Abcdefghijkl"`, `age=25`, `password="Secure1@"`
- **Expected:** `isValid=true`
- **Actual:** `isValid=true`
- **Status:** PASSED

### TC-REG-004
- **Objective:** Username length = 13.
- **Technique:** BVA
- **Inputs:** `username="Abcdefghijklm"`, `age=25`, `password="Secure1@"`
- **Expected:** `isValid=false`
- **Actual:** `isValid=false`
- **Status:** PASSED

### TC-REG-005
- **Objective:** Age = 17.
- **Technique:** BVA
- **Inputs:** `username="validUser"`, `age=17`, `password="Secure1@"`
- **Expected:** `isValid=false`
- **Actual:** `isValid=false`
- **Status:** PASSED

### TC-REG-006
- **Objective:** Age = 18.
- **Technique:** BVA
- **Inputs:** `username="validUser"`, `age=18`, `password="Secure1@"`
- **Expected:** `isValid=true`
- **Actual:** `isValid=false`
- **Status:** FAILED

### TC-REG-007
- **Objective:** Age = 60.
- **Technique:** BVA
- **Inputs:** `username="validUser"`, `age=60`, `password="Secure1@"`
- **Expected:** `isValid=true`
- **Actual:** `isValid=true`
- **Status:** PASSED

### TC-REG-008
- **Objective:** Age = 61.
- **Technique:** BVA
- **Inputs:** `username="validUser"`, `age=61`, `password="Secure1@"`
- **Expected:** `isValid=false`
- **Actual:** `isValid=false`
- **Status:** PASSED

### TC-REG-009
- **Objective:** Password length = 7.
- **Technique:** BVA
- **Inputs:** `username="validUser"`, `age=25`, `password="Secure1"`
- **Expected:** `isValid=false`
- **Actual:** `isValid=true`
- **Status:** FAILED

### TC-REG-010
- **Objective:** Password length = 8.
- **Technique:** BVA
- **Inputs:** `username="validUser"`, `age=25`, `password="Secure1@"`
- **Expected:** `isValid=true`
- **Actual:** `isValid=true`
- **Status:** PASSED

### TC-REG-011
- **Objective:** Password length = 16.
- **Technique:** BVA
- **Inputs:** `username="validUser"`, `age=25`, `password="SecurePassword1@"`
- **Expected:** `isValid=true`
- **Actual:** `isValid=true`
- **Status:** PASSED

### TC-REG-012
- **Objective:** Password length = 17.
- **Technique:** BVA
- **Inputs:** `username="validUser"`, `age=25`, `password="SecurePassword1@x"`
- **Expected:** `isValid=false`
- **Actual:** `isValid=true`
- **Status:** FAILED

### TC-REG-013
- **Objective:** Password without special character.
- **Technique:** EP
- **Inputs:** `username="validUser"`, `age=25`, `password="Secure123"`
- **Expected:** `isValid=false`
- **Actual:** `isValid=true`
- **Status:** FAILED

### TC-REG-014
- **Objective:** Password without digit.
- **Technique:** EP
- **Inputs:** `username="validUser"`, `age=25`, `password="Secure@x"`
- **Expected:** `isValid=false`
- **Actual:** `isValid=false`
- **Status:** PASSED

### TC-REG-015
- **Objective:** Password without lowercase letter.
- **Technique:** EP
- **Inputs:** `username="validUser"`, `age=25`, `password="SECURE1@"`
- **Expected:** `isValid=false`
- **Actual:** `isValid=true`
- **Status:** FAILED

## Summary

- **Total:** 15
- **Passed:** 10
- **Failed:** 5