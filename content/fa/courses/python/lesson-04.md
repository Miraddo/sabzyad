++++++
title = "ساختارهای شرطی"title = "ساختارهای شرطی"
date = 2025-08-05date = 2025-08-05
description = "آموزش if, elif, else و منطق شرطی در پایتون"description = "آموزش if, elif, else و منطق شرطی در پایتون"
duration = "30 دقیقه"duration = "30 دقیقه"
difficulty = "مبتدی"difficulty = "مبتدی"
lesson_number = 4lesson_number = 4
type = "lessons"type = "lessons"
section = "بخش دوم: مبانی زبان پایتون"section = "بخش دوم: مبانی زبان پایتون"
resources = [resources = [
    { title = "Python Conditions", url = "https://docs.python.org/3/tutorial/controlflow.html" },    { title = "Python Conditions", url = "https://docs.python.org/3/tutorial/controlflow.html" },
    { title = "Boolean Logic", url = "https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not" }    { title = "Boolean Logic", url = "https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not" }
]]
++++++



# ساختارهای شرطی (if/elif/else)# متغیرها و انواع داده در پایتون



در این درس یاد می‌گیری که چطور برنامه بر اساس شرایط تصمیم بگیرد.در این درس با مفهوم متغیر، انواع داده و تبدیل نوع آشنا می‌شویم؛ همان آجرهای اولیه برای ساخت هر برنامه.



## اهداف یادگیری## اهداف یادگیری



- نوشتن شرط‌های ساده و ترکیبی- تعریف و استفاده از متغیرها

- استفاده‌ی درست از تورفتگی (Indentation)- شناخت انواع داده‌ی پایه (int, float, str, bool, complex)

- ساخت برنامه‌های تعاملی با تصمیم‌گیری هوشمند- انجام عملیات مهم روی اعداد و رشته‌ها

- تبدیل نوع و تشخیص نوع متغیرها

## مقدمه

## تعریف متغیر

ساختارهای شرطی به برنامه اجازه می‌دهند تا بر اساس شرایط مختلف، تصمیمات متفاوتی بگیرد.

متغیر در پایتون به سادگی تعریف می‌شود:

## ساده‌ترین شرط: if

```python

```pythonname = "علی"

age = 18age = 25

height = 175.5

if age >= 18:is_student = True

    print("شما بزرگسال هستید")```

```

## انواع داده‌ها

### نکته مهم: Indentation

در پایتون، بلوک کد با تورفتگی (indentation) مشخص می‌شود:### انواع عددی

- **int**: اعداد صحیح

```python- **float**: اعداد اعشاری

if True:- **complex**: اعداد مختلط

    print("این خط در داخل if است")

    print("این خط هم در داخل if است")```python

print("این خط خارج از if است")# اعداد صحیح

```x = 10

y = -5

## if-else

# اعداد اعشاری

```pythonpi = 3.14159

age = int(input("سن خود را وارد کنید: "))temperature = -2.5



if age >= 18:# اعداد مختلط

    print("شما می‌توانید رای دهید")z = 3 + 4j

else:```

    print("شما هنوز نمی‌توانید رای دهید")

```### رشته‌ها (String)



## if-elif-else```python

first_name = "احمد"

```pythonlast_name = 'محمدی'

score = int(input("نمره خود را وارد کنید: "))full_name = first_name + " " + last_name



if score >= 90:# رشته چند خطی

    grade = "عالی"message = """این یک رشته

elif score >= 80:چند خطی است که

    grade = "خوب"در پایتون معتبر است"""

elif score >= 70:```

    grade = "متوسط"

elif score >= 60:### نوع بولین (Boolean)

    grade = "قابل قبول"

else:```python

    grade = "مردود"is_valid = True

is_complete = False

print(f"نمره شما: {grade}")

```# مقایسه‌ها

x = 10

## عمل‌گرهای مقایسهy = 5

result = x > y  # True

```python```

a = 10

b = 5## عملیات بر روی متغیرها



print(a == b)   # مساوی؟ False### عملیات ریاضی

print(a != b)   # نامساوی؟ True

print(a > b)    # بزرگتر؟ True```python

print(a < b)    # کوچکتر؟ Falsea = 10

print(a >= b)   # بزرگتر مساوی؟ Trueb = 3

print(a <= b)   # کوچکتر مساوی؟ False

```# جمع

sum_result = a + b  # 13

## عمل‌گرهای منطقی

# تفریق  

### and (و)diff = a - b  # 7

```python

age = 25# ضرب

has_license = Trueproduct = a * b  # 30



if age >= 18 and has_license:# تقسیم

    print("می‌توانید رانندگی کنید")division = a / b  # 3.333...

```

# تقسیم صحیح

### or (یا)floor_div = a // b  # 3

```python

day = "شنبه"# باقیمانده

remainder = a % b  # 1

if day == "جمعه" or day == "شنبه":

    print("امروز تعطیل است")# توان

```power = a ** b  # 1000

```

### not (نقیض)

```python### عملیات بر روی رشته‌ها

is_raining = False

```python

if not is_raining:greeting = "سلام"

    print("هوا بارانی نیست")name = "دنیا"

```

# ترکیب رشته‌ها

## ترکیب شرایط پیچیدهmessage = greeting + " " + name + "!"



```python# تکرار رشته

age = 20repeated = "پایتون " * 3  # "پایتون پایتون پایتون "

income = 50000

has_job = True# طول رشته

length = len(message)

if (age >= 18 and income > 30000) or (age >= 21 and has_job):

    print("مشمول دریافت وام هستید")# تبدیل به حروف بزرگ

else:upper_case = message.upper()

    print("شرایط وام را ندارید")

```# تبدیل به حروف کوچک

lower_case = message.lower()

## شرط در یک خط (Ternary Operator)```



```python## تبدیل نوع داده

age = 17

status = "بزرگسال" if age >= 18 else "نابالغ"```python

print(status)# تبدیل به عدد صحیح

```num_str = "123"

num_int = int(num_str)

## کار با رشته‌ها در شرایط

# تبدیل به عدد اعشاری

```pythonfloat_num = float("3.14")

name = input("نام خود را وارد کنید: ")

# تبدیل به رشته

if name:  # اگر رشته خالی نباشدstr_num = str(456)

    print(f"سلام {name}")

else:# تبدیل به بولین

    print("نام وارد نشده")bool_val = bool(1)  # True

bool_val2 = bool(0)  # False

# بررسی محتوای رشته```

if "علی" in name:

    print("نام شما حاوی 'علی' است")## تشخیص نوع متغیر

```

```python

## مثال عملی: سیستم ورودx = 42

print(type(x))  # <class 'int'>

```python

print("=== سیستم ورود ===")y = 3.14

print(type(y))  # <class 'float'>

username = input("نام کاربری: ")

password = input("رمز عبور: ")z = "سلام"

print(type(z))  # <class 'str'>

# اطلاعات صحیح (در برنامه واقعی از دیتابیس استفاده می‌شود)

correct_username = "admin"# بررسی نوع متغیر

correct_password = "123456"if isinstance(x, int):

    print("x یک عدد صحیح است")

if username == correct_username and password == correct_password:```

    print("✅ ورود موفقیت‌آمیز!")

    print("خوش آمدید!")## قوانین نام‌گذاری متغیر

elif username == correct_username:

    print("❌ رمز عبور اشتباه است")1. **شروع با حرف یا _**: نام متغیر باید با حرف یا underscore شروع شود

else:2. **بدون فاصله**: نمی‌توان از فاصله استفاده کرد

    print("❌ نام کاربری یافت نشد")3. **حساس به حروف**: `Name` و `name` متفاوت هستند

```4. **بدون کلمات رزرو**: نمی‌توان از کلمات رزرو Python استفاده کرد



## مثال عملی: ماشین حساب پیشرفته```python

# صحیح

```pythonuser_name = "احمد"

print("=== ماشین حساب ===")age2 = 25

print("عملیات موجود: +، -، *، /")_private_var = "خصوصی"



num1 = float(input("عدد اول: "))# غلط

operator = input("عملیات (+، -، *، /): ")# 2age = 25        # شروع با عدد

num2 = float(input("عدد دوم: "))# user-name = ""   # استفاده از خط تیره  

# class = ""       # کلمه رزرو

if operator == "+":```

    result = num1 + num2

    print(f"{num1} + {num2} = {result}")## تمرین عملی

elif operator == "-":

    result = num1 - num2حال نوبت شما است! کد زیر را امتحان کنید:

    print(f"{num1} - {num2} = {result}")

elif operator == "*":```python

    result = num1 * num2# تعریف متغیرها

    print(f"{num1} × {num2} = {result}")student_name = "مریم احمدی"

elif operator == "/":math_score = 18.5

    if num2 != 0:physics_score = 17

        result = num1 / num2chemistry_score = 19

        print(f"{num1} ÷ {num2} = {result}")

    else:# محاسبه میانگین

        print("❌ خطا: تقسیم بر صفر امکان‌پذیر نیست")total_score = math_score + physics_score + chemistry_score

else:average = total_score / 3

    print("❌ عملیات نامعتبر")

```# نمایش نتیجه

print(f"نام دانش‌آموز: {student_name}")

## nested if (شرط تو در تو)print(f"میانگین نمرات: {average:.2f}")



```python# بررسی قبولی

weather = input("هوا چطور است؟ (آفتابی/بارانی/برفی): ")is_passed = average >= 12

print(f"وضعیت: {'قبول' if is_passed else 'مردود'}")

if weather == "آفتابی":```

    temperature = int(input("دما چند درجه است؟ "))

    if temperature > 25:### تمرین تکمیلی

        print("هوای عالی برای پیک‌نیک!")

    else:یک برنامه بنویس که مبلغ خرید و درصد تخفیف را از کاربر بگیرد، قیمت نهایی را محاسبه کند و با جداکننده‌ی هزارگان نمایش دهد.

        print("کمی سرد است، لباس گرم بپوشید")

elif weather == "بارانی":راهنما: از `float`, محاسبه‌ی درصد و فرمت `{:,.0f}` استفاده کن.

    print("چتر را فراموش نکنید!")

elif weather == "برفی":## خلاصه

    print("مراقب سرما باشید!")

else:در این درس یاد گرفتیم:

    print("وضعیت هوا مشخص نیست")- ✅ تعریف متغیر در پایتون

```- ✅ انواع مختلف داده (int, float, str, bool)

- ✅ عملیات بر روی متغیرها

## بررسی نوع داده- ✅ تبدیل نوع داده

- ✅ قوانین نام‌گذاری متغیر

```python

value = input("یک مقدار وارد کنید: ")در درس بعدی با ساختارهای کنترل (شرطی و حلقه) آشنا خواهیم شد.


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

در درس بعدی با حلقه‌ها (for و while) آشنا خواهیم شد.
