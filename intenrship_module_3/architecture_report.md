# ARCHITECTURAL JUSTIFICATION & VERIFICATION
## SOLID VIOLATION AUDITS
 ### 1. Single Responsibility Principle (SRP)

- The legacy Notification Service violates the Single Responsibility Principle because it performs multiple responsibilities inside one function. It validates recipient information, formats messages, selects the notification channel, and sends notifications.

### 2. Open/Closed Principle (OCP)

- The legacy code violates the Open/Closed Principle because every time a new notification type is required, the existing send_notification() function must be modified by adding another if/elif statement. This increases maintenance effort and risks introducing new bugs.

---

## Extensibility Proof

- The refactored implementation uses the Strategy Design Pattern.

- To add WhatsApp notifications, a new class named WhatsAppNotificationStrategy was created.

- No existing strategy classes or the NotificationContext class needed to be modified.

---

## Execution Screenshot / Terminal Proof

```python
context = NotificationContext()

context.set_strategy(EmailNotificationStrategy())
context.send("dev@company.com", "System Alert")

context.set_strategy(SMSNotificationStrategy())
context.send("1234567890", "OTP 4821")

context.set_strategy(PushNotificationStrategy())
context.send("DEVICE001", "New Login")

context.set_strategy(WhatsAppNotificationStrategy())
context.send("1234567890", "Order Delivered")
```