---
layout: post
title: "[데일리 백준] 11651"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-12
last_modified_at: 2024-04-12
---
## Silver
### [11651][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int, int>> list(n);
    for(int i = 0; i < n; i++) {
        cin >> list[i].first >> list[i].second;
    }
    // java의 comparator 람다함수와 같은 기능.
    sort(list.begin(), list.end(), [](pair<int, int> a, pair<int, int> b) {
        if(a.second == b.second)
            return a.first < b.first;
        return a.second < b.second;
    });
    for(int i = 0; i < n; i++) {
        cout << list[i].first << " " << list[i].second << "\n";
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- c++의 람다식에 대하여 간략하게 알아보는 시간을 가졌음.  
모양이 다른 언어들과 비교했을 때 또 색다르다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/11651