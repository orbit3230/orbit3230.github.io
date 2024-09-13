---
layout: post
title: "[데일리 백준] 4386"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-13
last_modified_at: 2024-09-13
---
## Gold
### [4386][def]

```c++
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

typedef struct Star {
    double x;
    double y;
    int parent;
} Start;
typedef struct Edge {
    int from;
    int to;
    double distance;
} Edge;

bool compare(const Edge& e1, const Edge& e2) {
    return e1.distance < e2.distance;
}

int find(vector<Star>& stars, int index) {
    if(stars[index].parent == index) return index;
    return stars[index].parent = find(stars, stars[index].parent);
}
// 같은 집합에 속하면 true, 아니면 false
bool unionFind(vector<Star>& stars, int from, int to) {
    int fromRoot = find(stars, from);
    int toRoot = find(stars, to);
    if(fromRoot == toRoot) return true;
    stars[toRoot].parent = fromRoot;
    return false;
}

int main() {
    int n;
    cin >> n;
    vector<Star> stars(n);
    vector<Edge> edges;
    for(int to = 0 ; to < n ; to++) {
        cin >> stars[to].x >> stars[to].y;
        stars[to].parent = to;
        for(int from = 0 ; from < to ; from++) {
            Edge e;
            e.from = from;
            e.to = to;
            e.distance = sqrt(pow(stars[from].x - stars[to].x, 2) + pow(stars[from].y - stars[to].y, 2));
            edges.push_back(e);
        }
    }
    sort(edges.begin(), edges.end(), compare);

    double distanceSum = 0.0;
    int count = 1;
    int index = 0;
    Edge e;
    while(count <= n-1) {
        e = edges[index++];
        if(!unionFind(stars, e.from, e.to)) {
            distanceSum += e.distance;
            count++;
        }
    }
    cout << distanceSum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 최소 스패닝 트리 문제.  

- Union-Find에서 parent를 재설정하는 부분을 또 실수했다.  
`stars[toRoot].parent = fromRoot`

</div>
</details>

[def]: https://www.acmicpc.net/problem/4386