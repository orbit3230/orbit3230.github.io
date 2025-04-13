---
layout: post
title: "[데일리 백준] 6593"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-13
last_modified_at: 2025-04-13
---
## Gold
### [6593][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Node {
    int x;
    int y;
    int z;
    int step = 0;
    bool visited;
} Node;

int bfs(vector<vector<vector<Node>>>& building, Node* start, Node* end, int l, int r, int c) {
    queue<Node*> q;
    q.push(start);
    start->visited = true;
    while(!q.empty()) {
        int x = q.front()->x;
        int y = q.front()->y;
        int z = q.front()->z;
        int step = q.front()->step;
        q.pop();
        if(x == end->x && y == end->y && z == end->z) return step;
        if(x > 0 && !building[z][x-1][y].visited) {
            q.push(&building[z][x-1][y]);
            building[z][x-1][y].visited = true;
            building[z][x-1][y].step = step + 1;
        }
        if(x < r-1 && !building[z][x+1][y].visited) {
            q.push(&building[z][x+1][y]);
            building[z][x+1][y].visited = true;
            building[z][x+1][y].step = step + 1;
        }
        if(y > 0 && !building[z][x][y-1].visited) {
            q.push(&building[z][x][y-1]);
            building[z][x][y-1].visited = true;
            building[z][x][y-1].step = step + 1;
        }
        if(y < c-1 && !building[z][x][y+1].visited) {
            q.push(&building[z][x][y+1]);
            building[z][x][y+1].visited = true;
            building[z][x][y+1].step = step + 1;
        }
        if(z > 0 && !building[z-1][x][y].visited) {
            q.push(&building[z-1][x][y]);
            building[z-1][x][y].visited = true;
            building[z-1][x][y].step = step + 1;
        }
        if(z < l-1 && !building[z+1][x][y].visited) {
            q.push(&building[z+1][x][y]);
            building[z+1][x][y].visited = true;
            building[z+1][x][y].step = step + 1;
        }
    }
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int l, r, c;
    while(cin >> l >> r >> c) {
        if(!l || !r || !c) break;
        vector<vector<vector<Node>>> building
        (l, vector<vector<Node>>(r, vector<Node>(c)));
        Node* start;
        Node* end;
        for(int i = 0 ; i < l ; i++) {
            for(int j = 0 ; j < r ; j++) {
                string input;
                cin >> input;
                for(int k = 0 ; k < c ; k++) {
                    building[i][j][k].x = j;
                    building[i][j][k].y = k;
                    building[i][j][k].z = i;
                    building[i][j][k].visited = false;
                    switch(input[k]) {
                        case '#' :
                            building[i][j][k].visited = true;
                            break;
                        case 'S' :
                            start = &building[i][j][k];
                            break;
                        case 'E' :
                            end = &building[i][j][k];
                            break;
                    }
                }
            }
        }
        int result = bfs(building, start, end, l, r, c);
        cout << (result == -1 ? "Trapped!\n" : "Escaped in " + to_string(result) + " minute(s).\n");
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 3D BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/6593