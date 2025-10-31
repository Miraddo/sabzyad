+++
title = "ماژول‌ها و پکیج‌ها"
date = 2025-08-05
description = "ایمپورت، ساخت ماژول، نصب کتابخانه با pip"
duration = "30 دقیقه"
difficulty = "مبتدی"
lesson_number = 9
type = "lessons"
resources = [
  { title = "Modules", url = "https://docs.python.org/3/tutorial/modules.html" }
]
+++

# ماژول‌ها و پکیج‌ها

## استفاده از ماژول‌های استاندارد

```python
import math
print(math.sqrt(16))  # 4.0
```

## ساخت ماژول خودمان

ساخت فایل `utils.py`:

```python
# utils.py
def is_even(n):
    return n % 2 == 0
```

استفاده در فایل دیگر:

```python
from utils import is_even
print(is_even(10))  # True
```

## نصب کتابخانه با pip

```bash
python -m pip install requests
```

## نمونه: درخواست HTTP ساده

```python
import requests

resp = requests.get("https://api.github.com/repos/python/cpython")
print(resp.status_code)
print(resp.json()["name"])  # cpython
```

## تمرین

- یک ماژول بساز که توابع مربوط به تاریخ/زمان را ارائه کند (مثلاً تبدیل ثانیه به hh:mm:ss).
- یک کتابخانه نصب کن و در یک اسکریپت ساده استفاده کن.
