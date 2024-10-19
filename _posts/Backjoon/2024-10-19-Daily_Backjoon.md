---
layout: post
title: "[데일리 백준] 6603"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-19
last_modified_at: 2024-10-19
---
## Silver
### [6603][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void print(vector<int>& result) {
    for(int i : result) cout << i << ' ';
    cout << '\n';
}
void lotto(const vector<int>& set, vector<int> result, int index, const int k) {
    if(k-result.size()+index < 6) return;
    result.push_back(set[index]);
    if(result.size() == 6) {
        print(result);
        return;
    }
    for(int i = index+1 ; i < k ; i++) {
        lotto(set, result, i, k);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int k;
    while(cin >> k) {
        if(k == 0) break;
        vector<int> set(k);
        for(int i = 0 ; i < k ; i++) cin >> set[i];
        vector<int> result;
        for(int i = 0 ; i < k ; i++) {
            lotto(set, result, i, k);
        }
        cout << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 백트래킹 조합 연습 문제.

</div>
</details>

[def]: https://www.acmicpc.net/problem/6603