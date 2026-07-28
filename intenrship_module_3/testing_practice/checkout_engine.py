def calculateOrderTotal(cartSubtotal, customerTier, isInternational):
    
    # Validate subtotal
    if not isinstance(cartSubtotal, (int, float)) or cartSubtotal < 0:
        raise ValueError("Invalid cart subtotal")

    # Apply discount
    if customerTier == "STANDARD":
        discount = 0
    elif customerTier == "SILVER":
        discount = 0.10
    elif customerTier == "GOLD":
        discount = 0.20
    else:
        discount = 0

    discountedSubtotal = cartSubtotal * (1 - discount)

    # Volume bonus
    if cartSubtotal >= 100:
        discountedSubtotal -= 10

    # Shipping
    if discountedSubtotal >= 150:
        shipping = 0
    elif isInternational:
        shipping = 25
    else:
        shipping = 5

    total = discountedSubtotal + shipping

    return total