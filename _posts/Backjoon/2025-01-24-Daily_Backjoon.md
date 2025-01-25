---
layout: post
title: "[데일리 백준] 1062"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-24
last_modified_at: 2025-01-24
---
## Gold
### [1062][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void backtracking(vector<string>& words, vector<bool>& know, int knows, int k, int index, int& max) {
    if(knows == k) {
        int count = 0;
        int remain = words.size();
        for(string& word : words) {
            if(count + remain <= max) return;
            bool canRead = true;
            for(char ch : word) {
                if(!know[ch - 'a']) {
                    canRead = false;
                    break;
                }
            }
            if(canRead) count++;
        }
        max = std::max(max, count);
    }
    for(int i = index ; i < 26 ; i++) {
        if(know[i]) continue;
        know[i] = true;
        backtracking(words, know, knows + 1, k, i, max);
        know[i] = false;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    vector<string> words(n);
    for(int i = 0 ; i < n ; i++) cin >> words[i];
    vector<bool> know(26, false);
    if(k < 5) {
        cout << 0;
        return 0;
    }
    know['a' - 'a'] = true;
    know['n' - 'a'] = true;
    know['t' - 'a'] = true;
    know['i' - 'a'] = true;
    know['c' - 'a'] = true;
    int max = 0;
    backtracking(words, know, 5, k, 0, max);
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 백트래킹 문제

- 시간을 효과적으로 줄이는 여러가지 트릭들이 떠오르긴 하는데,  
다음 기회에 해보자!  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1062