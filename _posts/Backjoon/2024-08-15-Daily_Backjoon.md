---
layout: post
title: "[데일리 백준] 16946"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-15
last_modified_at: 2024-08-15
---
## Gold
### [16946][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <set>
using namespace std;

typedef struct Position {
    int x;
    int y;
    bool visited;
    long long canMove;
} Position;

void canMoveUpdate(vector<vector<Position>>& graph, int i, int j, int n, int m, long long identifier) {
    vector<Position*> trace;  // 지나온 길을 모두 같은 canMove 값으로 업데이트 해주기 위하여 자취를 기록
    long long canMoveCount = 0;
    queue<Position*> q;
    q.push(&graph[i][j]);
    graph[i][j].visited = true;
    canMoveCount++;
    Position* current;
    int x_, y_;
    while(!q.empty()) {
        current = q.front();
        q.pop();
        trace.push_back(current);
        x_ = current->x;
        y_ = current->y;
        if(x_ > 0 && !graph[x_ - 1][y_].visited) {
            q.push(&graph[x_ - 1][y_]);
            graph[x_ - 1][y_].visited = true;
            canMoveCount++;
        }
        if(x_ + 1 < n && !graph[x_ + 1][y_].visited) {
            q.push(&graph[x_ + 1][y_]);
            graph[x_ + 1][y_].visited = true;
            canMoveCount++;
        }
        if(y_ > 0 && !graph[x_][y_ - 1].visited) {
            q.push(&graph[x_][y_ - 1]);
            graph[x_][y_ - 1].visited = true;
            canMoveCount++;
        }
        if(y_ + 1 < m && !graph[x_][y_ + 1].visited) {
            q.push(&graph[x_][y_ + 1]);
            graph[x_][y_ + 1].visited = true;
            canMoveCount++;
        }
    }
    for(Position* p : trace) {  // Update
        p->canMove = canMoveCount + identifier;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<Position>> graph(n, vector<Position>(m));
    string input;
    char token;
    vector<Position*> walls;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        for(int j = 0 ; j < m ; j++) {
            graph[i][j].x = i;
            graph[i][j].y = j;
            graph[i][j].visited = false;
            token = input[j];
            if(token == '1') {
                graph[i][j].visited = true;
                walls.push_back(&graph[i][j]);
            }
        }
    }
    long long count = 1;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            if(!graph[i][j].visited) {
                // 같은 영역임을 구분하기 위하여 임의의 identifier를 부여하여 canMoveUpdate에 합산할 것이다.
                long long identifier = (count++)*10000000;
                canMoveUpdate(graph, i, j, n, m, identifier);
            }
        }
    }
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            if(graph[i][j].canMove != 0)  // 벽이 아닌 장소
                cout << 0;
            else {  // 벽인 장소 - 상 하 좌 우의 이동 가능한(canMove) 영역의 합을 계산
                int count = 1;
                set<long long> s;  // 중복 제거용
                if(i > 0)
                    s.insert(graph[i - 1][j].canMove);
                if(i + 1 < n)
                    s.insert(graph[i + 1][j].canMove);
                if(j > 0)
                    s.insert(graph[i][j - 1].canMove);
                if(j + 1 < m)
                    s.insert(graph[i][j + 1].canMove);
                for(long long canMove : s) {
                    count += canMove % 10000000;  // identifier 제거
                }
                cout << count % 10;
            }
        }
        cout << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 지금까지 풀어본 그래프 탐색 문제 중에서 가장 신박했다고 생각한다.  
일반적인 BFS를 각 벽마다 모두 돌리게 되면 시간초과가 발생한다.  
다만, 이동 가능한 영역의 넓이는 항상 그대로라는 점을 이용하여, 한번의 탐색으로 모든 이동가능한 (`0`) 영역에 대해  
해당 영역과 인접한 넓이의 크기를 계산 완료 후,  
마지막에 각 벽마다 상, 하, 좌, 우의 영역의 합을 계산하는 방식으로 해결 가능하다.  

- 또한 만약 상, 하, 좌, 우 영역 중에서 종종 같은 영역을 중복으로 더하게 될 가능성이 있는데,  
해당 경우는 나의 경우엔 매우 큰 수 중에서 기존 값에 영향을 미치지 않는 (모듈러 연산을 통하여 원본 값을 추출할 수 있는) `10000000` 의 배수를 활용하여  
같은 영역의 경우에만 같은 값을 가지도록 하고 중복을 제거하는 `set`를 사용하는 방식을 채택했다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/16946