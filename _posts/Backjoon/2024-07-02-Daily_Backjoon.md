---
layout: post
title: "[데일리 백준] 7576"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-02
last_modified_at: 2024-07-02
---
## Gold
### [7576][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Tomato {
    int x;
    int y;
    int days;
} Tomato;

// 토마토가 다 익었는지 확인하는 메소드.
// 다 익었다면 가장 오래 걸린 토마토의 일수를 반환
// 그렇지 않은 것이 있다면 -1을 반환
int checkAllRipen(const vector<vector<int>>& box, const vector<vector<bool>>& visited, int n, int m) {
    int max = 0;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            if(!visited[i][j] && box[i][j] == 0) {
                return -1;
            }
            if(box[i][j] > max)
                max = box[i][j];
        }
    }
    return max;
}

int ripe(vector<vector<int>>& box, const vector<Tomato>& tomatoes, int n, int m) {
    vector<vector<bool>> visited(n, vector<bool>(m));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            visited[i][j] = false;
        }
    }
    queue<Tomato> q;
    for(auto tomato : tomatoes) {
        q.push(tomato);
        visited[tomato.x][tomato.y] = true;
        box[tomato.x][tomato.y] = 0;
    }

    int x_;
    int y_;
    int days_;
    Tomato t;
    while(!q.empty()) {
        t = q.front();
        q.pop();
        x_ = t.x;
        y_ = t.y;
        days_ = t.days;
        if(x_ - 1 >= 0 && !visited[x_ - 1][y_] && box[x_ - 1][y_] == 0) {
            q.push({x_ - 1, y_, days_ + 1});
            visited[x_ - 1][y_] = true;
            box[x_ - 1][y_] = days_ + 1;
        }
        if(x_ + 1 < n && !visited[x_ + 1][y_] && box[x_ + 1][y_] == 0) {
            q.push({x_ + 1, y_, days_ + 1});
            visited[x_ + 1][y_] = true;
            box[x_ + 1][y_] = days_ + 1;
        }
        if(y_ - 1 >= 0 && !visited[x_][y_ - 1] && box[x_][y_ - 1] == 0) {
            q.push({x_, y_ - 1, days_ + 1});
            visited[x_][y_ - 1] = true;
            box[x_][y_ - 1] = days_ + 1;
        }
        if(y_ + 1 < m && !visited[x_][y_ + 1] && box[x_][y_ + 1] == 0) {
            q.push({x_, y_ + 1, days_ + 1});
            visited[x_][y_ + 1] = true;
            box[x_][y_ + 1] = days_ + 1;
        }
    }

    return checkAllRipen(box, visited, n, m);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int m, n;
    cin >> m >> n;

    vector<vector<int>> box(n, vector<int>(m));
    vector<Tomato> tomatoes;
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < m; j++) {
            cin >> box[i][j];
            if(box[i][j] == 1) {
                tomatoes.push_back({i, j, 0});
            }
        }
    }

    cout << ripe(box, tomatoes, n, m);
}                           
```

[def]: https://www.acmicpc.net/problem/7576