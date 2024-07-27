---
layout: post
title: "[데일리 백준] 1389"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-27
last_modified_at: 2024-07-27
---
## Silver
### [1389][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <set>
using namespace std;

typedef struct Player {
    int name;
    int step;
    bool visited;
    set<int> acquaintances;
    int kevin_bacon;
} Player;

int bfs_search(vector<Player>& players, Player p, Player find) {
    queue<Player*> q;
    q.push(&p);
    p.visited = true;

    Player* current;
    while(!q.empty()) {
        current = q.front();
        q.pop();
        if(current->name == find.name) {
            return current->step;
        }
        for(int index : current->acquaintances) {
            Player* next = &players[index];
            if(!next->visited) {
                next->visited = true;
                next->step = current->step + 1;
                q.push(next);
            }
        }
    }
}

void initializePlayers(vector<Player>& players) {
    for(Player& p : players) {
        p.step = 0;
        p.visited = false;
    }
}

void calculate_kevin_bacon(vector<Player>& players, int current, int n) {
    for(int i = 1 ; i <= n ; i++) {
        if(i != current) {
            initializePlayers(players);
            players[current].kevin_bacon += bfs_search(players, players[current], players[i]);
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;

    vector<Player> players(n+1);
    for(int i = 1 ; i <= n ; i++) {
        Player* p = new Player();
        p->name = i;
        p->step = 0;
        p->visited = false;
        p->kevin_bacon = 0;
        players[i] = *p;
    }

    int a, b;
    for(int i = 0 ; i < m ; i++) {
        cin >> a >> b;
        players[a].acquaintances.insert(b);
        players[b].acquaintances.insert(a);
    }

    for(int i = 1 ; i <= n ; i++) {
        calculate_kevin_bacon(players, i, n);
    }

    int minBacon = 10000;
    int minName;
    for(int i = 1; i <= n; i++) {
        if(players[i].kevin_bacon < minBacon) {
            minBacon = players[i].kevin_bacon;
            minName = players[i].name;
        }
    }

    cout << minName;
}
```
<details>
<summary>코멘트</summary>
<div markdown="1">

- 함수에 벡터를 넘길 때는 어지간하면 참조로 넘기자.  
기존 내용을 변경하기 싫으면, 참조로 넘기고 호출 후에 초기화하자.  

- 참조로 받았더라도, `for-each` 문으로 돌릴 때 참조가 아닌 변수로 받아서 돌리면 의미가 없다.  
주의하도록 하자.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1389