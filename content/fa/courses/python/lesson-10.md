+++
title = "مدیریت خطا و استثناها"
date = 2025-08-05
description = "try/except/else/finally، ایجاد استثنای سفارشی"
duration = "35 دقیقه"
difficulty = "مبتدی"
lesson_number = 10
type = "lessons"
resources = [
  { title = "Errors and Exceptions", url = "https://docs.python.org/3/tutorial/errors.html" }
]
+++

# مدیریت خطا

## ساختار try/except

```python
try:
    x = int(input("یک عدد: "))
    print(10 / x)
except ValueError:
    print("ورودی باید عدد باشد")
except ZeroDivisionError:
    print("تقسیم بر صفر مجاز نیست")
```

## else و finally

```python
try:
    f = open("data.txt")
except FileNotFoundError:
    print("فایل نیست")
else:
    print("فایل باز شد")
    f.close()
finally:
    print("همیشه اجرا می‌شوم")
```

## استثنای سفارشی

```python
class InvalidAgeError(Exception):
    pass

age = -5
if age < 0:
    raise InvalidAgeError("سن نمی‌تواند منفی باشد")
```

## تمرین

- ورودی‌های کاربر را امن دریافت کن (تا وقتی معتبر نشد، دوباره بپرس).
- یک تابع بنویس که مسیر فایل را بگیرد و محتوا را بخواند—با مدیریت خطا.

