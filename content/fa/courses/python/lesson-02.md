+++
title = "اولین برنامه پایتون"
date = 2025-08-05
description = "نوشتن و اجرای اولین برنامه پایتون"
duration = "20 دقیقه"
difficulty = "مبتدی"
lesson_number = 2
type = "lessons"
resources = [
    { title = "Python Tutorial", url = "https://docs.python.org/3/tutorial/" },
    { title = "Online Python Runner", url = "https://repl.it/languages/python3" }
]
+++

# اولین برنامه پایتون

در این درس اولین برنامه خود را با پایتون می‌نویسیم!

## سلام دنیا!

سنت برنامه‌نویسی این است که اولین برنامه "سلام دنیا" باشد:

```python
print("سلام دنیا!")
```

### اجرای برنامه

#### روش ۱: محیط تعاملی

```bash
# ورود به محیط تعاملی
python

# نوشتن کد
>>> print("سلام دنیا!")
سلام دنیا!
```

#### روش ۲: فایل پایتون

1. فایل جدیدی به نام `hello.py` بسازید
2. کد زیر را در آن بنویسید:

```python
print("سلام دنیا!")
print("این اولین برنامه من است")
```

3. فایل را اجرا کنید:

```bash
python hello.py
```

## متغیرها

```python
# تعریف متغیر
name = "علی"
age = 25

# استفاده از متغیرها
print("نام من", name, "است")
print("سن من", age, "سال است")
```

## انواع داده‌ها

```python
# رشته (String)
message = "سلام"

# عدد صحیح (Integer)
number = 42

# عدد اعشاری (Float)
price = 19.99

# بولین (Boolean)
is_student = True

# نمایش نوع داده
print(type(message))  # <class 'str'>
print(type(number))   # <class 'int'>
```

## دریافت ورودی از کاربر

```python
# دریافت نام کاربر
name = input("نام خود را وارد کنید: ")
print("سلام", name)

# دریافت سن (تبدیل به عدد)
age = int(input("سن خود را وارد کنید: "))
print("شما", age, "سال دارید")
```

## محاسبات ساده

```python
# عمل‌گرهای ریاضی
a = 10
b = 3

print("جمع:", a + b)      # 13
print("تفریق:", a - b)    # 7
print("ضرب:", a * b)      # 30
print("تقسیم:", a / b)    # 3.33...
print("تقسیم صحیح:", a // b)  # 3
print("باقیمانده:", a % b)   # 1
print("توان:", a ** b)    # 1000
```

## برنامه کاربردی: ماشین حساب ساده

```python
print("=== ماشین حساب ساده ===")

# دریافت اعداد
num1 = float(input("عدد اول را وارد کنید: "))
num2 = float(input("عدد دوم را وارد کنید: "))

# محاسبات
addition = num1 + num2
subtraction = num1 - num2
multiplication = num1 * num2
division = num1 / num2 if num2 != 0 else "تعریف نشده"

# نمایش نتایج
print(f"\n{num1} + {num2} = {addition}")
print(f"{num1} - {num2} = {subtraction}")
print(f"{num1} × {num2} = {multiplication}")
print(f"{num1} ÷ {num2} = {division}")
```

## رشته‌ها (Strings)

```python
# تعریف رشته
greeting = "سلام"
name = "دنیا"

# اتصال رشته‌ها
message = greeting + " " + name + "!"
print(message)  # سلام دنیا!

# F-strings (روش مدرن)
age = 25
text = f"من {age} سال دارم"
print(text)

# متدهای رشته
sentence = "پایتون زبان عالی است"
print(sentence.upper())    # بزرگ کردن
print(sentence.lower())    # کوچک کردن
print(sentence.replace("عالی", "فوق‌العاده"))
```

## کامنت‌گذاری

```python
# این یک کامنت تک خطی است

"""
این یک کامنت 
چند خطی است
"""

print("سلام")  # کامنت در انتهای خط
```

## تمرین عملی

برنامه‌ای بنویسید که:
1. نام کاربر را بپرسد
2. سن او را بپرسد
3. محاسبه کند که چند سال دیگر 100 ساله می‌شود
4. پیام مناسب نمایش دهد

```python
# حل تمرین
name = input("نام شما: ")
age = int(input("سن شما: "))
years_to_100 = 100 - age

if years_to_100 > 0:
    print(f"سلام {name}! شما {years_to_100} سال دیگر 100 ساله می‌شوید.")
elif years_to_100 == 0:
    print(f"تبریک {name}! شما امسال 100 ساله می‌شوید!")
else:
    print(f"سلام {name}! شما از {abs(years_to_100)} سال پیش 100 ساله شده‌اید.")
```

## خلاصه درس

در این درس یاد گرفتیم:
- ✅ نوشتن اولین برنامه پایتون
- ✅ کار با متغیرها و انواع داده
- ✅ دریافت ورودی از کاربر
- ✅ انجام محاسبات ریاضی
- ✅ کار با رشته‌ها
- ✅ کامنت‌گذاری

در درس بعدی با ساختارهای شرطی آشنا خواهیم شد.
