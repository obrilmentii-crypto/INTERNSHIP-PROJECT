# LEGACY MONOLITHIC NOTIFICATION ENGINE

def send_notification(notification_type, user_recipient, message_payload, priority_level):

    # Validation + Formatting + Dispatch mixed together

    if notification_type == "EMAIL":
        if "@" not in user_recipient:
            print("Invalid Email Address!")
            return False

        print(f'[EMAIL SERVER] Sending "{message_payload}" to {user_recipient} with Priority: {priority_level}')

    elif notification_type == "SMS":
        if len(user_recipient) < 10:
            print("Invalid Phone Number!")
            return False

        print(f'[TWILIO SMS GATEWAY] Dispatching SMS to {user_recipient}: {message_payload}')

    elif notification_type == "PUSH":
        print(f'[FIREBASE APNS] Pushing alert to device token {user_recipient}')

    else:
        print("Error: Unknown Notification Channel.")
        return False

    return True


# Client Usage

send_notification(
    "EMAIL",
    "dev@company.com",
    "System Alert: Storage 90% full",
    "HIGH"
)

send_notification(
    "SMS",
    "1234567890",
    "Your OTP is 4821",
    "CRITICAL"
)