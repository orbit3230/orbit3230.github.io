---
layout: post
title: "[데일리 백준] 1308"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-28
last_modified_at: 2024-04-28
---
## Silver
### [1308][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int from_year, from_month, from_day;
    int to_year, to_month, to_day;
    cin >> from_year >> from_month >> from_day;
    cin >> to_year >> to_month >> to_day;

    if(from_year < to_year-1000 || (from_year == to_year-1000 && from_month <= to_month && from_day <= to_day)) {
        cout << "gg";
        return 0;
    }

    int d_day = 0;
    
    while(from_year != to_year || from_month != to_month) {
        if(from_month == 1 || from_month == 3 || from_month == 5 || from_month == 7 || from_month == 8 || from_month == 10 || from_month == 12) {
            d_day += 31;
        } 
        else if(from_month == 4 || from_month == 6 || from_month == 9 || from_month == 11) {
            d_day += 30;
        }
        // 2월인 경우
        else {
            if(from_year % 400 == 0 || (from_year % 4 == 0 && from_year % 100 != 0)) {
                d_day += 29;
            } else {
                d_day += 28;
            }
        }
        from_month++;
        if(from_month == 13) {
            from_month = 1;
            from_year++;
        }
    }

    d_day += to_day - from_day;

    cout << "D-" << d_day;
}
```

[def]: https://www.acmicpc.net/problem/1308