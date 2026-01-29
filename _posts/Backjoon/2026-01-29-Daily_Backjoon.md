---
layout: post
title: "[데일리 백준] 4963"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2026-01-29
last_modified_at: 2026-01-29
---
## Silver
### [4963][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Place {
    int x;
    int y;
    bool isLand;
    bool visited = false;
};

int bfs(vector<vector<Place>>& map, int h, int w) {
    vector<pair<int, int>> adjacents(8);
    adjacents[0] = {-1, -1}; adjacents[1] = {-1, 0}; adjacents[2] = {-1, 1};
    adjacents[3] = {0, -1}; adjacents[4] = {0, 1};
    adjacents[5] = {1, -1}; adjacents[6] = {1, 0}; adjacents[7] = {1, 1};
    int count = 0;
    for(int i = 0 ; i < h ; i++) {
        for(int j = 0 ; j < w ; j++) {
            if(map[i][j].isLand && !map[i][j].visited) {
                count++;
                queue<Place*> q;
                q.push(&map[i][j]);
                map[i][j].visited = true;
                while(!q.empty()) {
                    Place* p = q.front();
                    q.pop();
                    for(pair<int, int>& adjacent : adjacents) {
                        int dx = p->x + adjacent.first;
                        int dy = p->y + adjacent.second;
                        if(dx < 0 || dx >= h || dy < 0 || dy >= w) continue;
                        if(map[dx][dy].isLand && !map[dx][dy].visited) {
                            map[dx][dy].visited = true;
                            q.push(&map[dx][dy]);
                        }
                    }
                }
            }
        }
    }
    return count;
}

int main() {
    int w, h;
    while(cin >> w >> h) {
        if(!w && !h) break;
        vector<vector<Place>> map(h, vector<Place>(w));
        for(int i = 0 ; i < h ; i++) {
            for(int j = 0 ; j < w ; j++) {
                map[i][j].x = i;
                map[i][j].y = j;
                cin >> map[i][j].isLand;
            }
        }
        int count = bfs(map, h, w);
        cout << count << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Graph traversal (BFS)

</div>
</details>

[def]: https://www.acmicpc.net/problem/4963