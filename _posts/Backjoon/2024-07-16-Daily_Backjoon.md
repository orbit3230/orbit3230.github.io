---
layout: post
title: "[데일리 백준] 16928"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-16
last_modified_at: 2024-07-16
---
## Gold
### [16928][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Place {
    int index;
    int moving;
    bool visited;
    int step;
} Place;

int findMin(vector<Place>& board) {
    queue<Place> q;
    q.push(board[1]);
    board[1].visited = true;
    Place p;
    while(!q.empty()) {
        p = q.front();
        q.pop();
        if(p.index == 100) return p.step;   // 종료 조건
        for(int dice = 1 ; dice <= 6 ; dice++) {
            int index = p.index + dice;
            if((index <= 100) && !(board[index].visited)) {
                board[index].visited = true;  // 사다리나 뱀을 밟은 위치를 visited true.
                index += board[index].moving;
                board[index].step = p.step + 1;
                // 큐에 집어 넣을 때의 당시 정보를 저장하기 때문에, 모든 정보 세팅 후 큐에 삽입
                q.push(board[index]);
            }
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;

    vector<Place> board(101);
    for(int i = 1 ; i <= 100 ; i++) {
        board[i] = {i, 0, false, 0};
    }

    int from, to;
    for(int i = 0 ; i < n+m ; i++) {
        cin >> from >> to;
        board[from].moving = to-from;
    }

    cout << findMin(board);
}
```

[def]: https://www.acmicpc.net/problem/16928