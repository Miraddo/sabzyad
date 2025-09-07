+++
title = "ساختارهای شرطی"
date = 2025-08-05
description = "آموزش if, elif, else و منطق شرطی در پایتون"
duration = "25 دقیقه"
difficulty = "مبتدی"
lesson_number = 3
type = "lessons"
resources = [
    { title = "Python Conditions", url = "https://docs.python.org/3/tutorial/controlflow.html" },
    { title = "Boolean Logic", url = "https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not" }
]
+++

# ساختارهای شرطی (if/elif/else)

در این درس یاد می‌گیری که چطور برنامه بر اساس شرایط تصمیم بگیرد.

## اهداف یادگیری

- نوشتن شرط‌های ساده و ترکیبی
- استفاده‌ی درست از تورفتگی (Indentation)
- ساخت برنامه‌های تعاملی با تصمیم‌گیری هوشمند

## مقدمه

ساختارهای شرطی به برنامه اجازه می‌دهند تا بر اساس شرایط مختلف، تصمیمات متفاوتی بگیرد.

## ساده‌ترین شرط: if

```python
age = 18

if age >= 18:
    print("شما بزرگسال هستید")
```

### نکته مهم: Indentation
در پایتون، بلوک کد با تورفتگی (indentation) مشخص می‌شود:

```python
if True:
    print("این خط در داخل if است")
    print("این خط هم در داخل if است")
print("این خط خارج از if است")
```

## if-else

```python
age = int(input("سن خود را وارد کنید: "))

if age >= 18:
    print("شما می‌توانید رای دهید")
else:
    print("شما هنوز نمی‌توانید رای دهید")
```

## if-elif-else

```python
score = int(input("نمره خود را وارد کنید: "))

if score >= 90:
    grade = "عالی"
elif score >= 80:
    grade = "خوب"
elif score >= 70:
    grade = "متوسط"
elif score >= 60:
    grade = "قابل قبول"
else:
    grade = "مردود"

print(f"نمره شما: {grade}")
```

## عمل‌گرهای مقایسه

```python
a = 10
b = 5

print(a == b)   # مساوی؟ False
print(a != b)   # نامساوی؟ True
print(a > b)    # بزرگتر؟ True
print(a < b)    # کوچکتر؟ False
print(a >= b)   # بزرگتر مساوی؟ True
print(a <= b)   # کوچکتر مساوی؟ False
```

## عمل‌گرهای منطقی

### and (و)
```python
age = 25
has_license = True

if age >= 18 and has_license:
    print("می‌توانید رانندگی کنید")
```

### or (یا)
```python
day = "شنبه"

if day == "جمعه" or day == "شنبه":
    print("امروز تعطیل است")
```

### not (نقیض)
```python
is_raining = False

if not is_raining:
    print("هوا بارانی نیست")
```

## ترکیب شرایط پیچیده

```python
age = 20
income = 50000
has_job = True

if (age >= 18 and income > 30000) or (age >= 21 and has_job):
    print("مشمول دریافت وام هستید")
else:
    print("شرایط وام را ندارید")
```

## شرط در یک خط (Ternary Operator)

```python
age = 17
status = "بزرگسال" if age >= 18 else "نابالغ"
print(status)
```

## کار با رشته‌ها در شرایط

```python
name = input("نام خود را وارد کنید: ")

if name:  # اگر رشته خالی نباشد
    print(f"سلام {name}")
else:
    print("نام وارد نشده")

# بررسی محتوای رشته
if "علی" in name:
    print("نام شما حاوی 'علی' است")
```

## مثال عملی: سیستم ورود

```python
print("=== سیستم ورود ===")

username = input("نام کاربری: ")
password = input("رمز عبور: ")

# اطلاعات صحیح (در برنامه واقعی از دیتابیس استفاده می‌شود)
correct_username = "admin"
correct_password = "123456"

if username == correct_username and password == correct_password:
    print("✅ ورود موفقیت‌آمیز!")
    print("خوش آمدید!")
elif username == correct_username:
    print("❌ رمز عبور اشتباه است")
else:
    print("❌ نام کاربری یافت نشد")
```

## مثال عملی: ماشین حساب پیشرفته

```python
print("=== ماشین حساب ===")
print("عملیات موجود: +، -، *، /")

num1 = float(input("عدد اول: "))
operator = input("عملیات (+، -، *، /): ")
num2 = float(input("عدد دوم: "))

if operator == "+":
    result = num1 + num2
    print(f"{num1} + {num2} = {result}")
elif operator == "-":
    result = num1 - num2
    print(f"{num1} - {num2} = {result}")
elif operator == "*":
    result = num1 * num2
    print(f"{num1} × {num2} = {result}")
elif operator == "/":
    if num2 != 0:
        result = num1 / num2
        print(f"{num1} ÷ {num2} = {result}")
    else:
        print("❌ خطا: تقسیم بر صفر امکان‌پذیر نیست")
else:
    print("❌ عملیات نامعتبر")
```

## nested if (شرط تو در تو)

```python
weather = input("هوا چطور است؟ (آفتابی/بارانی/برفی): ")

if weather == "آفتابی":
    temperature = int(input("دما چند درجه است؟ "))
    if temperature > 25:
        print("هوای عالی برای پیک‌نیک!")
    else:
        print("کمی سرد است، لباس گرم بپوشید")
elif weather == "بارانی":
    print("چتر را فراموش نکنید!")
elif weather == "برفی":
    print("مراقب سرما باشید!")
else:
    print("وضعیت هوا مشخص نیست")
```

## بررسی نوع داده

```python
value = input("یک مقدار وارد کنید: ")

if value.isdigit():
    print("این یک عدد است")
    number = int(value)
    if number % 2 == 0:
        print("عدد زوج است")
    else:
        print("عدد فرد است")
elif value.isalpha():
    print("این متن است")
else:
    print("ترکیبی از حروف و اعداد است")
```

## تمرین‌های عملی

### تمرین ۱: تشخیص سال کبیسه
```python
year = int(input("سال را وارد کنید: "))

if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print(f"{year} سال کبیسه است")
else:
    print(f"{year} سال کبیسه نیست")
```

### تمرین ۲: محاسبه قیمت بلیط
```python
age = int(input("سن شما: "))
is_student = input("آیا دانشجو هستید؟ (بله/خیر): ").lower() == "بله"

base_price = 50000

if age < 12:
    price = base_price * 0.5  # 50% تخفیف
    discount = "کودک"
elif age >= 65:
    price = base_price * 0.7  # 30% تخفیف
    discount = "سالمند"
elif is_student:
    price = base_price * 0.8  # 20% تخفیف
    discount = "دانشجو"
else:
    price = base_price
    discount = "بدون تخفیف"

print(f"قیمت بلیط: {price:,.0f} تومان ({discount})")
```

### تمرین ۳: نمره‌ی کلاسی با پیام شخصی
برنامه‌ای بنویس که نام دانش‌آموز و نمره‌اش را بگیرد و بر اساس بازه‌ی نمره پیام مناسب نشان دهد (عالی/خوب/قبول/نیاز به تلاش).

## خلاصه درس

در این درس یاد گرفتیم:
- ✅ استفاده از if, elif, else
- ✅ عمل‌گرهای مقایسه و منطقی
- ✅ ترکیب شرایط پیچیده
- ✅ شرط تو در تو (nested if)
- ✅ کار با انواع داده‌ها در شرایط
- ✅ ساخت برنامه‌های تعاملی

در درس بعدی با حلقه‌ها آشنا خواهیم شد.
