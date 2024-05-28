---
layout: post
title: "[데일리 백준] 1485"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-28
last_modified_at: 2024-05-28
---
## Silver
### [1485][def]

```c++
#include <iostream>
#include <cmath>
using namespace std;

typedef struct Point {
    double x, y;
} Point;

int checkSquare(Point *p) {
    // 정사각형을 판별하는 알고리즘 구상.
    // 대각선이 서로 수직이고 길이가 같아야 함.
    // 우선 대각선을 찾아보자. 어느 두 점을 이었을 때 가장 긴 선이 대각선이다.
    double dist[6];
    int index = 0;
    for(int i = 0 ; i < 4 ; i++) {
        for(int j = i + 1 ; j < 4 ; j++) {
            dist[index] = sqrt(pow(p[i].x - p[j].x, 2) + pow(p[i].y - p[j].y, 2));
            index++;
        }
    }
    double max_dist = 0;
    int diagA_vertex_from = 0, diagA_vertex_to = 0;
    for(int i = 0 ; i < 4 ; i++) {
        for(int j = i + 1 ; j < 4 ; j++) {
            int index = (i == 0) ? i + j - 1 : i + j;
            if(dist[index] > max_dist) {
                max_dist = dist[index];
                diagA_vertex_from = i;
                diagA_vertex_to = j;
            }
        }
    }
    int diagB_vertex_from = 0, diagB_vertex_to = 0;
    // 발견한 대각선을 제외한 나머지 두 점을 찾아보자. (다른 대각선)
    for(int i = 0 ; i < 4 ; i++) {
        if(i == diagA_vertex_from || i == diagA_vertex_to) continue;
        if(diagB_vertex_from == 0) diagB_vertex_from = i;
        else diagB_vertex_to = i;
    }
    // 대각선의 길이가 같은지 확인.
    double dist_A = sqrt(pow(p[diagA_vertex_from].x - p[diagA_vertex_to].x, 2) + pow(p[diagA_vertex_from].y - p[diagA_vertex_to].y, 2));
    double dist_B = sqrt(pow(p[diagB_vertex_from].x - p[diagB_vertex_to].x, 2) + pow(p[diagB_vertex_from].y - p[diagB_vertex_to].y, 2));
    if(dist_A != dist_B) return 0;

    // 대각선이 수직인지 확인.
    double diff_x_A = p[diagA_vertex_from].x - p[diagA_vertex_to].x;
    double diff_y_A = p[diagA_vertex_from].y - p[diagA_vertex_to].y;
    double diff_x_B = p[diagB_vertex_from].x - p[diagB_vertex_to].x;
    double diff_y_B = p[diagB_vertex_from].y - p[diagB_vertex_to].y;

    double upper = diff_y_A * diff_y_B;
    double lower = diff_x_A * diff_x_B;
    if(upper + lower != 0) return 0;

    return 1;
}

int main() {
    int t;
    cin >> t;

    double x, y;
    Point p[4];
    for(int i = 0 ; i < t ; i++) {
        for(int vertex = 0 ; vertex < 4 ; vertex++) {
            cin >> x >> y;
            p[vertex].x = x;
            p[vertex].y = y;
        }

        cout << checkSquare(p) << '\n';
    }
}
```

[def]: https://www.acmicpc.net/problem/1485