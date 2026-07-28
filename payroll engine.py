base_salary = 1500
over_time_hours = 5
hourly_overtime_rate = 25

def process_payroll(salary, ot_hours, ot_rate):
     # BUG 1: Type mismatch error during calculation
     total_ot_pay = ot_hours * ot_rate
    
     # BUG 2: Logical order of operations error
     gross_pay = (salary + total_ot_pay) * 0.90  # Supposed to deduct a flat 10% tax from the entire Gross Pay (salary + total_ot_pay)
    
     return gross_pay # BUG 3: Case sensitivity / scoping crash

final_salary = process_payroll(base_salary, over_time_hours, hourly_overtime_rate)
print("Final Net Pay calculated:$",final_salary)
