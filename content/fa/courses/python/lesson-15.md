+++
title = "کار با API های وب"
date = 2025-10-31
description = "GET/POST با requests، هدرها، پارامترها و خطاها"
duration = "40 دقیقه"
difficulty = "مبتدی تا متوسط"
lesson_number = 15
type = "lessons"
section = "بخش هفتم: ابزارها و کتابخانه‌ها"
resources = [
  { title = "requests", url = "https://requests.readthedocs.io/en/latest/" }
]
+++

# کار با API

```python
import requests

url = "https://jsonplaceholder.typicode.com/posts"

# GET
r = requests.get(url, params={"userId": 1}, timeout=10)
r.raise_for_status()
print(r.json()[:2])

# POST
payload = {"title": "hello", "body": "world", "userId": 1}
r2 = requests.post(url, json=payload, timeout=10)
print(r2.status_code, r2.json())
```

## نکات

- همیشه timeout بگذار.
- خطاها را با `raise_for_status()` مدیریت کن.
- نرخ محدودیت‌ها (rate limit) را رعایت کن.

