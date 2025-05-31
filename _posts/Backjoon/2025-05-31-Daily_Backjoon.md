---
layout: post
title: "[데일리 백준] 16234"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-31
last_modified_at: 2025-05-31
---
## Gold
### [16234][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Country {
    int x;
    int y;
    int population;
    bool visited;
} Country;

void bfs(vector<vector<Country>>& world, Country& start, int n, int l, int r) {
    queue<Country*> q;
    vector<Country*> traces;
    int sum = start.population;
    int count = 1;
    q.push(&start);
    traces.push_back(&start);
    start.visited = true;
    while(!q.empty()) {
        Country* next = q.front();
        int x = next->x;
        int y = next->y;
        int population = next->population;
        q.pop();
        if(x > 0 && !world[x-1][y].visited 
            && abs(population - world[x-1][y].population) >= l
            && abs(population - world[x-1][y].population) <= r) {
            q.push(&world[x-1][y]);
            traces.push_back(&world[x-1][y]);
            world[x-1][y].visited = true;
            sum += world[x-1][y].population;
            count++;
        }
        if(x < n-1 && !world[x+1][y].visited 
            && abs(population - world[x+1][y].population) >= l
            && abs(population - world[x+1][y].population) <= r) {
            q.push(&world[x+1][y]);
            traces.push_back(&world[x+1][y]);
            world[x+1][y].visited = true;
            sum += world[x+1][y].population;
            count++;
        }
        if(y > 0 && !world[x][y-1].visited 
            && abs(population - world[x][y-1].population) >= l
            && abs(population - world[x][y-1].population) <= r) {
            q.push(&world[x][y-1]);
            traces.push_back(&world[x][y-1]);
            world[x][y-1].visited = true;
            sum += world[x][y-1].population;
            count++;
        }
        if(y < n-1 && !world[x][y+1].visited 
            && abs(population - world[x][y+1].population) >= l
            && abs(population - world[x][y+1].population) <= r) {
            q.push(&world[x][y+1]);
            traces.push_back(&world[x][y+1]);
            world[x][y+1].visited = true;
            sum += world[x][y+1].population;
            count++;
        }
    }
    int mean = sum / count;
    for(Country* trace : traces) trace->population = mean;
}
bool check(vector<vector<Country>>& before, vector<vector<Country>>& after, int n) {
    bool flag = true;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            if(before[i][j].population != after[i][j].population) flag = false;
            after[i][j].visited = false;
        }
    }
    return flag;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, l, r;
    cin >> n >> l >> r;
    vector<vector<Country>> world(n, vector<Country>(n));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            world[i][j].x = i;
            world[i][j].y = j;
            cin >> world[i][j].population;
            world[i][j].visited = false;
        }
    }
    int days = 0;
    vector<vector<Country>> before_world;
    do {
        before_world = world;
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < n ; j++) {
                if(world[i][j].visited) continue;
                bfs(world, world[i][j], n, l, r);
            }
        }
        days++;
    } while(!check(before_world, world, n));
    cout << days-1;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS + Simulation

</div>
</details>

[def]: https://www.acmicpc.net/problem/16234