---
layout: post
title: "[데일리 백준] 1916"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-06
last_modified_at: 2024-11-06
---
## Gold
### [1916][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX
using namespace std;

typedef struct Bus {
    short from;
    short to;
    int weight;
} Bus;
typedef struct City {
    int path = INF;
    vector<Bus*> buses;
} City;

void dijkstra(vector<City>& cities, int start) { 
    // {weight, destination}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({cities[start].path, start});
    while(!pq.empty()) {
        int weight = pq.top().first;
        int index = pq.top().second;
        pq.pop();
        if(weight > cities[index].path) continue;
        for(Bus* b : cities[index].buses) {
            int origin_path = cities[b->to].path;
            int new_path = cities[index].path + b->weight;
            if(origin_path > new_path) {
                cities[b->to].path = new_path;
                pq.push({cities[b->to].path, b->to});
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Bus> buses(m);
    vector<City> cities(n+1);
    for(int i = 0 ; i < m ; i++) {
        cin >> buses[i].from >> buses[i].to >> buses[i].weight;
        cities[buses[i].from].buses.push_back(&buses[i]);
    }
    int start, end;
    cin >> start >> end;
    cities[start].path = 0;
    dijkstra(cities, start);
    cout << cities[end].path;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dijkstra Algorithm

- 배운 점
  - 우선순위 큐에서 꺼냈을 때, 집어넣었던 그 당시의 weight이 현재 갱신된 weight보다 크다면, optimalization이 1회 이상 이미 진행된 것이기 때문에 `continue` 하여 넘어갈 수 있다.  
  시간적으로 큰 절약.  
  따라서 [어제 자 포스팅][def2] 코드도 수정하였다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1916
[def2]: https://orbit3230.github.io/2024/11/05/Daily_Backjoon/