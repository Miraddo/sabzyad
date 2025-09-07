````markdown
+++
title = "برنامه‌نویسی شی‌ءگرا (OOP) — مبانی"
date = 2025-08-05
description = "کلاس، شیء، سازنده، متدها، ویژگی‌ها، کپسوله‌سازی و وراثت"
duration = "45 دقیقه"
difficulty = "مبتدی تا متوسط"
lesson_number = 12
type = "lessons"
resources = [
  { title = "Classes", url = "https://docs.python.org/3/tutorial/classes.html" },
  { title = "Dataclasses", url = "https://docs.python.org/3/library/dataclasses.html" }
]
+++

# شی‌ءگرایی در پایتون — قدم اول

شی‌ءگرایی روشی برای ساخت برنامه‌هایی است که از «اشیاء» تشکیل شده‌اند؛ هر شیء داده و رفتار خودش را دارد.

## تعریف کلاس و ساخت شیء

```python
class User:
    def __init__(self, name, email):  # سازنده
        self.name = name
        self.email = email

    def greet(self):                   # متد نمونه
        return f"سلام {self.name}!"

u = User("مریم", "m@example.com")
print(u.greet())
```

## ویژگی‌ها (Attributes) و متدهای کلاسی/ایستای

```python
class Math:
    PI = 3.14159            # ویژگی کلاسی

    @classmethod
    def circle_area(cls, r):
        return cls.PI * r * r

    @staticmethod
    def add(a, b):
        return a + b

print(Math.circle_area(3))
print(Math.add(2, 3))
```

## کپسوله‌سازی (Encapsulation)

در پایتون «خصوصی» واقعی نداریم، اما با یک قرارداد می‌گوییم خصوصی است:

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance   # خصوصی (قراردادی)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("مبلغ نامعتبر")
        self._balance += amount

    def get_balance(self):
        return self._balance
```

## property برای دسترسی کنترل‌شده

```python
class Product:
    def __init__(self, price):
        self._price = price

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("قیمت منفی مجاز نیست")
        self._price = value

p = Product(100)
p.price = 120
print(p.price)
```

## وراثت ساده

```python
class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

pets = [Dog(), Cat()]
for pet in pets:
    print(pet.speak())
```

## داده‌کلاس (dataclass)

برای مدل‌های داده‌ای سبک عالی است:

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

p = Point(3, 4)
print(p)         # Point(x=3, y=4)
print(p.x, p.y)
```

## تمرین‌ها

1) کلاس `Todo` با ویژگی‌های `title`, `done` بساز و متد `toggle` برای تغییر وضعیت.
2) کلاس `Rectangle` با `width`, `height` بساز و `area`, `perimeter` را محاسبه کن.
3) سلسله‌مراتبی از کلاس‌ها برای وسایل نقلیه طراحی کن (پایه: Vehicle، زیرکلاس‌ها: Car, Bike).

````
