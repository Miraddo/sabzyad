+++
title = "نوشتن تست‌های واحد"
date = 2025-10-31
description = "unittest و pytest: تست واحد، فیکسچر و ساختار تست"
duration = "45 دقیقه"
difficulty = "متوسط"
lesson_number = 18
type = "lessons"
section = "بخش هشتم: تست و کیفیت کد"
resources = [
  { title = "unittest", url = "https://docs.python.org/3/library/unittest.html" },
  { title = "pytest", url = "https://docs.pytest.org/en/stable/" }
]
+++

# تست‌نویسی: کیفیت پایدار

## unittest

```python
# test_math.py
import unittest

from mymath import add

class TestMath(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)

if __name__ == "__main__":
    unittest.main()
```

## pytest

```python
# test_calc.py
from mymath import add

def test_add():
    assert add(2, 3) == 5
```

اجرای تست‌ها:

```bash
pytest -q
```

