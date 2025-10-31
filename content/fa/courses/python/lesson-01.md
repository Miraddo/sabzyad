+++
title = "نصب پایتون"
date = 2025-08-05
description = "آموزش کامل نصب پایتون بر روی سیستم‌عامل‌های مختلف"
duration = "15 دقیقه"
difficulty = "مبتدی"
lesson_number = 1
type = "lessons"
section = "بخش اول: شروع سریع"
resources = [
    { title = "دانلود پایتون", url = "https://python.org/downloads" },
    { title = "مستندات رسمی", url = "https://docs.python.org" }
]
+++

# نصب پایتون

در این درس یاد می‌گیریم که چگونه پایتون را بر روی سیستم‌عامل‌های مختلف نصب کنیم.

## نصب بر روی ویندوز

### مرحله ۱: دانلود فایل نصب

1. به سایت رسمی پایتون بروید: [python.org](https://python.org)
2. روی دکمه "Download Python" کلیک کنید
3. آخرین نسخه پایتون را دانلود کنید

### مرحله ۲: اجرای فایل نصب

1. فایل دانلود شده را اجرا کنید
2. **مهم**: گزینه "Add Python to PATH" را حتماً فعال کنید
3. روی "Install Now" کلیک کنید

```cmd
# تست نصب در Command Prompt
python --version
```

## نصب بر روی macOS

### روش ۱: از طریق سایت رسمی

1. از [python.org](https://python.org) نسخه macOS را دانلود کنید
2. فایل `.pkg` را اجرا کرده و مراحل نصب را دنبال کنید

### روش ۲: استفاده از Homebrew

```bash
# نصب Homebrew (اگر نصب نیست)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# نصب پایتون
brew install python
```

## نصب بر روی لینوکس

### Ubuntu/Debian

```bash
# بروزرسانی بسته‌ها
sudo apt update

# نصب پایتون
sudo apt install python3 python3-pip

# تست نصب
python3 --version
```

### CentOS/RHEL/Fedora

```bash
# برای Fedora
sudo dnf install python3 python3-pip

# برای CentOS/RHEL
sudo yum install python3 python3-pip
```

## تست نصب

بعد از نصب، برای اطمینان از نصب صحیح:

```python
# اجرای پایتون در Terminal/Command Prompt
python --version
# یا
python3 --version

# ورود به محیط تعاملی پایتون
python
>>> print("سلام دنیا!")
سلام دنیا!
>>> exit()
```

## نصب محیط توسعه

### VS Code
1. [Visual Studio Code](https://code.visualstudio.com) را دانلود کنید
2. افزونه Python را نصب کنید

### PyCharm
1. [PyCharm](https://jetbrains.com/pycharm) را دانلود کنید
2. نسخه Community رایگان است

## مشکلات رایج و راه‌حل

### خطای "python is not recognized"
- در ویندوز، مطمئن شوید PATH تنظیم شده
- Command Prompt را restart کنید

### مشکل دسترسی در macOS
```bash
# تنظیم alias در bashrc یا zshrc
echo "alias python=python3" >> ~/.zshrc
source ~/.zshrc
```

## خلاصه

در این درس یاد گرفتیم:
- ✅ نحوه نصب پایتون در سیستم‌عامل‌های مختلف
- ✅ تست صحت نصب
- ✅ نصب محیط توسعه
- ✅ حل مشکلات رایج

در درس بعدی با اولین برنامه پایتون آشنا خواهیم شد.
