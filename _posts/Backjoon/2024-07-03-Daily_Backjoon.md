---
layout: post
title: "[데일리 백준] 14938, 7569"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-03
last_modified_at: 2024-07-03
---
## Gold
### [14938][def2]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Node;

typedef struct Link {
    int distance;
    Node* arrival;
} Link;

typedef struct Node {
    int items;
    int index;
    vector<Link> links;
} Node;

int farming(vector<Node*> nodes, int start, int area) {
    vector<int> visited(nodes.size(), -1);
    int getItems = 0;

    queue<Node*> q;
    q.push(nodes[start]);
    visited[start] = 0;
    getItems += nodes[start]->items;

    Node* current;
    while(!q.empty()) {
        current = q.front();
        q.pop();
        for(Link link : current->links) {
            // 이동 가능한 범위 내에 있는 경우,
            if(visited[current->index] + link.distance <= area) {
                // 아직 방문하지 않았다면 아이템을 줍는다.
                if(visited[link.arrival->index] == -1) {
                    q.push(link.arrival);
                    getItems += link.arrival->items;
                    visited[link.arrival->index] = visited[current->index] + link.distance;
                }
                // 이미 방문한 적 있다면, 아이템은 이미 주웠으므로 다음 지역으로 넘어가자.
                else {
                    // 그런데, 이번 경로가 이전 경로보다 더 빠르다면, 거리를 업데이트한다.
                    if(visited[link.arrival->index] > visited[current->index] + link.distance) {
                        visited[link.arrival->index] = visited[current->index] + link.distance;
                        q.push(link.arrival);
                    }
                }
            }
        }
    }

    return getItems;
}

int main() {
    int n, m, r;
    cin >> n >> m >> r;

    vector<Node*> nodes;
    for(int i = 0 ; i < n ; i++) {
        int items;
        cin >> items;
        Node* node = new Node{items, i};
        nodes.push_back(node);
    }

    for(int i = 0 ; i < r ; i++) {
        int from, to, distance;
        cin >> from >> to >> distance;
        from--; to--;  // index starts from 0
        // 양방향이므로
        nodes[from]->links.push_back(Link{distance, nodes[to]});
        nodes[to]->links.push_back(Link{distance, nodes[from]});
    }

    int maxItems = 0;
    for(int i = 0 ; i < n ; i++) {
        int items = farming(nodes, i, m);
        if(items > maxItems)
            maxItems = items;
    }

    cout << maxItems;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 이미 털었던 집이라도, 한 번 더 들어가는건 내 자유잖아요.

</div>
</details> 

### [7569][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Tomato {
    int z;
    int x;
    int y;
    int days;
} Tomato;

// 토마토가 다 익었는지 확인하는 메소드.
// 다 익었다면 가장 오래 걸린 토마토의 일수를 반환
// 그렇지 않은 것이 있다면 -1을 반환
int checkAllRipen(const vector<vector<vector<int>>>& box, const vector<vector<vector<bool>>>& visited, int n, int m, int h) {
    int max = 0;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            for(int k = 0 ; k < h ; k++) {
                if(!visited[k][i][j] && box[k][i][j] == 0) {
                    return -1;
                }
                if(box[k][i][j] > max)
                    max = box[k][i][j];
            }
        }
    }
    return max;
}

int ripe(vector<vector<vector<int>>>& box, const vector<Tomato>& tomatoes, int n, int m, int h) {
    vector<vector<vector<bool>>> visited(h, vector<vector<bool>>(n, vector<bool>(m)));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            for(int k = 0 ; k < h ; k++) {
                visited[k][i][j] = false;
            }
        }
    }
    queue<Tomato> q;
    for(auto tomato : tomatoes) {
        q.push(tomato);
        visited[tomato.z][tomato.x][tomato.y] = true;
        box[tomato.z][tomato.x][tomato.y] = 0;
    }

    int x_;
    int y_;
    int z_;
    int days_;
    Tomato t;
    while(!q.empty()) {
        t = q.front();
        q.pop();
        x_ = t.x;
        y_ = t.y;
        z_ = t.z;
        days_ = t.days;
        if(x_ - 1 >= 0 && !visited[z_][x_ - 1][y_] && box[z_][x_ - 1][y_] == 0) {
            q.push({z_, x_ - 1, y_, days_ + 1});
            visited[z_][x_ - 1][y_] = true;
            box[z_][x_ - 1][y_] = days_ + 1;
        }
        if(x_ + 1 < n && !visited[z_][x_ + 1][y_] && box[z_][x_ + 1][y_] == 0) {
            q.push({z_, x_ + 1, y_, days_ + 1});
            visited[z_][x_ + 1][y_] = true;
            box[z_][x_ + 1][y_] = days_ + 1;
        }
        if(y_ - 1 >= 0 && !visited[z_][x_][y_ - 1] && box[z_][x_][y_ - 1] == 0) {
            q.push({z_, x_, y_ - 1, days_ + 1});
            visited[z_][x_][y_ - 1] = true;
            box[z_][x_][y_ - 1] = days_ + 1;
        }
        if(y_ + 1 < m && !visited[z_][x_][y_ + 1] && box[z_][x_][y_ + 1] == 0) {
            q.push({z_, x_, y_ + 1, days_ + 1});
            visited[z_][x_][y_ + 1] = true;
            box[z_][x_][y_ + 1] = days_ + 1;
        }
        if(z_ - 1 >= 0 && !visited[z_ - 1][x_][y_] && box[z_ - 1][x_][y_] == 0) {
            q.push({z_ - 1, x_, y_, days_ + 1});
            visited[z_ - 1][x_][y_] = true;
            box[z_ - 1][x_][y_] = days_ + 1;
        }
        if(z_ + 1 < h && !visited[z_ + 1][x_][y_] && box[z_ + 1][x_][y_] == 0) {
            q.push({z_ + 1, x_, y_, days_ + 1});
            visited[z_ + 1][x_][y_] = true;
            box[z_ + 1][x_][y_] = days_ + 1;
        }
    }

    return checkAllRipen(box, visited, n, m, h);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int m, n, h;
    cin >> m >> n >> h;

    vector<vector<vector<int>>> box(h, vector<vector<int>>(n, vector<int>(m)));
    vector<Tomato> tomatoes;
    for(int i = 0; i < h; i++) {
        for(int j = 0; j < n; j++) {
            for(int k = 0; k < m; k++) {
                cin >> box[i][j][k];
                if(box[i][j][k] == 1) {
                    tomatoes.push_back({i, j, k, 0});
                }
            }
        }
    }

    cout << ripe(box, tomatoes, n, m, h);
}                                                     
```

[def]: https://www.acmicpc.net/problem/7569
[def2]: https://www.acmicpc.net/problem/14938