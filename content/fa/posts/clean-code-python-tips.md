+++
title = "۱۰ نکته طلایی برای نوشتن کد تمیز در پایتون"
date = 2024-10-28
description = "اصول و تکنیک‌های کاربردی برای نوشتن کد پایتون خوانا، قابل نگهداری و حرفه‌ای"
categories = ["پایتون", "برنامه‌نویسی"]
tags = ["Python", "Clean Code", "Best Practices", "PEP 8"]
image = "/images/posts/clean-code-python.jpg"
author = "تیم سبزیاد"
reading_time = "8 دقیقه"
+++

نوشتن کد تمیز فقط درباره‌ی کار کردن کد نیست - بلکه درباره‌ی خوانایی، نگهداری و همکاری بهتر است. بیایید ۱۰ نکته‌ی کلیدی را برای نوشتن کد پایتون تمیزتر یاد بگیریم.

## ۱. از نام‌گذاری معنادار استفاده کنید

### ❌ بد:
```python
def calc(x, y, z):
    return x * y + z

a = calc(10, 20, 30)
```

### ✅ خوب:
```python
def calculate_total_price(unit_price, quantity, shipping_cost):
    """محاسبه قیمت کل با احتساب هزینه ارسال"""
    return unit_price * quantity + shipping_cost

total_price = calculate_total_price(
    unit_price=10,
    quantity=20,
    shipping_cost=30
)
```

**قوانین نام‌گذاری:**
- متغیرها و توابع: `snake_case`
- کلاس‌ها: `PascalCase`
- ثابت‌ها: `UPPER_CASE`
- نام‌ها باید توصیفی و واضح باشند

## ۲. یک تابع، یک مسئولیت (Single Responsibility)

### ❌ بد:
```python
def process_user_data(user):
    # اعتبارسنجی
    if not user.email or '@' not in user.email:
        raise ValueError("ایمیل نامعتبر")
    
    # ذخیره در دیتابیس
    db.save(user)
    
    # ارسال ایمیل خوش‌آمدگویی
    send_email(user.email, "خوش آمدید!")
    
    # ثبت لاگ
    logger.info(f"کاربر {user.name} ثبت شد")
```

### ✅ خوب:
```python
def validate_email(email):
    """اعتبارسنجی فرمت ایمیل"""
    if not email or '@' not in email:
        raise ValueError("ایمیل نامعتبر")

def save_user_to_database(user):
    """ذخیره کاربر در دیتابیس"""
    db.save(user)

def send_welcome_email(email):
    """ارسال ایمیل خوش‌آمدگویی"""
    send_email(email, "خوش آمدید!")

def log_user_registration(username):
    """ثبت لاگ ثبت‌نام کاربر"""
    logger.info(f"کاربر {username} ثبت شد")

def process_user_data(user):
    """پردازش داده‌های کاربر جدید"""
    validate_email(user.email)
    save_user_to_database(user)
    send_welcome_email(user.email)
    log_user_registration(user.name)
```

## ۳. از List Comprehension بجا استفاده کنید

### ❌ بد:
```python
# پیچیده و خوانایی پایین
result = [x.upper() for x in data if len(x) > 3 if x.startswith('a') if not x.endswith('z')]
```

### ✅ خوب:
```python
# تابع کمکی برای خوانایی بهتر
def should_include(text):
    return (
        len(text) > 3 
        and text.startswith('a') 
        and not text.endswith('z')
    )

result = [x.upper() for x in data if should_include(x)]

# یا استفاده از حلقه معمولی برای شرایط پیچیده
result = []
for item in data:
    if should_include(item):
        result.append(item.upper())
```

## ۴. از Type Hints استفاده کنید (Python 3.5+)

### ❌ بد:
```python
def calculate_discount(price, discount_percent):
    return price * (1 - discount_percent / 100)
```

### ✅ خوب:
```python
def calculate_discount(price: float, discount_percent: float) -> float:
    """
    محاسبه قیمت با تخفیف
    
    Args:
        price: قیمت اصلی
        discount_percent: درصد تخفیف
        
    Returns:
        قیمت نهایی با احتساب تخفیف
    """
    return price * (1 - discount_percent / 100)
```

## ۵. مدیریت خطا به صورت صریح

### ❌ بد:
```python
try:
    # کدهای زیادی که ممکن است خطا بدهند
    data = fetch_data()
    processed = process_data(data)
    saved = save_data(processed)
    return saved
except:
    return None
```

### ✅ خوب:
```python
def process_and_save_data():
    """پردازش و ذخیره داده با مدیریت خطای مناسب"""
    try:
        data = fetch_data()
    except ConnectionError as e:
        logger.error(f"خطا در دریافت داده: {e}")
        raise
    
    try:
        processed = process_data(data)
    except ValueError as e:
        logger.error(f"خطا در پردازش داده: {e}")
        raise
    
    try:
        return save_data(processed)
    except DatabaseError as e:
        logger.error(f"خطا در ذخیره داده: {e}")
        raise
```

## ۶. از Context Managers استفاده کنید

### ❌ بد:
```python
file = open('data.txt', 'r')
data = file.read()
file.close()

# اگر خطا رخ دهد، فایل بسته نمی‌شود!
```

### ✅ خوب:
```python
# فایل به طور خودکار بسته می‌شود
with open('data.txt', 'r') as file:
    data = file.read()

# برای چند منبع
with open('input.txt', 'r') as infile, \
     open('output.txt', 'w') as outfile:
    data = infile.read()
    outfile.write(process(data))
```

## ۷. از Magic Numbers اجتناب کنید

### ❌ بد:
```python
def calculate_salary(hours):
    if hours > 160:
        return hours * 50000 + (hours - 160) * 75000
    return hours * 50000
```

### ✅ خوب:
```python
# تعریف ثابت‌ها
HOURLY_RATE = 50_000  # تومان
OVERTIME_RATE = 75_000  # تومان
REGULAR_HOURS = 160

def calculate_salary(hours_worked: int) -> int:
    """محاسبه حقوق بر اساس ساعات کاری"""
    if hours_worked > REGULAR_HOURS:
        regular_pay = REGULAR_HOURS * HOURLY_RATE
        overtime_hours = hours_worked - REGULAR_HOURS
        overtime_pay = overtime_hours * OVERTIME_RATE
        return regular_pay + overtime_pay
    
    return hours_worked * HOURLY_RATE
```

## ۸. استفاده از f-strings برای فرمت رشته (Python 3.6+)

### ❌ بد:
```python
# روش قدیمی و کمتر خوانا
message = "کاربر %s با ایمیل %s ثبت شد" % (name, email)
message = "کاربر {} با ایمیل {} ثبت شد".format(name, email)
```

### ✅ خوب:
```python
# خوانا و مدرن
message = f"کاربر {name} با ایمیل {email} ثبت شد"

# با فرمت‌بندی
price = 1234567.89
print(f"قیمت: {price:,.2f} تومان")  # قیمت: 1,234,567.89 تومان
```

## ۹. از Dataclasses برای Data Models استفاده کنید (Python 3.7+)

### ❌ بد:
```python
class User:
    def __init__(self, name, email, age):
        self.name = name
        self.email = email
        self.age = age
    
    def __repr__(self):
        return f"User(name={self.name}, email={self.email}, age={self.age})"
    
    def __eq__(self, other):
        return (self.name == other.name and 
                self.email == other.email and 
                self.age == other.age)
```

### ✅ خوب:
```python
from dataclasses import dataclass

@dataclass
class User:
    """مدل داده کاربر"""
    name: str
    email: str
    age: int
    
    def is_adult(self) -> bool:
        """بررسی بزرگسال بودن"""
        return self.age >= 18
```

## ۱۰. استفاده از Enum برای مقادیر ثابت

### ❌ بد:
```python
# استفاده از string های مستقیم
def process_order(status):
    if status == "pending":
        # ...
    elif status == "approved":
        # ...
    elif status == "rejected":
        # ...
    # احتمال تایپ غلط زیاد است!
```

### ✅ خوب:
```python
from enum import Enum

class OrderStatus(Enum):
    """وضعیت سفارش"""
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    SHIPPED = "shipped"
    DELIVERED = "delivered"

def process_order(status: OrderStatus):
    """پردازش سفارش بر اساس وضعیت"""
    if status == OrderStatus.PENDING:
        # ...
    elif status == OrderStatus.APPROVED:
        # ...
    elif status == OrderStatus.REJECTED:
        # ...

# استفاده
process_order(OrderStatus.PENDING)  # Type-safe و IDE friendly!
```

## نکات اضافی

### استفاده از pathlib بجای os.path

```python
# ❌ قدیمی
import os
file_path = os.path.join("data", "files", "input.txt")

# ✅ مدرن
from pathlib import Path
file_path = Path("data") / "files" / "input.txt"
```

### استفاده از enumerate

```python
# ❌ بد
for i in range(len(items)):
    print(i, items[i])

# ✅ خوب
for index, item in enumerate(items):
    print(index, item)
```

### استفاده از dict.get()

```python
# ❌ پرحجم
if "key" in my_dict:
    value = my_dict["key"]
else:
    value = "default"

# ✅ خلاصه
value = my_dict.get("key", "default")
```

## ابزارها برای حفظ کیفیت کد

### 1. Black (Code Formatter)
```bash
pip install black
black your_code.py
```

### 2. Pylint (Linter)
```bash
pip install pylint
pylint your_code.py
```

### 3. mypy (Type Checker)
```bash
pip install mypy
mypy your_code.py
```

### 4. isort (Import Sorter)
```bash
pip install isort
isort your_code.py
```

## نتیجه‌گیری

کد تمیز یک هنر است که با تمرین بهتر می‌شود. این نکات را در پروژه‌های خود به کار ببرید و ببینید که چطور کد شما خواناتر، قابل نگهداری‌تر و حرفه‌ای‌تر می‌شود.

### منابع بیشتر

- [PEP 8 - Style Guide for Python Code](https://pep8.org/)
- [Clean Code in Python - کتاب](https://www.packtpub.com/product/clean-code-in-python/9781788835831)
- [دوره پایتون سبزیاد](/fa/courses/python/)

کد تمیز بنویسید، خوشحال باشید! ✨
