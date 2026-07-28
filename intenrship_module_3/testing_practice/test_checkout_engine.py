import unittest
from checkout_engine import calculateOrderTotal


class TestCheckoutEngine(unittest.TestCase):

    # Test 1
    def test_standard_order(self):
        self.assertEqual(
            calculateOrderTotal(50, "STANDARD", False),
            55
        )

    # Test 2
    def test_gold_discount_volume_bonus(self):
        self.assertEqual(
            calculateOrderTotal(120, "GOLD", False),
            91
        )

    # Test 3
    def test_free_international_shipping(self):
        self.assertEqual(
            calculateOrderTotal(200, "GOLD", True),
            150
        )

    # Test 4
    def test_boundary_100_threshold(self):
        self.assertEqual(
            calculateOrderTotal(100, "STANDARD", False),
            95
        )

    # Test 5
    def test_negative_subtotal(self):
        with self.assertRaises(ValueError):
            calculateOrderTotal(-25, "STANDARD", False)


if __name__ == "__main__":
    unittest.main()