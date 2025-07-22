---
layout: post
title: "[데일리 백준] 12886"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon, HappyBirthday]

toc: true

date: 2025-07-22
last_modified_at: 2025-07-22
---
## Gold
### [12886][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct State {
    int a, b, c;
} State;

bool bfs(State& s, vector<vector<bool>>& visited, int max) {
    queue<State> q;
    q.push(s);
    while(!q.empty()) {
        State current = q.front();
        q.pop();
        int a = current.a, b = current.b, c = current.c;
        if(a == b && b == c) return true;
        if(a-b > 0 && b+b < max && !visited[a-b][b+b]) {
            visited[a-b][b+b] = true;
            q.push({a-b, b+b, c});
        }
        if(a-c > 0 && c+c < max && !visited[a-c][c+c]) {
            visited[a-c][c+c] = true;
            q.push({a-c, b, c+c});
        }
        if(b-a > 0 && a+a < max && !visited[a+a][b-a]) {
            visited[a+a][b-a] = true;
            q.push({a+a, b-a, c});
        }
        if(b-c > 0 && c+c < max && !visited[a][b-c]) {
            visited[b-c][c+c] = true;
            q.push({a, b-c, c+c});
        }
        if(c-a > 0 && a+a < max && !visited[a+a][c-a]) {
            visited[a+a][c-a] = true;
            q.push({a+a, b, c-a});
        }
        if(c-b > 0 && b+b < max && !visited[b+b][c-b]) {
            visited[b+b][c-b] = true;
            q.push({a, b+b, c-b});
        }
    }
    return false;
}

int main() {
    State s;
    cin >> s.a >> s.b >> s.c;
    int max = std::max(s.a, std::max(s.b, s.c))<<1 + 1;
    vector<vector<bool>> visited(max, vector<bool>(max, false));
    cout << bfs(s, visited, max);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS

- 상태 기반 visited가 아닌 변경(이동) 기반 visited로 메모리 문제 해결

</div>
</details>

[def]: https://www.acmicpc.net/problem/12886