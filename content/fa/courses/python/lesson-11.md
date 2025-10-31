+++
title = "پروژه‌ی کوچک: دفترچه مخاطبین"
date = 2025-08-05
description = "ترکیب دانسته‌ها: ورودی، شرط‌ها، حلقه‌ها، فایل"
duration = "45 دقیقه"
difficulty = "مبتدی"
lesson_number = 11
type = "lessons"
section = "بخش پنجم: پروژه‌های عملی مبتدی"
+++

# پروژه‌ی کوچک: دفترچه مخاطبین (CLI)

در این پروژه یک برنامه خط فرمان می‌سازیم که بتواند مخاطبین را اضافه/لیست/جستجو/حذف کند و در فایل ذخیره شود.

## قالب داده

هر مخاطب را به شکل زیر ذخیره می‌کنیم:

```
name,phone,email
```

## کد پایه

```python
import csv
from pathlib import Path

DB = Path("contacts.csv")

def ensure_db():
    if not DB.exists():
        with DB.open("w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["name", "phone", "email"])  # header

def add_contact(name, phone, email):
    with DB.open("a", newline="", encoding="utf-8") as f:
        csv.writer(f).writerow([name, phone, email])

def list_contacts():
    with DB.open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            print(f"{row['name']:15} {row['phone']:12} {row['email']}")

def search_contacts(q):
    q = q.lower()
    with DB.open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if q in row['name'].lower() or q in row['phone'] or q in row['email'].lower():
                print(f"🔍 {row['name']} - {row['phone']} - {row['email']}")

if __name__ == "__main__":
    ensure_db()
    while True:
        print("\n[1] افزودن  [2] لیست  [3] جستجو  [0] خروج")
        cmd = input("> ")
        if cmd == "1":
            n = input("نام: ")
            p = input("تلفن: ")
            e = input("ایمیل: ")
            add_contact(n, p, e)
        elif cmd == "2":
            list_contacts()
        elif cmd == "3":
            q = input("دنبال چی می‌گردی؟ ")
            search_contacts(q)
        elif cmd == "0":
            break
        else:
            print("دستور نامعتبر")
```

## ایده‌های توسعه

- جلوگیری از ثبت تلفن تکراری
- ویرایش مخاطب
- خروجی JSON

