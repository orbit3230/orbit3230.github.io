---
layout: post
title: "[데일리 백준] 25206"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-23
last_modified_at: 2024-12-23
---
## Silver
### [25206][def]

```c++
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    string name;
    string score_;
    int score;
    int score_sum = 0;
    string grade;
    double grade_sum = 0;
    while(cin >> name >> score_ >> grade) {
        if(grade == "P") continue;
        score = score_[0]-'0';
        score_sum += score;
        if(grade == "A+") grade_sum += 4.5*score;
        else if(grade == "A0") grade_sum += 4.0*score;
        else if(grade == "B+") grade_sum += 3.5*score;
        else if(grade == "B0") grade_sum += 3.0*score;
        else if(grade == "C+") grade_sum += 2.5*score;
        else if(grade == "C0") grade_sum += 2.0*score;
        else if(grade == "D+") grade_sum += 1.5*score;
        else if(grade == "D0") grade_sum += 1.0*score;
    }
    cout << fixed << setprecision(6) << grade_sum/score_sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열 날먹

</div>
</details>

[def]: https://www.acmicpc.net/problem/25206