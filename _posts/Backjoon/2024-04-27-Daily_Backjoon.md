---
layout: post
title: "[데일리 백준] 2606"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-27
last_modified_at: 2024-04-27
---
## Silver
### [2606][def]

```c++
#include <iostream>
using namespace std;
// Incidence Matrix Checking (recursive)
void check(int graph[101][101], int virus[101], int vertex) {
    for(int i = 1; i < 101; i++) {
        if(graph[vertex][i] == 1 && virus[i] == 0) {
            virus[i] = 1;
            check(graph, virus, i);
        }
    }
}
// Incidence Matrix를 활용한 문제 풀이
int main() {
    int computers;
    int edges;

    cin >> computers >> edges;
    int graph[101][101] = {0, };
    int virus[101] = {0, };
    for(int i = 0; i < edges; i++) {
        int from, to;
        cin >> from >> to;
        graph[from][to] = 1;
        graph[to][from] = 1;
    }
    check(graph, virus, 1);

    int count = 0;
    for(int i = 2; i < 101; i++) {
        if(virus[i] == 1) {
            count++;
        }
    }
    cout << count;
}
```

[def]: https://www.acmicpc.net/problem/2606