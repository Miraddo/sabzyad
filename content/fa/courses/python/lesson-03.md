+++
title = "متغیرها و انواع داده"
date = 2025-10-31
description = "آشنایی با متغیرها و انواع مختلف داده در پایتون"
duration = "25 دقیقه"
difficulty = "مبتدی"
lesson_number = 3
type = "lessons"
section = "بخش دوم: مبانی زبان پایتون"
resources = [
    { title = "مستندات متغیرها", url = "https://docs.python.org/3/tutorial/introduction.html" }, 
    { title = "تمرین عملی", url = "https://repl.it/languages/python3" } 
]

+++



# متغیرها و انواع داده در پایتون# ساختارهای شرطی (if/elif/else)



در این درس با مفهوم متغیر، انواع داده و تبدیل نوع آشنا می‌شویم؛ همان آجرهای اولیه برای ساخت هر برنامه.در این درس یاد می‌گیری که چطور برنامه بر اساس شرایط تصمیم بگیرد.



## اهداف یادگیری## اهداف یادگیری



- تعریف و استفاده از متغیرها- نوشتن شرط‌های ساده و ترکیبی

- شناخت انواع داده‌ی پایه (int, float, str, bool, complex)- استفاده‌ی درست از تورفتگی (Indentation)

- انجام عملیات مهم روی اعداد و رشته‌ها- ساخت برنامه‌های تعاملی با تصمیم‌گیری هوشمند

- تبدیل نوع و تشخیص نوع متغیرها

## مقدمه

## تعریف متغیر

ساختارهای شرطی به برنامه اجازه می‌دهند تا بر اساس شرایط مختلف، تصمیمات متفاوتی بگیرد.

متغیر در پایتون به سادگی تعریف می‌شود:

## ساده‌ترین شرط: if

```python

name = "علی"```python

age = 25age = 18

height = 175.5

is_student = Trueif age >= 18:

```    print("شما بزرگسال هستید")

```

## انواع داده‌ها

### نکته مهم: Indentation

### انواع عددیدر پایتون، بلوک کد با تورفتگی (indentation) مشخص می‌شود:

- **int**: اعداد صحیح

- **float**: اعداد اعشاری```python

- **complex**: اعداد مختلطif True:

    print("این خط در داخل if است")

```python    print("این خط هم در داخل if است")

# اعداد صحیحprint("این خط خارج از if است")

x = 10```

y = -5

## if-else

# اعداد اعشاری

pi = 3.14159```python

temperature = -2.5age = int(input("سن خود را وارد کنید: "))



# اعداد مختلطif age >= 18:

z = 3 + 4j    print("شما می‌توانید رای دهید")

```else:

    print("شما هنوز نمی‌توانید رای دهید")

### رشته‌ها (String)```



```python## if-elif-else

first_name = "احمد"

last_name = 'محمدی'```python

full_name = first_name + " " + last_namescore = int(input("نمره خود را وارد کنید: "))



# رشته چند خطیif score >= 90:

message = """این یک رشته    grade = "عالی"

چند خطی است کهelif score >= 80:

در پایتون معتبر است"""    grade = "خوب"

```elif score >= 70:

    grade = "متوسط"

### نوع بولین (Boolean)elif score >= 60:

    grade = "قابل قبول"

```pythonelse:

is_valid = True    grade = "مردود"

is_complete = False

print(f"نمره شما: {grade}")

# مقایسه‌ها```

x = 10

y = 5## عمل‌گرهای مقایسه

result = x > y  # True

``````python

a = 10

## عملیات بر روی متغیرهاb = 5



### عملیات ریاضیprint(a == b)   # مساوی؟ False

print(a != b)   # نامساوی؟ True

```pythonprint(a > b)    # بزرگتر؟ True

a = 10print(a < b)    # کوچکتر؟ False

b = 3print(a >= b)   # بزرگتر مساوی؟ True

print(a <= b)   # کوچکتر مساوی؟ False

# جمع```

sum_result = a + b  # 13

## عمل‌گرهای منطقی

# تفریق  

diff = a - b  # 7### and (و)

```python

# ضربage = 25

product = a * b  # 30has_license = True



# تقسیمif age >= 18 and has_license:

division = a / b  # 3.333...    print("می‌توانید رانندگی کنید")

```

# تقسیم صحیح

floor_div = a // b  # 3### or (یا)

```python

# باقیماندهday = "شنبه"

remainder = a % b  # 1

if day == "جمعه" or day == "شنبه":

# توان    print("امروز تعطیل است")

power = a ** b  # 1000```

```

### not (نقیض)

### عملیات بر روی رشته‌ها```python

is_raining = False

```python

greeting = "سلام"if not is_raining:

name = "دنیا"    print("هوا بارانی نیست")

```

# ترکیب رشته‌ها

message = greeting + " " + name + "!"## ترکیب شرایط پیچیده



# تکرار رشته```python

repeated = "پایتون " * 3  # "پایتون پایتون پایتون "age = 20

income = 50000

# طول رشتهhas_job = True

length = len(message)

if (age >= 18 and income > 30000) or (age >= 21 and has_job):

# تبدیل به حروف بزرگ    print("مشمول دریافت وام هستید")

upper_case = message.upper()else:

    print("شرایط وام را ندارید")

# تبدیل به حروف کوچک```

lower_case = message.lower()

```## شرط در یک خط (Ternary Operator)



## تبدیل نوع داده```python

age = 17

```pythonstatus = "بزرگسال" if age >= 18 else "نابالغ"

# تبدیل به عدد صحیحprint(status)

num_str = "123"```

num_int = int(num_str)

## کار با رشته‌ها در شرایط

# تبدیل به عدد اعشاری

float_num = float("3.14")```python

name = input("نام خود را وارد کنید: ")

# تبدیل به رشته

str_num = str(456)if name:  # اگر رشته خالی نباشد

    print(f"سلام {name}")

# تبدیل به بولینelse:

bool_val = bool(1)  # True    print("نام وارد نشده")

bool_val2 = bool(0)  # False

```# بررسی محتوای رشته

if "علی" in name:

## تشخیص نوع متغیر    print("نام شما حاوی 'علی' است")

```

```python

x = 42## مثال عملی: سیستم ورود

print(type(x))  # <class 'int'>

```python

y = 3.14print("=== سیستم ورود ===")

print(type(y))  # <class 'float'>

username = input("نام کاربری: ")

z = "سلام"password = input("رمز عبور: ")

print(type(z))  # <class 'str'>

# اطلاعات صحیح (در برنامه واقعی از دیتابیس استفاده می‌شود)

# بررسی نوع متغیرcorrect_username = "admin"

if isinstance(x, int):correct_password = "123456"

    print("x یک عدد صحیح است")

```if username == correct_username and password == correct_password:

    print("✅ ورود موفقیت‌آمیز!")

## قوانین نام‌گذاری متغیر    print("خوش آمدید!")

elif username == correct_username:

1. **شروع با حرف یا _**: نام متغیر باید با حرف یا underscore شروع شود    print("❌ رمز عبور اشتباه است")

2. **بدون فاصله**: نمی‌توان از فاصله استفاده کردelse:

3. **حساس به حروف**: `Name` و `name` متفاوت هستند    print("❌ نام کاربری یافت نشد")

4. **بدون کلمات رزرو**: نمی‌توان از کلمات رزرو Python استفاده کرد```



```python## مثال عملی: ماشین حساب پیشرفته

# صحیح

user_name = "احمد"```python

age2 = 25print("=== ماشین حساب ===")

_private_var = "خصوصی"print("عملیات موجود: +، -، *، /")



# غلطnum1 = float(input("عدد اول: "))

# 2age = 25        # شروع با عددoperator = input("عملیات (+، -، *، /): ")

# user-name = ""   # استفاده از خط تیره  num2 = float(input("عدد دوم: "))

# class = ""       # کلمه رزرو

```if operator == "+":

    result = num1 + num2

## تمرین عملی    print(f"{num1} + {num2} = {result}")

elif operator == "-":

حال نوبت شما است! کد زیر را امتحان کنید:    result = num1 - num2

    print(f"{num1} - {num2} = {result}")

```pythonelif operator == "*":

# تعریف متغیرها    result = num1 * num2

student_name = "مریم احمدی"    print(f"{num1} × {num2} = {result}")

math_score = 18.5elif operator == "/":

physics_score = 17    if num2 != 0:

chemistry_score = 19        result = num1 / num2

        print(f"{num1} ÷ {num2} = {result}")

# محاسبه میانگین    else:

total_score = math_score + physics_score + chemistry_score        print("❌ خطا: تقسیم بر صفر امکان‌پذیر نیست")

average = total_score / 3else:

    print("❌ عملیات نامعتبر")

# نمایش نتیجه```

print(f"نام دانش‌آموز: {student_name}")

print(f"میانگین نمرات: {average:.2f}")## nested if (شرط تو در تو)



# بررسی قبولی```python

is_passed = average >= 12weather = input("هوا چطور است؟ (آفتابی/بارانی/برفی): ")

print(f"وضعیت: {'قبول' if is_passed else 'مردود'}")

```if weather == "آفتابی":

    temperature = int(input("دما چند درجه است؟ "))

### تمرین تکمیلی    if temperature > 25:

        print("هوای عالی برای پیک‌نیک!")

یک برنامه بنویس که مبلغ خرید و درصد تخفیف را از کاربر بگیرد، قیمت نهایی را محاسبه کند و با جداکننده‌ی هزارگان نمایش دهد.    else:

        print("کمی سرد است، لباس گرم بپوشید")

راهنما: از `float`, محاسبه‌ی درصد و فرمت `{:,.0f}` استفاده کن.elif weather == "بارانی":

    print("چتر را فراموش نکنید!")

## خلاصهelif weather == "برفی":

    print("مراقب سرما باشید!")

در این درس یاد گرفتیم:else:

- ✅ تعریف متغیر در پایتون    print("وضعیت هوا مشخص نیست")

- ✅ انواع مختلف داده (int, float, str, bool)```

- ✅ عملیات بر روی متغیرها

- ✅ تبدیل نوع داده## بررسی نوع داده

- ✅ قوانین نام‌گذاری متغیر

```python

در درس بعدی با ساختارهای شرطی (if/elif/else) آشنا خواهیم شد.value = input("یک مقدار وارد کنید: ")


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
