+++
title = "وب‌اسکرپینگ مقدماتی"
date = 2025-08-05
description = "requests + BeautifulSoup: استخراج داده از صفحات HTML"
duration = "45 دقیقه"
difficulty = "متوسط"
lesson_number = 16
type = "lessons"
section = "بخش هفتم: ابزارها و کتابخانه‌ها"
resources = [
  { title = "BeautifulSoup", url = "https://www.crummy.com/software/BeautifulSoup/bs4/doc/" }
]
+++

# وب‌اسکرپینگ مقدماتی

> توجه: شرایط استفاده و robots.txt هر سایت را رعایت کنید.

```python
import requests
from bs4 import BeautifulSoup

resp = requests.get("https://example.com", timeout=10)
soup = BeautifulSoup(resp.text, "html.parser")

titles = [h.text.strip() for h in soup.select("h1, h2")]
print(titles)
```

## تمرین

- عنوان‌ها و لینک‌های صفحه‌ای دلخواه را استخراج کن و در CSV ذخیره کن.

