import pytest
from unittest.mock import Mock
from order_service import OrderService

def test_standard_subtotal_with_multiple_items():
    items = [
        {
            "itemId": 1,
            "price": 100,
            "quantity": 2
        },
        {
            "itemId": 2,
            "price": 50,
            "quantity": 3
        }
    ]

    result = OrderService.calculateDiscountedTotal(items)

    assert result == 350


def test_save10_discount():
    items = [
        {
            "itemId": 1,
            "price": 100,
            "quantity": 2
        }
    ]

    result = OrderService.calculateDiscountedTotal(
        items,
        "SAVE10"
    )

    assert result == 180


def test_save20_discount():
    items = [
        {
            "itemId": 1,
            "price": 100,
            "quantity": 2
        }
    ]

    result = OrderService.calculateDiscountedTotal(
        items,
        "SAVE20"
    )

    assert result == 160


def test_negative_price_raises_error():
    items = [
        {
            "itemId": 1,
            "price": -100,
            "quantity": 2
        }
    ]

    with pytest.raises(ValueError):
        OrderService.calculateDiscountedTotal(items)

def test_empty_items_raises_error():
    with pytest.raises(ValueError):
        OrderService.calculateDiscountedTotal([])

def test_successful_order_flow():
    paymentGateway = Mock()
    inventoryRepository = Mock()

    paymentGateway.charge.return_value = True

    inventoryRepository.checkStock.return_value = True

    orderData = {
        "userId": "user123",
        "items": [
            {
                "itemId": 101,
                "price": 100,
                "quantity": 2
            }
        ]
    }

    result = OrderService.processOrder(
        orderData,
        paymentGateway,
        inventoryRepository
    )

    assert result["status"] == "CONFIRMED"

    inventoryRepository.deductStock.assert_called_once_with(
        101,
        2
    )

    paymentGateway.charge.assert_called_once_with(
        "user123",
        200
    )


def test_payment_failure_flow():
    paymentGateway = Mock()
    inventoryRepository = Mock()

    paymentGateway.charge.return_value = False

    inventoryRepository.checkStock.return_value = True

    orderData = {
        "userId": "user123",
        "items": [
            {
                "itemId": 101,
                "price": 100,
                "quantity": 2
            }
        ]
    }

    result = OrderService.processOrder(
        orderData,
        paymentGateway,
        inventoryRepository
    )

    assert result["status"] == "PAYMENT_FAILED"

    inventoryRepository.deductStock.assert_not_called()


def test_out_of_stock_flow():
    paymentGateway = Mock()
    inventoryRepository = Mock()

    inventoryRepository.checkStock.return_value = False

    orderData = {
        "userId": "user123",
        "items": [
            {
                "itemId": 101,
                "price": 100,
                "quantity": 2
            }
        ]
    }

    result = OrderService.processOrder(
        orderData,
        paymentGateway,
        inventoryRepository
    )

    assert result["status"] == "INSUFFICIENT_STOCK"

    paymentGateway.charge.assert_not_called()

    inventoryRepository.deductStock.assert_not_called()