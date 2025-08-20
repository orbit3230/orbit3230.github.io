---
layout: post
title: "[데일리 백준] 2573"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-08-20
last_modified_at: 2025-08-20
---
## Gold
### [2573][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Ice {
    int x;
    int y;
    int height;
    int will_melt;
    bool removed = false;
    bool visited = false;
};

void timeflows(vector<vector<Ice>>& map, vector<Ice*>& ices, int& number_of_ices, int n, int m) {
    int adjacent;
    for(Ice* ice : ices) {
        if(ice->removed) continue;
        adjacent = 0;
        int x = ice->x; int y = ice->y;
        if(x > 0 && map[x-1][y].removed) adjacent++;
        if(x < n-1 && map[x+1][y].removed) adjacent++;
        if(y > 0 && map[x][y-1].removed) adjacent++;
        if(y < m-1 && map[x][y+1].removed) adjacent++;
        ice->will_melt = adjacent;
    }
    for(Ice* ice : ices) {
        if(ice->removed) continue;
        ice->height -= ice->will_melt;
        if(ice->height <= 0) {
            ice->removed = true;
            number_of_ices--;
        }
    }
}
bool isDiscontinued(vector<vector<Ice>>& map, vector<Ice*>& ices, int number_of_ices, int n, int m) {
    if(!number_of_ices) return true;
    Ice* start;
    for(Ice* ice : ices) {
        if(!ice->removed) {
            start = ice;
            break;
        }
    }
    queue<Ice*> q;
    q.push(start);
    start->visited = true;
    int count = 0;
    while(!q.empty()) {
        Ice* ice = q.front();
        q.pop();
        count++;
        int x = ice->x; int y = ice->y;
        if(x > 0 && !map[x-1][y].visited && !map[x-1][y].removed) {
            q.push(&map[x-1][y]);
            map[x-1][y].visited = true;
        }
        if(x < n-1 && !map[x+1][y].visited && !map[x+1][y].removed) {
            q.push(&map[x+1][y]);
            map[x+1][y].visited = true;
        }
        if(y > 0 && !map[x][y-1].visited && !map[x][y-1].removed) {
            q.push(&map[x][y-1]);
            map[x][y-1].visited = true;
        }
        if(y < m-1 && !map[x][y+1].visited && !map[x][y+1].removed) {
            q.push(&map[x][y+1]);
            map[x][y+1].visited = true;
        }
    }
    return count != number_of_ices;
}
void visitedInit(vector<Ice*>& ices) { for(Ice* ice : ices) ice->visited = false; }

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<Ice>> map(n, vector<Ice>(m));
    vector<Ice*> ices;
    int height;
    int number_of_ices = 0;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            map[i][j].x = i; map[i][j].y = j;
            cin >> map[i][j].height;
            if(map[i][j].height) {  // is Ice
                ices.push_back(&map[i][j]);
                number_of_ices++;
                continue;
            }
            map[i][j].removed = true;  // is not Ice
        }
    }
    int time = 0;
    while(true) {
        if(isDiscontinued(map, ices, number_of_ices, n, m)) break;
        visitedInit(ices);
        time++;
        timeflows(map, ices, number_of_ices, n, m);
        if (!number_of_ices) {
            cout << 0;
            return 0;
        }
    }
    cout << time;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS + Simulation

</div>
</details>

[def]: https://www.acmicpc.net/problem/2573