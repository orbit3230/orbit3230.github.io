---
layout: post
title: "[데일리 백준] 14940"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-17
last_modified_at: 2024-06-17
---
## Silver
### [14940][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

int** going(int **graph, int n, int m, int x, int y) {
    bool **visited = new bool*[n];
    for(int i = 0 ; i < n ; i++) {
        visited[i] = new bool[m];
        for(int j = 0 ; j < m ; j++) {
            visited[i][j] = false;
        }
    }
    
    int **distances = new int*[n];
    for(int i = 0 ; i < n ; i++) {
        distances[i] = new int[m];
        for(int j = 0 ; j < m ; j++) {
            if(graph[i][j] == 0)
                distances[i][j] = 0;
            else
                distances[i][j] = -1;
        }
    }
    queue<pair<int, int>> going;
    going.push({x, y});
    visited[x][y] = true;
    distances[x][y] = 0;
    pair<int, int> position;
    int x_, y_;
    while(!going.empty()) {
        position = going.front();
        going.pop();
        x_ = position.first;
        y_ = position.second;
        // going up
        if((y_ - 1 >= 0) && !(visited[x_][y_-1]) && (graph[x_][y_-1] != 0)) {
            going.push({x_, y_-1});
            visited[x_][y_-1] = true;
            distances[x_][y_-1] = distances[x_][y_] + 1;
        }
        // going down
        if((y_ + 1 < m) && !(visited[x_][y_+1]) && (graph[x_][y_+1] != 0)) {
            going.push({x_, y_+1});
            visited[x_][y_+1] = true;
            distances[x_][y_+1] = distances[x_][y_] + 1;
        }
        // going left
        if((x_ - 1 >= 0) && !(visited[x_-1][y_]) && (graph[x_-1][y_] != 0)) {
            going.push({x_-1, y_});
            visited[x_-1][y_] = true;
            distances[x_-1][y_] = distances[x_][y_] + 1;
        }
        // going right
        if((x_ + 1 < n) && !(visited[x_+1][y_]) && (graph[x_+1][y_] != 0)) {
            going.push({x_+1, y_});
            visited[x_+1][y_] = true;
            distances[x_+1][y_] = distances[x_][y_] + 1;
        }  
    }

    return distances;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    
    int n, m;
    cin >> n >> m;

    int x, y;  // 목표지점의 위치를 기록해두기 위한 변수

    int **graph = new int*[n];
    for(int i = 0 ; i < n ; i++) {
        graph[i] = new int[m];
        for(int j = 0 ; j < m ; j++) {
            cin >> graph[i][j];
            if(graph[i][j] == 2) {
                x = i;
                y = j;
            }
        }
    }

    int** distances = going(graph, n, m, x, y);
    
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            cout << distances[i][j] << " ";
        }
        cout << "\n";
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- [어제][def2]의 [문제][def3] 에서 살짝만 코드를 변형하였다.  

</div>
</details> 

[def]: https://www.acmicpc.net/problem/14940
[def2]: https://orbit3230.github.io/2024/06/17/Daily_Backjoon/
[def3]: https://www.acmicpc.net/problem/21736