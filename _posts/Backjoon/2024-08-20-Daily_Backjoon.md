---
layout: post
title: "[데일리 백준] 1717"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-20
last_modified_at: 2024-08-20
---
## Gold
### [1717][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int find(vector<int>& set, int s) {
    if(set[s] == s) return s;
    return set[s] = find(set, set[s]);
}

void unions(vector<int>& set, int s1, int s2) {
    s1 = find(set, s1);
    s2 = find(set, s2);
    if(s1 != s2) {
        set[s2] = s1;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<int> set(n+1);
    for(int i = 0 ; i <= n ; i++) {
        set[i] = i;  // 집합의 대표값이 자기 자신이면, 집합의 대표값을 나타내는 배열
    }

    int type, s1, s2;
    for(int i = 0 ; i < m ; i++) {
        cin >> type >> s1 >> s2;
        if(!type) {
            unions(set, s1, s2);
        }
        else {
            if(find(set, s1) == find(set, s2)) cout << "YES" << '\n';
            else cout << "NO" << '\n';
        }
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 경로 압축에 대하여 추가적으로 알게 되었다.  
  - `return find(set, set[s])` -> `1540ms`
  - `return set[s] = find(set, set[s])` -> `32ms` (경로 압축)

</div>
</details>

[def]: https://www.acmicpc.net/problem/1717