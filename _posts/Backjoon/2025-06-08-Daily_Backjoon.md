---
layout: post
title: "[데일리 백준] 10825"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-08
last_modified_at: 2025-06-08
---
## Silver
### [10825][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Student {
    string name;
    int korean;
    int english;
    int math;
    bool operator<(const Student& other) const {
        if(korean != other.korean) return korean > other.korean;
        if(english != other.english) return english < other.english;
        if(math != other.math) return math > other.math;
        return name < other.name;
    }
} Student;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    
    int n;
    cin >> n;
    vector<Student> students(n);
    for(int i = 0 ; i < n ; i++)
        cin >> students[i].name >> students[i].korean >> students[i].english >> students[i].math; 
    sort(students.begin(), students.end());
    for(Student& student : students) cout << student.name << '\n';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/10825