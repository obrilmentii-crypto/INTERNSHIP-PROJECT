import re

def validateRegistration(username, age, password):
    errors =[]
    if (
        not username 
        or not isinstance(username,str)
        or len(username) < 4
        or len(username) > 12
    ):
        errors.append("username must be between 4 and 12 characters")

    if username and isinstance(username, str) and not re.match(r"^[a-zA-Z0-9]+$", username):
        errors.append("Username must be alphanumeric.")  

    if age <= 16 or age > 60:
        errors.append("age must be between 16 and 60")

    if(
        not password
        or not isinstance(password,str)
        or len(password) <= 7
        or len(password) >16 
    ):
        errors.append("password must be between 7 and 16 values")
    if password and isinstance(password,str) and not re.search(r"[0-9]",password):
             errors.append("Password must contain at least one digit.")

    return {"isValid": len(errors) == 0, "errors": errors}

if __name__ == "__main__":
    
    print("Registration Validator")
    print("======================")

    result = validateRegistration(
        "validUser",
        25,
        "Secure1@"
    )

    print(result)