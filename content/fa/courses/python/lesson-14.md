+++
title = "تاریخ/زمان، عبارت‌های باقاعده و JSON"
date = 2025-10-31
description = "datetime، regex (re)، سریال‌سازی و پارس JSON"
duration = "45 دقیقه"
difficulty = "مبتدی تا متوسط"
lesson_number = 14
type = "lessons"
section = "بخش هفتم: ابزارها و کتابخانه‌ها"
resources = [
  { title = "datetime", url = "https://docs.python.org/3/library/datetime.html" },
  { title = "re", url = "https://docs.python.org/3/library/re.html" },
  { title = "json", url = "https://docs.python.org/3/library/json.html" }
]
+++

# تاریخ/زمان، Regex و JSON

## datetime خلاصه

```python
from datetime import datetime, timedelta

now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M"))
print((now + timedelta(days=7)).isoformat())
```

## regex: جستجو و اعتبارسنجی

```python
import re

email = "user@example.com"
pattern = r"^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$"
print(bool(re.match(pattern, email)))
```

## JSON: سریال‌سازی/پارس

```python
import json

user = {"name": "Ali", "age": 30}
text = json.dumps(user, ensure_ascii=False)
print(text)

data = json.loads(text)
print(data["name"])  # Ali
```

## تمرین‌ها

- تاریخ‌های لاگ را به قالب دلخواه تبدیل کن.
- ایمیل/شماره‌تلفن را با regex اعتبارسنجی کن.
- یک لیست از اشیاء پایتونی را به JSON ذخیره و دوباره بخوان.

