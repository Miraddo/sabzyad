````markdown
+++
title = "لاگ‌گیری و دیباگ"
date = 2025-08-05
description = "logging، سطح‌ها، فرمت‌ها، و استفاده از pdb برای اشکال‌زدایی"
duration = "35 دقیقه"
difficulty = "متوسط"
lesson_number = 17
type = "lessons"
resources = [
  { title = "logging", url = "https://docs.python.org/3/library/logging.html" }
]
+++

# لاگ‌گیری و دیباگ

## logging سریع

```python
import logging

logging.basicConfig(level=logging.INFO, format="%(levelname)s:%(name)s:%(message)s")
logger = logging.getLogger("app")

logger.debug("debug")
logger.info("start")
logger.warning("low disk")
logger.error("failed")
logger.critical("panic")
```

## pdb — توقف و بررسی

```python
import pdb

def add(a, b):
    pdb.set_trace()  # اجرای برنامه در این خط می‌ایستد
    return a + b

print(add(2, 3))
```

````
