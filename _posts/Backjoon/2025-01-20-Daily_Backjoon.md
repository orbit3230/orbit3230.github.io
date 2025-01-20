---
layout: post
title: "[데일리 백준] 1041"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-20
last_modified_at: 2025-01-20
---
## Gold
### [1041][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void makeDiceTwo(vector<int>& dice, vector<int>& diceTwo) {
    diceTwo[0] = dice[3] + dice[0];  // D A
    diceTwo[1] = dice[3] + dice[1];  // D B
    diceTwo[2] = dice[3] + dice[5];  // D F
    diceTwo[3] = dice[3] + dice[4];  // D E
    diceTwo[4] = dice[2] + dice[0];  // C A
    diceTwo[5] = dice[2] + dice[1];  // C B
    diceTwo[6] = dice[2] + dice[5];  // C F
    diceTwo[7] = dice[2] + dice[4];  // C E
    diceTwo[8] = dice[0] + dice[1];  // A B
    diceTwo[9] = dice[1] + dice[5];  // B F
    diceTwo[10] = dice[5] + dice[4]; // F E
    diceTwo[11] = dice[4] + dice[0]; // E A
}
void makeDiceThree(vector<int>& dice, vector<int>& diceThree) {
    diceThree[0] = dice[3] + dice[0] + dice[1];  // D A B
    diceThree[1] = dice[3] + dice[1] + dice[5];  // D B F
    diceThree[2] = dice[3] + dice[5] + dice[4];  // D F E
    diceThree[3] = dice[3] + dice[4] + dice[0];  // D E A
    diceThree[4] = dice[2] + dice[0] + dice[1];  // C A B
    diceThree[5] = dice[2] + dice[1] + dice[5];  // C B F
    diceThree[6] = dice[2] + dice[5] + dice[4];  // C F E
    diceThree[7] = dice[2] + dice[4] + dice[0];  // C E A
}

int main() {
    long long n;
    cin >> n;
    vector<int> dice(6);
    vector<int> diceTwo(12);
    vector<int> diceThree(8);
    for(int i = 0 ; i < 6 ; i++) cin >> dice[i];
    makeDiceTwo(dice, diceTwo);
    makeDiceThree(dice, diceThree);
    sort(dice.begin(), dice.end());
    sort(diceTwo.begin(), diceTwo.end());
    sort(diceThree.begin(), diceThree.end());
    int one = dice[0];
    int two = diceTwo[0];
    int three = diceThree[0];

    if(n == 1) {
        cout << dice[0] + dice[1] + dice[2] + dice[3] + dice[4];
        return 0;
    }
    // (n-2)^2 + 4((n-2)^2 + (n-2))
    long long oneFace = 5*n*n - 16*n + 12;
    // (n^2 - (n-2)^2 - 4) + 4(n-1)
    long long twoFace = 8*n - 12;
    // 4 if (n >= 2)
    long long threeFace = 4;

    cout << oneFace*one + twoFace*two + threeFace*three;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 재밌는 수학 문제.

- 코파일럿 코드 자동 완성이 계속 오타 내서 찾느라 개고생함

- 아니 생각해보니까 노가다 말고 주사위의 성질 (마주보는 두 면의 합은 7) 을 이용하면 되는거였네!!

</div>
</details>

[def]: https://www.acmicpc.net/problem/1041