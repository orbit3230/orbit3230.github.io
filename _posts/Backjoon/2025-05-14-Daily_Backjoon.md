---
layout: post
title: "[데일리 백준] 11536"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-14
last_modified_at: 2025-05-14
---
## Silver
### [11536][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool check(vector<string>& a, vector<string>& b) {
    int size = a.size();
    for(int i = 0 ; i < size ; i++) if(a[i] != b[i]) return false;
    return true;
}

int main() {
    int n;
    cin >> n;
    vector<string> names(n);
    for(int i = 0 ; i < n ; i++) cin >> names[i];
    vector<string> increased_names = names;
    sort(increased_names.begin(), increased_names.end());
    vector<string> decreased_names = names;
    sort(decreased_names.begin(), decreased_names.end());
    reverse(decreased_names.begin(), decreased_names.end());

    if(check(names, increased_names)) {
        cout << "INCREASING";
        return 0;
    }
    if(check(names, decreased_names)) {
        cout << "DECREASING";
        return 0;
    }
    cout << "NEITHER";
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/11536