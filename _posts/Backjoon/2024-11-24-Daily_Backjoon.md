---
layout: post
title: "[데일리 백준] 5568"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-24
last_modified_at: 2024-11-24
---
## Silver
### [5568][def]

```c++
#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

void backtracking(vector<string>& cards, unordered_set<string>& result, vector<bool>& used, string current, int size, int k) {
    if(size == k) {
        result.insert(current);
        return;
    }
    for(int i = 0 ; i < cards.size() ; i++) {
        if(used[i]) continue;
        used[i] = true;
        backtracking(cards, result, used, current + cards[i], size + 1, k);
        used[i] = false;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    vector<string> cards(n);
    for(int i = 0 ; i < n ; i++) cin >> cards[i];
    unordered_set<string> result;
    vector<bool> used(n, false);
    backtracking(cards, result, used, "", 0, k);
    cout << result.size();
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 백트래킹.

- 쉬어가는 문제

</div>
</details>

[def]: https://www.acmicpc.net/problem/5568