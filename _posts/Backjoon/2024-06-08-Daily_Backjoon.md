---
layout: post
title: "[데일리 백준] 2178"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-08
last_modified_at: 2024-06-08
---
## Silver
### [2178][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Position {
    int x;
    int y;
    int step;
} Position;

int n, m;
int min_step = 10000; // 대충 큰 수

/// @brief 미로를 달리자 ! (BFS)
/// @param graph 미로 좌표 데이터. 1이면 이동 가능한 길
void mazeRunner(bool graph[100][100]) {
    queue<Position> q;
    bool visited[100][100] = {false,};

    Position start = {0, 0, 1};
    q.push(start);
    while(!q.empty()) {
        Position current = q.front();
        q.pop();
        if(current.x == n-1 && current.y == m-1) {
            if(current.step < min_step) {
                min_step = current.step;
            }
            continue;
        }
        if(current.x > 0) {
            if(graph[current.x - 1][current.y] && !visited[current.x - 1][current.y]) {
                Position next = {current.x - 1, current.y, current.step + 1};
                q.push(next);
                visited[current.x - 1][current.y] = true;
            }
        }
        if(current.x < n - 1) {
            if(graph[current.x + 1][current.y] && !visited[current.x + 1][current.y]) {
                Position next = {current.x + 1, current.y, current.step + 1};
                q.push(next);
                visited[current.x + 1][current.y] = true;
            }
        }
        if(current.y > 0) {
            if(graph[current.x][current.y - 1] && !visited[current.x][current.y - 1]) {
                Position next = {current.x, current.y - 1, current.step + 1};
                q.push(next);
                visited[current.x][current.y - 1] = true;
            }
        }
        if(current.y < m - 1) {
            if(graph[current.x][current.y + 1] && !visited[current.x][current.y + 1]) {
                Position next = {current.x, current.y + 1, current.step + 1};
                q.push(next);
                visited[current.x][current.y + 1] = true;
            }
        }
    }
}

int main() {
    cin >> n >> m;
    bool graph[100][100];
    for(int r = 0 ; r < n ; r++) {
        string line;
        cin >> line;
        for(int c = 0; c < m ; c++) {
            if(line[c] == '1')
                graph[r][c] = true;
            else
                graph[r][c] = false;
        }
    }

    mazeRunner(graph);

    cout << min_step;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 처음에 뭣모르고 dfs로 풀었었다.  
올바른 코드이지만, 시간초과로 통과하지 못한 코드.  

```c++
#include <iostream>
using namespace std;

int n, m;
int min_step = 10000; // 대충 큰 수

/// @brief 미로를 달리자 !
/// @param graph 미로 좌표 데이터. 1이면 이동 가능한 길
/// @param visited 방문했으면 true, 아니면 false를 담고있는 좌표 데이터
/// @param c_r 현재 행 위치
/// @param c_c 현재 열 위치
/// @param step 현재까지 이동한 거리
void mazeRunner(bool graph[100][100], bool visited[100][100], int c_r, int c_c, int step) {
    step++;
    visited[c_r][c_c] = true;
    // 이미 최소 이동 거리를 넘겼다면 탐색 중단 후 복귀
    if(step >= min_step) {
        visited[c_r][c_c] = false;
        return;
    }
    // 출구에 다다랐다면 최소 이동 거리를 갱신하고 종료
    if(c_r == n-1 && c_c == m-1) {
        if(step < min_step) {
            min_step = step;
        }
        // 재 탐색을 위하여 방문 기록을 삭제
        visited[c_r][c_c] = false;
        return;
    }
    // bottom move
    if((c_r < n) && (graph[c_r+1][c_c] == true) && (visited[c_r+1][c_c] == false)) {
        mazeRunner(graph, visited, c_r+1, c_c, step);
    }
    // right move
    if((c_c < m) && (graph[c_r][c_c+1] == true) && (visited[c_r][c_c+1] == false)) {
        mazeRunner(graph, visited, c_r, c_c+1, step);
    }
    // top move
    else if((c_r > 0) && (graph[c_r-1][c_c] == true) && (visited[c_r-1][c_c] == false)) {
        mazeRunner(graph, visited, c_r-1, c_c, step);
    }
    // left move
    else if((c_c > 0) && (graph[c_r][c_c-1] == true) && (visited[c_r][c_c-1] == false)) {
        mazeRunner(graph, visited, c_r, c_c-1, step);
    }
    // 더 이상의 방문이 불가능하므로 방문 기록을 삭제
    visited[c_r][c_c] = false;
}

int main() {
    cin >> n >> m;
    bool graph[100][100];
    for(int r = 0 ; r < n ; r++) {
        string line;
        cin >> line;
        for(int c = 0; c < m ; c++) {
            if(line[c] == '1')
                graph[r][c] = true;
            else
                graph[r][c] = false;
        }
    }
    bool visited[100][100] = {false};

    mazeRunner(graph, visited, 0, 0, 0);

    cout << min_step;
}
```

</div>
</details>

[def]: https://www.acmicpc.net/problem/2178