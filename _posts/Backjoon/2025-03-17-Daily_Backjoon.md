---
layout: post
title: "[데일리 백준] 16958"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-17
last_modified_at: 2025-03-17
---
## Gold
### [16958][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct City {
    int x;
    int y;
    bool teleport;
} City;

int distance(const City& c1, const City& c2) {
    return abs(c1.x - c2.x) + abs(c1.y - c2.y);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, t;
    cin >> n >> t;
    vector<City> cities(n);
    int teleport, x, y;
    for(int i = 0 ; i < n ; i++) {
        cin >> cities[i].teleport >> cities[i].x >> cities[i].y;
    }
    vector<int> shortest(n, INT32_MAX);
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            if(cities[j].teleport) {
                shortest[i] = min(shortest[i], distance(cities[i], cities[j]));
                continue;
            }
        }
    }
    int m;
    cin >> m;
    int a, b;
    while(m--) {
        cin >> a >> b;
        a--; b--;  // 0-based index
        cout << min(distance(cities[a], cities[b]), shortest[a] + shortest[b] + t) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 최단 경로

- Floyd-Warshall 을 사용하면, 시간이 급격히 늘어난다. (불필요) but pass.

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct City {
    int x;
    int y;
    bool teleport;
} City;

int distance(const City& c1, const City& c2) {
    return abs(c1.x - c2.x) + abs(c1.y - c2.y);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, t;
    cin >> n >> t;
    vector<City> cities(n);
    int teleport, x, y;
    for(int i = 0 ; i < n ; i++) {
        cin >> cities[i].teleport >> cities[i].x >> cities[i].y;
    }
    vector<vector<int>> adjacency(n, vector<int>(n, 0));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            if(i == j) continue;
            if(cities[i].teleport && cities[j].teleport) {
                adjacency[i][j] = adjacency[j][i] = min(t, distance(cities[i], cities[j]));
                continue;
            }
            adjacency[i][j] = adjacency[j][i] = distance(cities[i], cities[j]);
        }
    }
    for(int k = 0 ; k < n ; k++) {
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < n ; j++) {
                if(i == j) continue;
                adjacency[i][j] = min(adjacency[i][j], adjacency[i][k] + adjacency[k][j]);
            }
        }
    }
    int m;
    cin >> m;
    int a, b;
    while(m--) {
        cin >> a >> b;
        cout << adjacency[a-1][b-1] << '\n';
    }
}
```

</div>
</details>

[def]: https://www.acmicpc.net/problem/16958