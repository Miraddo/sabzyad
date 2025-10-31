+++
title = "لیست‌ها، تاپل‌ها و دیکشنری‌ها"
date = 2025-10-31
description = "ساختارهای داده‌ی پرکاربرد در پایتون: list, tuple, dict, set"
duration = "40 دقیقه"
difficulty = "مبتدی"
lesson_number = 7
type = "lessons"
section = "بخش سوم: ساختارهای داده و توابع"
resources = [
  { title = "Data Structures", url = "https://docs.python.org/3/tutorial/datastructures.html" }
]
+++

# ساختارهای داده در پایتون

در این درس با مهم‌ترین ظرف‌های نگهداری داده آشنا می‌شویم.

## لیست (list)

- قابل تغییر (mutable)
- ترتیب‌دار

```python
nums = [10, 20, 30]
nums.append(40)
nums[1] = 25
print(nums)  # [10, 25, 30, 40]

# برش (Slicing)
print(nums[1:3])  # [25, 30]
```

### توابع و متدهای مهم

```python
letters = ["a", "b", "c"]
letters.insert(1, "x")
letters.remove("b")
letters.extend(["d", "e"])  
print(len(letters), letters)
```

## تاپل (tuple)

- غیرقابل تغییر (immutable)
- سریع‌تر و امن‌تر برای داده‌های ثابت

```python
point = (10, 20)
# point[0] = 5  # خطا
```

## دیکشنری (dict)

- نگاشت کلید → مقدار

```python
user = {"name": "Sara", "age": 23}
user["city"] = "Tehran"
print(user.get("email", "-"))  # مقدار پیش‌فرض

for key, value in user.items():
    print(key, value)
```

## مجموعه (set)

- بدون ترتیب و بدون عضو تکراری

```python
s = {1, 2, 2, 3}
print(s)  # {1, 2, 3}

s.add(4)
s.discard(2)
print(3 in s)  # True
```

## فهرست‌های درکی (List Comprehension)

```python
squares = [x*x for x in range(6)]
print(squares)  # [0, 1, 4, 9, 16, 25]

# با شرط
evens = [x for x in range(10) if x % 2 == 0]
```

## تمرین‌ها

1) لیست نمرات را بگیر، میانگین و بیشینه را محاسبه کن.
2) شمارش تکرار کلمات در یک متن (خروجی: dict).
3) با استفاده از set، لیست ایمیل‌ها را یکتا کن.

