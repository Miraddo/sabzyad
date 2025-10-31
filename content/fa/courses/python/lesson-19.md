+++
title = "اسکریپت‌های خط فرمان و بسته‌بندی"
date = 2025-08-05
description = "argparse، ساخت CLI، و ساخت پکیج ساده با pyproject.toml"
duration = "50 دقیقه"
difficulty = "متوسط"
lesson_number = 19
type = "lessons"
section = "بخش هشتم: تست و کیفیت کد"
resources = [
  { title = "argparse", url = "https://docs.python.org/3/library/argparse.html" },
  { title = "Packaging", url = "https://packaging.python.org/en/latest/" }
]
+++

# اسکریپت‌های CLI و بسته‌بندی

## argparse ساده

```python
import argparse

parser = argparse.ArgumentParser(description="سلام از CLI")
parser.add_argument("name")
parser.add_argument("--shout", action="store_true")
args = parser.parse_args()

msg = f"سلام {args.name}"
print(msg.upper() if args.shout else msg)
```

## بسته‌بندی مینیمال

`pyproject.toml`:

```toml
[project]
name = "hello-cli"
version = "0.1.0"
dependencies = []

[project.scripts]
hello = "hello.__main__:main"
```

