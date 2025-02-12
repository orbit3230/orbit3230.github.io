---
layout: post
title: "[데일리 백준] 13414"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-12
last_modified_at: 2025-02-12
---
## Silver
### [13414][def]

```c++
#include <iostream>
#include <unordered_map>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Student {
    string id;
    int order;
} Student;

bool compare(const Student& s1, const Student& s2) {
    return s1.order < s2.order;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int k, l;
    cin >> k >> l;
    unordered_map<string, int> map;
    string id;
    for(int i = 0 ; i < l ; i++) {
        cin >> id;
        map[id] = i;
    }
    vector<Student> students;
    for(auto& it : map) {
        students.push_back({it.first, it.second});
    }
    sort(students.begin(), students.end(), compare);
    for(int i = 0 ; i < k ; i++) {
        if(i == students.size()) break;
        cout << students[i].id << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 해시 날먹

</div>
</details>

[def]: https://www.acmicpc.net/problem/13414