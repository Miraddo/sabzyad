````markdown
+++
title = "محیط‌های مجازی، مدیریت پکیج و ساخت پروژه"
date = 2025-08-05
description = "venv، pip، فایل requirements، ساختاردهی پوشه‌ها"
duration = "40 دقیقه"
difficulty = "مبتدی"
lesson_number = 13
type = "lessons"
resources = [
  { title = "venv", url = "https://docs.python.org/3/library/venv.html" },
  { title = "pip", url = "https://pip.pypa.io/en/stable/" }
]
+++

# محیط مجازی و مدیریت پکیج

## چرا venv؟

- جداسازی وابستگی‌های هر پروژه
- جلوگیری از تداخل نسخه‌ها

## ساخت و فعال‌سازی

```bash
python -m venv .venv
# macOS/Linux (bash/zsh)
source .venv/bin/activate
# Windows (PowerShell)
.venv\\Scripts\\Activate.ps1
```

## نصب و ثبت وابستگی‌ها

```bash
pip install requests rich
pip freeze > requirements.txt
```

## ساختار پوشه پیشنهادی

```
project/
  ├─ src/
  │   └─ app.py
  ├─ tests/
  ├─ README.md
  ├─ requirements.txt
  └─ .venv/
```

## اجرای اسکریپت از src

```bash
python -m src.app
```

## تمرین

- یک محیط مجازی بساز، دو کتابخانه نصب کن و از آن‌ها در یک اسکریپت استفاده کن.

````
