---
layout: post
title: "[데일리 백준] 14502"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-06
last_modified_at: 2024-07-06
---
## Gold
### [14502][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Virus {
    int x;
    int y;
} Virus;


// 바이러스 확산(BFS)후, 안전구역의 크기를 반환
int spreadVirus(vector<vector<int>> map, int n, int m, vector<Virus> viruses) {
    queue<Virus> q;
    for(Virus virus : viruses) {
        q.push(virus);
    }
    Virus virus;
    int x_, y_;
    while(!q.empty()) {
        virus = q.front();
        q.pop();
        x_ = virus.x;
        y_ = virus.y;
        if(x_ > 0 && map[x_-1][y_] == 0) {
            map[x_-1][y_] = 2;
            q.push({x_-1, y_});
        }
        if(x_ < n-1 && map[x_+1][y_] == 0) {
            map[x_+1][y_] = 2;
            q.push({x_+1, y_});
        }
        if(y_ > 0 && map[x_][y_-1] == 0) {
            map[x_][y_-1] = 2;
            q.push({x_, y_-1});
        }
        if(y_ < m-1 && map[x_][y_+1] == 0) {
            map[x_][y_+1] = 2;
            q.push({x_, y_+1});
        }
    }
    // 확산 끝. 안전구역 크기 계산
    int safe = 0;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            if(map[i][j] == 0) {
                safe++;
            }
        }
    }
    return safe;
}
int setWalls(vector<vector<int>> map, int n, int m, int first, int second, int third, vector<Virus> viruses) {
    int count = -1;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            if(map[i][j] == 0) {
                count++;
                if(count == first || count == second || count == third) {
                    map[i][j] = 1;
                }
            }
        }
    }
    return spreadVirus(map, n, m, viruses);
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> map(n, vector<int>(m));

    int safes = 0;
    vector<Virus> viruses;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            cin >> map[i][j];
            if(map[i][j] == 0) safes++;
            if(map[i][j] == 2) {
                viruses.push_back({i, j});
            }
        }
    }

    // 벽을 세우는 모든 경우의 수를 따질 것임.
    int maxSafe = 0;
    int safe;
    for(int i = 0 ; i < safes-2 ; i++) {
        for(int j = 0 ; j < safes - 1 ; j++) {
            for(int k = 0 ; k < safes ; k++) {
                if(i == j || j == k || i == k) continue;
                // 아래 함수에서 벽을 세우고 바이러스 확산 & 안전구역 크기 계산까지 모두 수행
                safe = setWalls(map, n, m, i, j, k, viruses);
                if(safe > maxSafe) {
                    maxSafe = safe;
                }
            }
        }
    }

    cout << maxSafe << endl;
}                     
```

[def]: https://www.acmicpc.net/problem/14502