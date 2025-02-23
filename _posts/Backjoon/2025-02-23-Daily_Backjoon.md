---
layout: post
title: "[데일리 백준] 25955"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-23
last_modified_at: 2025-02-23
---
## Silver
### [25955][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

typedef struct Problem {
    string name;
    int value;
} Problem;

bool compare(const Problem& p1, const Problem& p2) {
    return p1.value < p2.value;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<Problem> problems;
    vector<Problem> sorted_problems;
    string name;
    int value;
    for(int i = 0 ; i < n ; i++) {
        cin >> name;
        switch(name[0]) {
            case 'B' : value = 1; break;
            case 'S' : value = 2000; break;
            case 'G' : value = 4000; break;
            case 'P' : value = 6000; break;
            case 'D' : value = 8000; break;
        }
        string name_value = name;
        name_value[0] = '0';
        value += 1000 - stoi(name_value);
        problems.push_back({name, value});
        sorted_problems.push_back({name, value});
    }
    sort(sorted_problems.begin(), sorted_problems.end(), compare);
    int count = 0;
    for(int i = 0 ; i < n ; i++) {
        if(problems[i].name != sorted_problems[i].name) {
            if(!count) cout << "KO\n";
            count++;
            cout << sorted_problems[i].name << ' ';
        }
    }
    if(!count) cout << "OK";
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/25955