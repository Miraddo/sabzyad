+++
title = "حلقه‌ها (Loops)"
date = 2025-10-31
description = "یادگیری حلقه‌های for و while، break و continue"
duration = "30 دقیقه"
difficulty = "مبتدی"
lesson_number = 5
type = "lessons"
section = "بخش دوم: مبانی زبان پایتون"
resources = [
    { title = "مستندات کنترل جریان", url = "https://docs.python.org/3/tutorial/controlflow.html" },
    { title = "تمرین‌های عملی", url = "https://repl.it/languages/python3" }
]
+++

# حلقه‌ها در پایتون

در این درس با حلقه‌های for و while کار می‌کنیم تا برنامه‌هایمان بتوانند کارها را تکرار کنند و الگوریتم‌های پیچیده‌تری بسازیم.

## اهداف یادگیری

- نوشتن حلقه‌های for و while و کنترل آن‌ها با break/continue
- کار با range و enumerate
- طراحی الگوریتم‌های کوچک مثل بازی، جدول ضرب و بررسی عدد اول

## حلقه for

### حلقه بر روی اعداد

```python
# شمارش از 0 تا 4
for i in range(5):
    print(f"عدد: {i}")

# شمارش از 1 تا 10
for i in range(1, 11):
    print(f"عدد: {i}")

# شمارش با گام 2
for i in range(0, 10, 2):
    print(f"عدد زوج: {i}")
```

### حلقه بر روی رشته

```python
name = "پایتون"

for letter in name:
    print(f"حرف: {letter}")
```

### حلقه بر روی لیست

```python
fruits = ["سیب", "موز", "پرتقال", "انگور"]

for fruit in fruits:
    print(f"میوه: {fruit}")

# حلقه با index
for i, fruit in enumerate(fruits):
    print(f"{i + 1}. {fruit}")
```

## حلقه while

```python
# شمارش معکوس
count = 5

while count > 0:
    print(f"باقی‌مانده: {count}")
    count -= 1

print("تمام!")
```

### حلقه while با شرط

```python
password = ""

while password != "123456":
    password = input("رمز عبور را وارد کنید: ")
    if password != "123456":
        print("رمز عبور اشتباه است!")

print("ورود موفق!")
```

## کنترل حلقه‌ها

### دستور break

```python
# خروج از حلقه
for i in range(10):
    if i == 5:
        break
    print(i)
# خروجی: 0, 1, 2, 3, 4
```

### دستور continue

```python
# رد کردن تکرار فعلی
for i in range(10):
    if i % 2 == 0:  # اعداد زوج را رد کن
        continue
    print(i)
# خروجی: 1, 3, 5, 7, 9
```

### دستور else در حلقه‌ها

```python
# اجرا می‌شود اگر حلقه طبیعی تمام شود
for i in range(5):
    print(i)
else:
    print("حلقه تمام شد")

# اجرا نمی‌شود اگر با break خارج شویم
for i in range(5):
    if i == 3:
        break
    print(i)
else:
    print("این پیام نمایش داده نمی‌شود")
```

## حلقه‌های تودرتو

```python
# جدول ضرب
for i in range(1, 4):
    for j in range(1, 4):
        result = i * j
        print(f"{i} × {j} = {result}")
    print("---")
```

## مثال عملی: بازی حدس عدد

```python
import random

# عدد تصادفی بین 1 تا 100
secret_number = random.randint(1, 100)
attempts = 0
max_attempts = 7

print("به بازی حدس عدد خوش آمدید!")
print(f"عددی بین 1 تا 100 در نظر گرفته‌ام. {max_attempts} فرصت دارید.")

while attempts < max_attempts:
    try:
        guess = int(input("حدس خود را وارد کنید: "))
        attempts += 1
        
        if guess == secret_number:
            print(f"تبریک! عدد {secret_number} را در {attempts} مرحله حدس زدید.")
            break
        elif guess < secret_number:
            print("عدد بزرگتری امتحان کنید.")
        else:
            print("عدد کوچکتری امتحان کنید.")
        
        remaining = max_attempts - attempts
        if remaining > 0:
            print(f"{remaining} فرصت باقی مانده")
            
    except ValueError:
        print("لطفاً یک عدد معتبر وارد کنید.")
        attempts -= 1  # این تلاش حساب نمی‌شود
else:
    print(f"متأسفانه باختید! عدد مورد نظر {secret_number} بود.")
```

## تمرین‌های عملی

### تمرین 1: محاسبه فاکتوریل

```python
number = 5
factorial = 1

for i in range(1, number + 1):
    factorial *= i

print(f"{number}! = {factorial}")
```

### تمرین 2: بررسی عدد اول

```python
def is_prime(n):
    if n < 2:
        return False
    
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    
    return True

# تست
test_numbers = [2, 3, 4, 5, 17, 25, 29]
for num in test_numbers:
    if is_prime(num):
        print(f"{num} عدد اول است")
    else:
        print(f"{num} عدد اول نیست")
```

### تمرین 3: چاپ الگو

```python
# چاپ مثلث ستاره
rows = 5

for i in range(1, rows + 1):
    spaces = " " * (rows - i)
    stars = "*" * (2 * i - 1)
    print(spaces + stars)
```

## خلاصه

در این درس یاد گرفتیم:
- ✅ حلقه for و کاربردهای آن
- ✅ حلقه while و کنترل آن
- ✅ دستورات break و continue
- ✅ کار با range و enumerate
- ✅ حلقه‌های تودرتو
- ✅ مثال‌های عملی و کاربردی

در درس بعدی با توابع و نحوه تعریف و استفاده از آن‌ها آشنا خواهیم شد.
