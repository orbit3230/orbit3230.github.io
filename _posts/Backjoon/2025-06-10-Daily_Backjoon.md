---
layout: post
title: "[데일리 백준] 7785"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-10
last_modified_at: 2025-06-10
---
## Silver
### [7785][def]

```c++
#include <iostream>
#include <vector>
#include <set>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    set<string, greater<string>> set;
    string name, action;
    while(n--) {
        cin >> name >> action;
        if(action == "enter") {
            set.insert(name);
            continue;
        }
        set.erase(name);
    }
    for(string name : set) cout << name << '\n';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Hash Set (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/7785