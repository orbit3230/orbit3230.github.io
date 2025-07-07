---
layout: post
title: "[데일리 백준] 9205"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-07
last_modified_at: 2025-07-07
---
## Gold
### [9205][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define THRESH 1000
using namespace std;

typedef struct Point {
    int x;
    int y;
    bool visited = false;
    vector<Point*> nexts;
} Point;

int distance(const Point& a, const Point& b) {
    return abs(a.x - b.x) + abs(a.y - b.y);
}
void findNexts(Point& start, vector<Point>& conv, Point& end, int n) {
    vector<Point*> points;
    points.push_back(&start);
    for(Point& p : conv) points.push_back(&p);
    points.push_back(&end);
    for(int i = 0 ; i < n ; i++) {
        for(int j = i+1 ; j < n ; j++) {
            if(distance(*points[i], *points[j]) <= THRESH) {
                points[i]->nexts.push_back(points[j]);
                points[j]->nexts.push_back(points[i]);
            }
        }
    }
}

bool bfs(Point& start, Point& end) {
    queue<Point*> q;
    q.push(&start);
    start.visited = true;
    while(!q.empty()) {
        Point* p = q.front();
        q.pop();
        if(p == &end) return true;
        for(Point* next : p->nexts) {
            if(!next->visited) {
                next->visited = true;
                q.push(next);
            }
        }
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int n;
        cin >> n;
        Point start;
        vector<Point> conv(n);
        Point end;
        cin >> start.x >> start.y;
        for(int i = 0; i < n; i++) cin >> conv[i].x >> conv[i].y;
        cin >> end.x >> end.y;
        findNexts(start, conv, end, n+2);
        cout << (bfs(start, end) ? "happy\n" : "sad\n");
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그래프 탐색

</div>
</details>

[def]: https://www.acmicpc.net/problem/9205