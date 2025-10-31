+++
title = "توابع (Functions)"
date = 2025-08-05
description = "تعریف، فراخوانی، پارامترها، مقدار بازگشتی و نکات مهم توابع"
duration = "35 دقیقه"
difficulty = "مبتدی"
lesson_number = 6
type = "lessons"
section = "بخش سوم: ساختارهای داده و توابع"
resources = [
  { title = "Docs: Defining Functions", url = "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" },
  { title = "PEP 8: Naming", url = "https://peps.python.org/pep-0008/#function-and-variable-names" }
]
+++

# توابع در پایتون

توابع مثل «قطعه‌های قابل‌استفاده‌مجدد» هستند. کدی که یک کار مشخص انجام می‌دهد، نام‌گذاری می‌شود و هر وقت لازم بود آن را صدا می‌زنیم.

## چرا تابع؟

- جلوگیری از تکرار کد (DRY)
- خوانایی و نگهداری بهتر
- تست و دیباگ آسان‌تر

## تعریف و فراخوانی

```python
# تعریف تابع
def greet(name):
    print(f"سلام {name}!")

# فراخوانی
greet("مریم")
```

## پارامترها و مقادیر بازگشتی

```python
def add(a, b):
    return a + b

result = add(3, 4)  # 7
```

- کلمه‌ی کلیدی `return` اجرای تابع را خاتمه می‌دهد و مقدار برمی‌گرداند.
- اگر `return` ننویسید، مقدار `None` برگردانده می‌شود.

## پارامتر پیش‌فرض و نامی

```python
def power(base, exp=2):
    return base ** exp

print(power(5))      # 25 (exp=2)
print(power(2, 3))   # 8
print(power(exp=4, base=3))  # 81
```

## تعداد نامعین پارامترها (*args, **kwargs)

```python
def concat(*parts, sep=" "):
    return sep.join(parts)

print(concat("سلام", "دنیا", sep=", "))  # سلام, دنیا

# kwargs
def configure(**options):
    if options.get("debug"):
        print("حالت دیباگ فعال است")
    print(options)

configure(debug=True, retries=3)
```

## دامنه‌ی متغیرها (Scope)

- متغیرهای داخل تابع «محلی» هستند.
- دسترسی به متغیر سراسری از داخل تابع فقط خواندنی است؛ برای تغییر باید `global` استفاده کنید (معمولاً توصیه نمی‌شود).

```python
x = 10  # سراسری

def show():
    x = 5   # محلی (روی x سراسری سایه می‌اندازد)
    print(x)

show()   # 5
print(x)  # 10
```

## توابع مستندسازی (Docstring)

```python
def factorial(n):
    """محاسبه فاکتوریل عدد n (n!)
    n باید عدد صحیح غیرمنفی باشد.
    """
    if n < 0:
        raise ValueError("n باید غیرمنفی باشد")
    result = 1
    for i in range(1, n+1):
        result *= i
    return result

print(factorial.__doc__)
```

## نکات مهم

- نام تابع باید معنادار و با حروف کوچک و آندرلاین باشد: `calculate_total`
- هر تابع بهتر است فقط یک کار انجام دهد.
- پارامترهای زیاد نشانه‌ی طراحی نامناسب است—ساده‌سازی کن.

## تمرین‌های عملی

1) تابعی بنویس که میانگین لیستی از اعداد را برگرداند. اگر لیست خالی بود، `None` بده.
2) تابعی بنویس که یک رمز عبور پیشنهادی بسازد (طول، اعداد، حروف کوچک/بزرگ، کاراکتر ویژه).
3) تابعی بنویس که بررسی کند رشته‌ی ورودی «پالین‌دروم» است یا نه (از دو سمت یکسان).

## چالش: ماشین‌حساب توابعی

چهار تابع `add`, `sub`, `mul`, `div` بنویس و برنامه‌ای که عملیات و دو عدد را از کاربر بگیرد و با مدیریت خطا نتیجه را چاپ کند.

