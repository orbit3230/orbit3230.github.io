---
layout: post
title: "[데일리 백준] 14226"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-03
last_modified_at: 2025-06-03
---
## Gold
### [14226][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Step {
    int clipboard;
    int current;
    int step;
} Step;

int bfs(Step& step, int s, vector<vector<bool>>& visited) {
    queue<Step> q;
    q.push(step);
    visited[step.clipboard][step.current] = true;
    while(!q.empty()) {
        int clipboard_ = q.front().clipboard;
        int current_ = q.front().current;
        int step_ = q.front().step;
        q.pop();
        if(current_ == s) return step_;
        if(current_ > s<<1) continue;
        // (1) Copy
        if(!visited[current_][current_]) {
            visited[current_][current_] = true;
            q.push({current_, current_, step_ + 1});
        }
        // (2) Paste
        if(!visited[clipboard_][current_ + clipboard_]) {
            visited[clipboard_][current_ + clipboard_] = true;
            q.push({clipboard_, current_ + clipboard_, step_ + 1});
        }
        // (3) Delete
        if(current_ > 1 && !visited[clipboard_][current_ - 1]) {
            visited[clipboard_][current_ - 1] = true;
            q.push({clipboard_, current_ - 1, step_ + 1});
        }
    }
}

int main() {
    int s;
    cin >> s;
    vector<vector<bool>> visited(s<<1+1, vector<bool>(s<<1+1, false));
    visited[0][1] = true;
    Step step = {0, 1, 0};
    cout << bfs(step, s, visited);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/14226