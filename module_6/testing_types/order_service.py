class OrderService:

    @staticmethod
    def calculateDiscountedTotal(items, discountCode=None):
        if not items:
            raise ValueError("Item array cannot be empty")

        subtotal = 0

        for item in items:
            price = item.get("price")
            quantity = item.get("quantity")

            if price is None or quantity is None:
                raise ValueError("Each item must have price and quantity")

            if price < 0:
                raise ValueError("Price cannot be negative")

            if quantity < 0:
                raise ValueError("Quantity cannot be negative")

            subtotal += price * quantity

        if discountCode == "SAVE10":
            return subtotal * 0.90

        if discountCode == "SAVE20":
            return subtotal * 0.80

        if discountCode is not None:
            raise ValueError("Invalid or expired discount code")

        return subtotal

    @staticmethod
    def processOrder(orderData, paymentGateway, inventoryRepository):
        items = orderData["items"]
        userId = orderData["userId"]
        discountCode = orderData.get("discountCode")

        for item in items:
            available = inventoryRepository.checkStock(
                item["itemId"],
                item["quantity"]
            )

            if not available:
                return {
                    "status": "INSUFFICIENT_STOCK"
                }

        totalAmount = OrderService.calculateDiscountedTotal(
            items,
            discountCode
        )

        paymentSuccessful = paymentGateway.charge(
            userId,
            totalAmount
        )

        if not paymentSuccessful:
            return {
                "status": "PAYMENT_FAILED"
            }

        for item in items:
            inventoryRepository.deductStock(
                item["itemId"],
                item["quantity"]
            )
            
        return {
            "status": "CONFIRMED",
            "total": totalAmount
        }