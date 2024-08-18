---
layout: post
title: "[데일리 백준] 1107"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-18
last_modified_at: 2024-08-18
---
## Gold
### [1107][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

bool canPress(int input, vector<bool>& buttons) {
    if(input == 0) return buttons[0];
    while(input > 0) {
        if(!buttons[input % 10]) return false;
        input /= 10;
    }
    return true;
}

int main() {
    int target;
    cin >> target;
    int brokens;
    cin >> brokens;
    vector<bool> buttons(10, true);
    int brokenButton;
    for(int i = 0 ; i < brokens ; i++) {
        cin >> brokenButton;
        buttons[brokenButton] = false;
    }

    // 기본 : 기존 100번에서 +, - 버튼만 누르는 경우의 입력 횟수
    int minDiff = abs(target - 100);
    int diff;
    for(int input = 0 ; input <= 1000000 ; input++) {
        if(!canPress(input, buttons)) continue;
        // diff = 숫자 입력 횟수 + 입력 후 (+, -) 버튼 입력 횟수
        diff = to_string(input).length() + abs(target - input);
        if(diff < minDiff) minDiff = diff;
    }

    cout << minDiff;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 재미있는 브루트포스

</div>
</details>

[def]: https://www.acmicpc.net/problem/1107