+++
title = "کار با فایل‌ها"
date = 2025-10-31
description = "خواندن/نوشتن فایل‌های متنی و CSV، مدیریت خطاها"
duration = "35 دقیقه"
difficulty = "مبتدی"
lesson_number = 8
type = "lessons"
section = "بخش چهارم: کار با فایل‌ها و ماژول‌ها"
resources = [
  { title = "Reading and Writing Files", url = "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files" }
]
+++

# کار با فایل‌ها

## خواندن و نوشتن فایل متنی

```python
# نوشتن
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("سلام\n")
    f.write("این یک فایل متنی است\n")

# خواندن
with open("notes.txt", "r", encoding="utf-8") as f:
    content = f.read()
print(content)
```

## خواندن خط‌به‌خط

```python
with open("large.txt", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
```

## CSV ساده

```python
import csv

rows = [
    ["name", "age"],
    ["Ali", 28],
    ["Sara", 25],
]

with open("people.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(rows)

with open("people.csv", newline="", encoding="utf-8") as f:
    for row in csv.reader(f):
        print(row)
```

## مدیریت خطاها هنگام کار با فایل

```python
try:
    with open("not-exist.txt") as f:
        print(f.read())
except FileNotFoundError:
    print("فایل پیدا نشد")
```

## تمرین

- فایل لاگ بساز که هر بار اجرای برنامه، تاریخ/ساعت را به انتهای فایل اضافه کند.
- یک CSV از لیست محصولات (نام، قیمت، موجودی) بساز و میانگین قیمت را حساب کن.
