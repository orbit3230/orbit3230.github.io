---
layout: post
title: "[데일리 백준] 5635"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-19
last_modified_at: 2025-01-19
---
## Silver
### [5635][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Person {
    string name;
    int yyyymmdd;
} Person;

bool compare(Person a, Person b) {
    return a.yyyymmdd < b.yyyymmdd;
}

int main() {
    int n;
    cin >> n;
    vector<Person> people(n);
    string name;
    int day, month, year;
    for(int i = 0 ; i < n ; i++) {
        cin >> name >> day >> month >> year;
        people[i].name = name;
        people[i].yyyymmdd = year * 10000 + month * 100 + day;
    }
    sort(people.begin(), people.end(), compare);
    cout << people[n-1].name << '\n' << people[0].name;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열 날먹

</div>
</details>

[def]: https://www.acmicpc.net/problem/5635