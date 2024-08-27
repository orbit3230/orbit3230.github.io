---
layout: post
title: "[데일리 백준] 11718"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-27
last_modified_at: 2024-08-27
---
## Gold
### [11718][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool checking(string pw) {
    int ja = 0;    // 자음
    int mo = 0;  // 모음
    for(int i = 0 ; i < pw.size() ; i++) {
        if(pw[i] == 'a' || pw[i] == 'e' || pw[i] == 'i' || pw[i] == 'o' || pw[i] == 'u') mo++;
        else ja++;
    }
    if(ja >= 2 && mo >= 1) return true;
    return false;
}

void making(vector<char>& characters, string pw, int index, int length) {
    if(pw.size() == length) {
        if(checking(pw)) cout << pw << '\n';
        return;
    }
    for(int i = index ; i < characters.size() ; i++) {
        making(characters, pw + characters[i], i+1, length);
    }
}

int main() {
    int l, c;
    cin >> l >> c;
    vector<char> characters;
    char input;
    for(int i = 0 ; i < c ; i++) {
        cin >> input;
        characters.push_back(input);
    }
    sort(characters.begin(), characters.end());
    making(characters, "", 0, l);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 무난한 백트래킹

</div>
</details>

[def]: https://www.acmicpc.net/problem/11718