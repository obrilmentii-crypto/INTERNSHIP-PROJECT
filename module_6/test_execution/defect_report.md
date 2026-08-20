# Registration Validator Defect Report

## Summary

- **Total Tests:** 15
- **Passed:** 10
- **Failed:** 5
- **Defects Found:** 5

### DEF-001 — Age 18 Rejected

- **Severity/Priority:** Major / P2
- **Test:** TC-REG-006
- **Input:** `validateRegistration("validUser", 18, "Secure1@")`
- **Expected:** `isValid=true`
- **Actual:** `isValid=false`
- **Cause:** `age <= 18` rejects valid age 18.
- **Fix:** Change to `age < 18`.

### DEF-002 — 7-Character Password Accepted

- **Severity/Priority:** Major / P2
- **Test:** TC-REG-009
- **Input:** `validateRegistration("validUser", 25, "Secure1")`
- **Expected:** `isValid=false`
- **Actual:** `isValid=true`
- **Cause:** Special-character validation is missing.

### DEF-003 — 17-Character Password Accepted

- **Severity/Priority:** Major / P2
- **Test:** TC-REG-012
- **Input:** `validateRegistration("validUser", 25, "SecurePassword1@x")`
- **Expected:** `isValid=false`
- **Actual:** `isValid=true`
- **Cause:** Code uses `len(password) > 17` instead of `len(password) > 16`.

### DEF-004 — Special Character Not Required

- **Severity/Priority:** Major / P1
- **Test:** TC-REG-013
- **Input:** `validateRegistration("validUser", 25, "Secure123")`
- **Expected:** `isValid=false`
- **Actual:** `isValid=true`
- **Cause:** No validation for `[!@#$%^&*]`.

### DEF-005 — Lowercase Letter Not Required

- **Severity/Priority:** Major / P1
- **Test:** TC-REG-015
- **Input:** `validateRegistration("validUser", 25, "SECURE1@")`
- **Expected:** `isValid=false`
- **Actual:** `isValid=true`
- **Cause:** Lowercase validation is missing.

## Conclusion

Five defects were found using Boundary Value Analysis and Equivalence Partitioning. The validator does not fully comply with the security specification.