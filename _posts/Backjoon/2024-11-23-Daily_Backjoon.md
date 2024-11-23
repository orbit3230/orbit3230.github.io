---
layout: post
title: "[데일리 백준] 11779"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-23
last_modified_at: 2024-11-23
---
## Gold
### [11779][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX
using namespace std;

typedef struct Bus {
    int from;
    int to;
    int cost;
} Bus;
typedef struct City {
    int path = INF;
    vector<int> minimum_path;
    vector<Bus*> buses;
} City;

void dijkstra(vector<City>& cities, int start) {
    // {weight, destination}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, start});
    while(!pq.empty()) {
        int weight = pq.top().first;
        int index = pq.top().second;
        pq.pop();
        if(weight > cities[index].path) continue;
        for(Bus* b : cities[index].buses) {
            int origin_path = cities[b->to].path;
            int new_path = cities[index].path + b->cost;
            if(new_path < origin_path) {
                cities[b->to].path = new_path;
                vector<int> new_minimum_path = cities[index].minimum_path;
                new_minimum_path.push_back(b->to);
                cities[b->to].minimum_path = new_minimum_path;
                pq.push({new_path, b->to});
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<City> cities(n+1);
    vector<Bus> buses(m+1);
    for(int i = 1 ; i <= m ; i++) {
        cin >> buses[i].from >> buses[i].to >> buses[i].cost;
        cities[buses[i].from].buses.push_back(&buses[i]);
    }
    int start, destination;
    cin >> start >> destination;
    cities[start].path = 0;
    cities[start].minimum_path.push_back(start);
    dijkstra(cities, start);
    cout << cities[destination].path << '\n';
    cout << cities[destination].minimum_path.size() << '\n';
    for(int i : cities[destination].minimum_path) {
        cout << i << ' ';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다익스트라 알고리즘

- 역추적이 추가되었다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/11779