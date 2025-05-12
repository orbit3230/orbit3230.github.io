---
layout: post
title: "[데일리 백준] 23048"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-12
last_modified_at: 2025-05-12
---
## Gold
### [23048][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cout.tie(NULL);

    int n;
    cin >> n;

    vector<int> colors(n, 0);
    int color = 1;
    colors[0] = color++;
    int max_color = 1;
    for(int i = 1 ; i < n ; i++) {
        bool used = false;
        int add = i+1;
        for(int j = i ; j < n ; j+=add) {
            if(!colors[j]) {
                colors[j] = color;
                used = true;
            }
        }
        if(used) {
            max_color = max(max_color, color);
            color++;
        }
    }
    cout << max_color << '\n';
    for(int c : colors) cout << c << ' ';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Sieve of Eratosthenes Concept

</div>
</details>

[def]: https://www.acmicpc.net/problem/23048