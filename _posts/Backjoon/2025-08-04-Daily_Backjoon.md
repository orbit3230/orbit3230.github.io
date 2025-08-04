---
layout: post
title: "[데일리 백준] 11909"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-08-04
last_modified_at: 2025-08-04
---
## Gold
### [11909][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX >> 1
using namespace std;

typedef struct Place {
    int x, y;
    int cost = INF;
    int value;
} Place;

void dijkstra(vector<vector<Place>>& map, Place* start, int n) {
    // cost, place
    priority_queue<pair<int, Place*>, vector<pair<int, Place*>>, greater<pair<int, Place*>>> q;
    q.push({0, start});
    while(!q.empty()) {
        int cost = q.top().first;
        Place* place = q.top().second;
        q.pop();
        int x = place->x; int y = place->y;
        if(place->cost < cost) continue;
        if(x < n-1) {
            Place* next = &map[x+1][y];
            int originCost = next->cost;
            int newCost = cost + (next->value-place->value < 0 ? 0 : next->value-place->value+1);
            if(newCost < originCost) {
                next->cost = newCost;
                q.push({newCost, next});
            }
        }
        if(y < n-1) {
            Place* next = &map[x][y+1];
            int originCost = next->cost;
            int newCost = cost + (next->value-place->value < 0 ? 0 : next->value-place->value+1);
            if(newCost < originCost) {
                next->cost = newCost;
                q.push({newCost, next});
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<vector<Place>> map(n, vector<Place>(n));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> map[i][j].value;
            map[i][j].x = i;
            map[i][j].y = j;
        }
    }
    map[0][0].cost = 0;
    dijkstra(map, &map[0][0], n);
    cout << map[n-1][n-1].cost;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dijkstra

</div>
</details>

[def]: https://www.acmicpc.net/problem/11909