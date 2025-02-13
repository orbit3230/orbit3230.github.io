---
layout: post
title: "[데일리 백준] 2011"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-13
last_modified_at: 2025-02-13
---
## Gold
### [2011][def]

```c++
#include <iostream>
#include <vector>
#define DIV 1000000
using namespace std;

bool canBeTwo(char& p1, char& p2) {
    int word = (p1 - '0') * 10 + (p2 - '0');
    return word >= 10 && word <= 26;
}

int main() {
    string password;
    cin >> password;
    size_t size = password.size();
    vector<vector<int>> dpTable(2, vector<int>(size, 0));
    if(password[0] == '0') {
        cout << 0;
        return 0;
    }
    dpTable[0][0] = 1;
    for(size_t i = 1 ; i < size ; i++) {
        // 1개
        if(password[i] != '0') dpTable[0][i] = (dpTable[0][i-1] + dpTable[1][i-1]) % DIV;
        if(password[i] == '0' && (password[i-1] == '0' || password[i-1] > '2')) {
            cout << 0;
            return 0;
        }
        // 2개
        if(canBeTwo(password[i-1], password[i])) {
            if(i == 1) {
                dpTable[1][i] = 1;
                continue;
            }
            dpTable[1][i] = (dpTable[0][i-2] + dpTable[1][i-2]) % DIV;
        }
    }
    cout << (dpTable[0][size-1] + dpTable[1][size-1]) % DIV;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming  

- 숫자 0을 처리하는 예외 처리가 다소 까다로웠다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/2011