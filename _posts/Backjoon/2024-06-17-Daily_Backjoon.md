---
layout: post
title: "[데일리 백준] 21736"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-17
last_modified_at: 2024-06-17
---
## Silver
### [21736][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

/// @brief 도연이가 친구를 찾을 수 있게 도와주자
/// @param campus 캠퍼스 지도
/// @param n 캠퍼스의 row dimension
/// @param m 캠퍼스의 column dimension
/// @param x 도연이의 시작 위치 (x)
/// @param y 도연이의 시작 위치 (y)
/// @return 도연이가 찾은 친구의 수
int findFriends(char **campus, int n, int m, int x, int y) {
    bool **visited = new bool*[n];
    for(int i = 0 ; i < n ; i++) {
        visited[i] = new bool[m];
        for(int j = 0 ; j < m ; j++) {
            visited[i][j] = false;
        }
    }
    
    int friends = 0;
    queue<pair<int, int>> going;
    going.push({x, y});
    pair<int, int> position;
    int x_, y_;
    while(!going.empty()) {
        position = going.front();
        going.pop();
        x_ = position.first;
        y_ = position.second;
        if(campus[x_][y_] == 'P') {
            friends++;
        }
        // going up
        if((y_ - 1 >= 0) && !(visited[x_][y_-1]) && (campus[x_][y_-1] != 'X')) {
            going.push({x_, y_-1});
            visited[x_][y_-1] = true;
        }
        // going down
        if((y_ + 1 < m) && !(visited[x_][y_+1]) && (campus[x_][y_+1] != 'X')) {
            going.push({x_, y_+1});
            visited[x_][y_+1] = true;
        }
        // going left
        if((x_ - 1 >= 0) && !(visited[x_-1][y_]) && (campus[x_-1][y_] != 'X')) {
            going.push({x_-1, y_});
            visited[x_-1][y_] = true;
        }
        // going right
        if((x_ + 1 < n) && !(visited[x_+1][y_]) && (campus[x_+1][y_] != 'X')) {
            going.push({x_+1, y_});
            visited[x_+1][y_] = true;
        }
    }

    return friends;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    
    int n, m;
    cin >> n >> m;

    int x, y;  // 도연이의 위치를 기록해두기 위한 변수

    char **campus = new char*[n];
    string line;
    for(int i = 0 ; i < n ; i++) {
        cin >> line;
        campus[i] = new char[m];
        for(int j = 0 ; j < m ; j++) {
            campus[i][j] = line[j];
            if(line[j] == 'I') {
                x = i;
                y = j;
            }
        }
    }

    int friends = findFriends(campus, n, m, x, y);
    
    cout << (friends == 0 ? "TT" : to_string(friends));
}
```

[def]: https://www.acmicpc.net/problem/21736