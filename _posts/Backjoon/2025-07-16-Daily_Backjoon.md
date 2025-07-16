---
layout: post
title: "[데일리 백준] 1774"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-16
last_modified_at: 2025-07-16
---
## Gold
### [1774][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
#include <iomanip>
using namespace std;

typedef struct Point {
    int x;
    int y;
    int index;
    int parent;
} Point;
typedef struct Edge {
    int from;
    int to;
    double distance;
} Edge;

bool compare(const Edge& a, const Edge& b) {
    return a.distance < b.distance;
}
double distance(const Point& a, const Point& b) {
    return sqrt((double)(a.x - b.x) * (a.x - b.x) + (double)(a.y - b.y) * (a.y - b.y));
}
int find(vector<Point>& points, Point& p) {
    if(p.parent == p.index) return p.index;
    return p.parent = find(points, points[p.parent]);
}
bool unionFind(vector<Point>& points, Point& a, Point& b) {
    int rootA = find(points, a);
    int rootB = find(points, b);
    if(rootA == rootB) return true;
    points[rootB].parent = rootA;
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Point> points(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> points[i].x >> points[i].y;
        points[i].index = i;
        points[i].parent = i;
    }
    int from, to;
    int count = 0;
    // already connected
    while(m--) {
        cin >> from >> to;
        from--; to--;  // 0-based index
        if(!unionFind(points, points[from], points[to])) count++;
    }
    vector<Edge> edges;
    for(int i = 0 ; i < n ; i++) {
        for(int j = i+1 ; j < n ; j++) {
            edges.push_back({i, j, distance(points[i], points[j])});
        }
    }
    int size = edges.size();
    sort(edges.begin(), edges.end(), compare);
    double result = 0.0;
    int index = 0;
    int nMinus1 = n-1;
    while(count != nMinus1) {
        Edge& edge = edges[index++];
        if(!unionFind(points, points[edge.from], points[edge.to])) {
            result += edge.distance;
            count++;
        }
    }
    cout << fixed << setprecision(2) << result;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- MST

</div>
</details>

[def]: https://www.acmicpc.net/problem/1774