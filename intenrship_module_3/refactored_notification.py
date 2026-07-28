from abc import ABC, abstractmethod

# Abstract strategies
class  NotificationStrategy(ABC):
    """Abstract base for notification strategies"""

    @abstractmethod
    def dispatch(self, recipient, message):
        pass

# Email strategie
class EmailNotificationStrategy(NotificationStrategy):

    def dispatch(self, recipient, message):
        if "@" not in recipient:
            print("Invalid Email Address!")
            return
     
        print(f'[EMAIL SERVER] Sending "{message}" to {recipient}')

# SMS Strategie 
class SMSNotificationStrategy(NotificationStrategy):
     
    def dispatch(self, recipient, message):
        if len(recipient) < 10:
           print("Invalid Phone Number!")
           return
     
        print(f'[TWILIO SMS GATEWAY] Dispatching SMS to {recipient}: {message}')

# Push strategie         
class PushNotificationStrategy(NotificationStrategy):
    
    def dispatch(self, recipient, message):
        print(f'[FIREBASE APNS] Pushing "{message}" to device token {recipient}')
# Fourth Notification Strategy (WhatsApp)
class WhatsAppNotificationStrategy(NotificationStrategy):

    def dispatch(self, recipient, message):
        if len(recipient) < 10:
            print("Invalid WhatsApp Number!")
            return

        print(f'[WHATSAPP API] Sending "{message}" to {recipient}')
# Context
class NotificationContext:
     
      def __init__(self, strategy=None):
            self.strategy = strategy

      def set_strategy(self, strategy):
            self.strategy = strategy

      def send(self, recipient, message):
        if self.strategy is None:
            print("No notification strategy selected.")
            return

        self.strategy.dispatch(recipient, message)


# Client Code

context = NotificationContext()

context.set_strategy(EmailNotificationStrategy())
context.send("dev@company.com", "Server Storage 90% Full")

context.set_strategy(SMSNotificationStrategy())
context.send("1234567890", "Your OTP is 4821")

context.set_strategy(PushNotificationStrategy())
context.send("DEVICE_001", "You have a new order!")
context.set_strategy( WhatsAppNotificationStrategy())
context.send("1234567890", "Your package has been shipped.")

     
            
                   
             