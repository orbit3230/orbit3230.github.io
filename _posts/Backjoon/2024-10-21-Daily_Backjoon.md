---
layout: post
title: "[데일리 백준] 16987"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-21
last_modified_at: 2024-10-21
---
## Gold
### [16987][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Egg {
    int hp;
    int weight;
    bool isBroken = false;
} Egg;

void eggShot(vector<Egg>& eggs, int n, int current, int broken, int& max) {
    max = std::max(max, broken);
    if(current == n) return;
    if(eggs[current].isBroken) {
        eggShot(eggs, n, current+1, broken, max);
        return;
    }
    if(broken >= n-1) return;
    for(int i = 0 ; i < n ; i++) {
        if(i == current || eggs[i].isBroken) continue;
        eggs[current].hp -= eggs[i].weight;
        eggs[i].hp -= eggs[current].weight;
        int broken_ = broken;
        if(eggs[current].hp <= 0) {
            eggs[current].isBroken = true;
            broken_++;
        }
        if(eggs[i].hp <= 0) {
            eggs[i].isBroken = true;
            broken_++;
        }
        eggShot(eggs, n, current+1, broken_, max);
        // 복원
        eggs[current].hp += eggs[i].weight;
        eggs[i].hp += eggs[current].weight;
        eggs[current].isBroken = false;
        eggs[i].isBroken = false;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<Egg> eggs(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> eggs[i].hp >> eggs[i].weight;
    }
    int max = 0;
    eggShot(eggs, n, 0, 0, max);
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 백트래킹 문제이다.

- 단순히 모든 경우의 수를 모두 탐색하면 되는 문제로서, 사실 구현에 가까운 문제였다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/16987