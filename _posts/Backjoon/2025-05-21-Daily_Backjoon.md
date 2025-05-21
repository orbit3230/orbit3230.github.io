---
layout: post
title: "[데일리 백준] 5555"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-21
last_modified_at: 2025-05-21
---
## Silver
### [5555][def]

```c++
#include <iostream>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    string s;
    cin >> s;
    int s_size = s.size();
    int n;
    cin >> n;
    int count = 0;
    while(n--) {
        string ring;
        cin >> ring;
        ring += ring;
        int size = ring.size();
        for(int i = 0 ; i < size-s_size ; i++) {
            if(ring.substr(i, s_size) == s) {
                count++;
                break;
            }
        }
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/5555