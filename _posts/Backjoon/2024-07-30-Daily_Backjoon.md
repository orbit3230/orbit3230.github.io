---
layout: post
title: "[데일리 백준] 27172"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-30
last_modified_at: 2024-07-30
---
## Gold
### [27172][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Player {
    int score = 0;
    bool exist = false;
} Player;

void playGame(vector<Player>& players, vector<int>& list, int n, int max) {
    int card;
    for(int i = 0 ; i < n ; i++) {
        card = list[i];
        int multiply;
        for(int j = 2 ; j*card <= max ; j++) {
            multiply = j*card;
            if(players[multiply].exist) {
                players[multiply].score--;
                players[card].score++;
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<Player> players(1000001);  // 인덱스마다 해당 카드를 가진 플레이어가 있다고 생각한다.
    vector<int> list;  // 원활한 출력을 위한 기억 리스트
    int x;
    int max = 0;
    for(int i = 0 ; i < n ; i++) {
        cin >> x;
        players[x].exist = true;
        list.push_back(x);
        if(max < x) max = x;
    }

    playGame(players, list, n, max);

    for(int player : list) {
        cout << players[player].score << ' ';
    }
}
```
<details>
<summary>코멘트</summary>
<div markdown="1">

- `에라토스테네스의 체` 알고리즘이 뭔지 잘 알게되었다.  
직접적으로 사용하지는 않았음 (알고보니 소수를 구하는 문제가 아님..)

- 배열의 인덱스 접근 (`O(1)`)은 시간효율 깡패다.  
메모리가 넉넉하다면, 적극적으로 사용하자!  
비록 크기가 백만짜리인 배열이라도, 생각보다 그렇게까지 메모리를 많이 쓰지는 않는다.  
아래는 이를 이용하지 않았더니 시간초과를 면하지 못한 문제.  
아이디어는 좋았던 것 같음

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Player {
    int x;
    int score;
} Player;

typedef struct Attack {
    vector<int> who;
} Attack;

void playGame(vector<Player*>& players, int n, int max) {
    vector<Attack> multiples(max + 1);
    for(int i = 0 ; i < n ; i++) {
        int x = players[i]->x;
        for(int j = 2 ; x*j <= max ; j++) {
            int multiple = x * j;
            multiples[multiple].who.push_back(i);
        }
    }

    for(int i = 0 ; i < n ; i++) {
        int x = players[i]->x;
        players[i]->score -= multiples[x].who.size();
        for(int player : multiples[x].who) {
            players[player]->score++;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<Player*> players(n);
    int x;
    int max = 0;
    for(int i = 0 ; i < n ; i++) {
        players[i] = new Player();
        cin >> players[i]->x;
        players[i]->score = 0;
        if(max < players[i]->x) max = players[i]->x;
    }

    playGame(players, n, max);

    for(int i = 0 ; i < n ; i++) {
        cout << players[i]->score << ' ';
    }
}
```

</div>
</details>

[def]: https://www.acmicpc.net/problem/27172