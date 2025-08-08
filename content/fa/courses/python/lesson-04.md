+++
title = "متغیرها و انواع داده"
date = 2025-08-05
description = "آشنایی با متغیرها و انواع مختلف داده در پایتون"
duration = "25 دقیقه"
difficulty = "مبتدی"
lesson_number = 4
type = "lessons"
resources = [
    { title = "مستندات متغیرها", url = "https://docs.python.org/3/tutorial/introduction.html" },
    { title = "تمرین عملی", url = "https://repl.it/languages/python3" }
]
+++

# متغیرها و انواع داده در پایتون

در این درس با مفهوم متغیرها و انواع مختلف داده در پایتون آشنا می‌شویم.

## تعریف متغیر

متغیر در پایتون به سادگی تعریف می‌شود:

```python
name = "علی"
age = 25
height = 175.5
is_student = True
```

## انواع داده‌ها

### انواع عددی
- **int**: اعداد صحیح
- **float**: اعداد اعشاری
- **complex**: اعداد مختلط

```python
# اعداد صحیح
x = 10
y = -5

# اعداد اعشاری
pi = 3.14159
temperature = -2.5

# اعداد مختلط
z = 3 + 4j
```

### رشته‌ها (String)

```python
first_name = "احمد"
last_name = 'محمدی'
full_name = first_name + " " + last_name

# رشته چند خطی
message = """این یک رشته
چند خطی است که
در پایتون معتبر است"""
```

### نوع بولین (Boolean)

```python
is_valid = True
is_complete = False

# مقایسه‌ها
x = 10
y = 5
result = x > y  # True
```

## عملیات بر روی متغیرها

### عملیات ریاضی

```python
a = 10
b = 3

# جمع
sum_result = a + b  # 13

# تفریق  
diff = a - b  # 7

# ضرب
product = a * b  # 30

# تقسیم
division = a / b  # 3.333...

# تقسیم صحیح
floor_div = a // b  # 3

# باقیمانده
remainder = a % b  # 1

# توان
power = a ** b  # 1000
```

### عملیات بر روی رشته‌ها

```python
greeting = "سلام"
name = "دنیا"

# ترکیب رشته‌ها
message = greeting + " " + name + "!"

# تکرار رشته
repeated = "پایتون " * 3  # "پایتون پایتون پایتون "

# طول رشته
length = len(message)

# تبدیل به حروف بزرگ
upper_case = message.upper()

# تبدیل به حروف کوچک
lower_case = message.lower()
```

## تبدیل نوع داده

```python
# تبدیل به عدد صحیح
num_str = "123"
num_int = int(num_str)

# تبدیل به عدد اعشاری
float_num = float("3.14")

# تبدیل به رشته
str_num = str(456)

# تبدیل به بولین
bool_val = bool(1)  # True
bool_val2 = bool(0)  # False
```

## تشخیص نوع متغیر

```python
x = 42
print(type(x))  # <class 'int'>

y = 3.14
print(type(y))  # <class 'float'>

z = "سلام"
print(type(z))  # <class 'str'>

# بررسی نوع متغیر
if isinstance(x, int):
    print("x یک عدد صحیح است")
```

## قوانین نام‌گذاری متغیر

1. **شروع با حرف یا _**: نام متغیر باید با حرف یا underscore شروع شود
2. **بدون فاصله**: نمی‌توان از فاصله استفاده کرد
3. **حساس به حروف**: `Name` و `name` متفاوت هستند
4. **بدون کلمات رزرو**: نمی‌توان از کلمات رزرو Python استفاده کرد

```python
# صحیح
user_name = "احمد"
age2 = 25
_private_var = "خصوصی"

# غلط
# 2age = 25        # شروع با عدد
# user-name = ""   # استفاده از خط تیره  
# class = ""       # کلمه رزرو
```

## تمرین عملی

حال نوبت شما است! کد زیر را امتحان کنید:

```python
# تعریف متغیرها
student_name = "مریم احمدی"
math_score = 18.5
physics_score = 17
chemistry_score = 19

# محاسبه میانگین
total_score = math_score + physics_score + chemistry_score
average = total_score / 3

# نمایش نتیجه
print(f"نام دانش‌آموز: {student_name}")
print(f"میانگین نمرات: {average:.2f}")

# بررسی قبولی
is_passed = average >= 12
print(f"وضعیت: {'قبول' if is_passed else 'مردود'}")
```

## خلاصه

در این درس یاد گرفتیم:
- ✅ تعریف متغیر در پایتون
- ✅ انواع مختلف داده (int, float, str, bool)
- ✅ عملیات بر روی متغیرها
- ✅ تبدیل نوع داده
- ✅ قوانین نام‌گذاری متغیر

در درس بعدی با ساختارهای کنترل (شرطی و حلقه) آشنا خواهیم شد.
