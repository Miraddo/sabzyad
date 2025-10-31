+++
title = "پروژه‌ی نهایی: ردیاب مخارج شخصی"
date = 2025-08-05
description = "پروژه‌ی کاربردی با فایل CSV/JSON، ماژول‌ها، آرگ‌پارس و گزارش‌گیری"
duration = "90 دقیقه"
difficulty = "متوسط"
lesson_number = 20
type = "lessons"
section = "بخش نهم: پروژه‌های نهایی"
+++

# پروژه‌ی نهایی: ردیاب مخارج

یک ابزار خط فرمان می‌سازیم که مخارج را ثبت، فهرست، فیلتر و جمع‌بندی کند.

## امکانات

- افزودن خرج: تاریخ، مبلغ، دسته، توضیح
- لیست و فیلتر بر اساس بازه‌ی تاریخ/دسته
- گزارش مجموع و میانگین

## ساختار فایل

```
expenses.csv  # header: date,amount,category,note
```

## کد نمونه‌ی شروع

```python
import csv
from datetime import datetime
from pathlib import Path

DB = Path("expenses.csv")

HEADERS = ["date", "amount", "category", "note"]

def ensure_db():
    if not DB.exists():
        with DB.open("w", newline="", encoding="utf-8") as f:
            csv.writer(f).writerow(HEADERS)

def add_expense(date, amount, category, note=""):
    with DB.open("a", newline="", encoding="utf-8") as f:
        csv.writer(f).writerow([date, amount, category, note])

def list_expenses():
    with DB.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))

if __name__ == "__main__":
    ensure_db()
    # TODO: argparse برای add/list/report
```

## ایده‌های توسعه

- خروجی JSON و نمودار ساده با `rich`
- تست‌های واحد برای منطق گزارش‌گیری
- خط فرمان کاربرپسند با زیرفرمان‌ها: `add`, `list`, `report`

