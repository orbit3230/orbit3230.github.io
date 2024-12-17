---
layout: post
title: "[데일리 백준] 1068, 14950, 4485, 12837, 2133"
excerpt: "5 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-17
last_modified_at: 2024-12-17
---
## Gold
- 시험 대비 5문제 풀이

### [1068][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Node {
    vector<Node*> children;
    int parent;
    int child_count = 0;
    bool deleted = false;
} Node;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<Node> tree(n);
    int parent;
    int root;
    for(int i = 0 ; i < n ; i++) {
        cin >> parent;
        if(parent != -1) {
            tree[parent].children.push_back(&tree[i]);
            tree[parent].child_count++;
            tree[i].parent = parent;
            continue;
        }
        root = i;
    }
    int erase;
    cin >> erase;
    tree[tree[erase].parent].child_count--;
    queue<Node*> q;
    q.push(&tree[erase]);
    while(!q.empty()) {
        Node* next = q.front();
        q.pop();
        next->deleted = true;
        for(Node* child : next->children) {
            q.push(child);
        }
    }
    int count = 0;
    for(Node& n : tree) {
        if(!n.child_count && !n.deleted) {
            count++;
            continue;
        }
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 간단한 트리 구현 문제

</div>
</details>

### [14950][def2]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Node {
    int index;
    int parent;
} Node;
typedef struct Edge {
    int from;
    int to;
    int cost;
} Edge;

int find(vector<Node>& nodes, Node& n) {
    if(n.index == n.parent) return n.index;
    return n.parent = find(nodes, nodes[n.parent]);
}
bool unionFind(vector<Node>& nodes, int a, int b) {
    int rootA = find(nodes, nodes[a]);
    int rootB = find(nodes, nodes[b]);
    if(rootA == rootB) return true;
    nodes[rootB].parent = rootA;
    return false;
}

bool compare(const Edge& e1, const Edge& e2) {
    return e1.cost < e2.cost;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m, t;
    cin >> n >> m >> t;
    vector<Node> nodes(n);
    for(int i = 0 ; i < n ; i++) nodes[i].index = nodes[i].parent = i;
    vector<Edge> edges(m);
    for(int i = 0 ; i < m ; i++) cin >> edges[i].from >> edges[i].to >> edges[i].cost;
    sort(edges.begin(), edges.end(), compare);
    
    int sum = 0;
    int count = 0;
    int index = 0;
    while(count != n-1) {
        Edge e = edges[index++];
        if(!unionFind(nodes, e.from-1, e.to-1)) {  // 0-based index;
            sum += e.cost + count*t;
            count++;
        }
    }
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 무난한 최소 스패닝 트리 문제

</div>
</details>

### [4485][def3]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX/2
using namespace std;

typedef struct Point {
    int x;
    int y;
    bool operator<(const Point& other) const {
        return true;  // 전혀 상관없음
    }
} Point;
typedef struct Node {
    int ruby;
    int path = INF;
} Node;

void dijkstra(vector<vector<Node>>& graph, int n) {
    priority_queue<pair<int, Point>, vector<pair<int, Point>>, greater<pair<int, Point>>> pq;
    pq.push({graph[0][0].path, {0, 0}});
    while(!pq.empty()) {
        int path = pq.top().first;
        Point point = pq.top().second;
        int x = point.x; int y = point.y;
        pq.pop();
        if(path > graph[x][y].path) continue;
        if(x < n-1) {
            int originPath = graph[x+1][y].path;
            int newPath = graph[x][y].path + graph[x+1][y].ruby;
            if(originPath > newPath) {
                graph[x+1][y].path = newPath;
                pq.push({newPath, {x+1, y}});
            }
        }
        if(x > 0) {
            int originPath = graph[x-1][y].path;
            int newPath = graph[x][y].path + graph[x-1][y].ruby;
            if(originPath > newPath) {
                graph[x-1][y].path = newPath;
                pq.push({newPath, {x-1, y}});
            }
        }
        if(y < n-1) {
            int originPath = graph[x][y+1].path;
            int newPath = graph[x][y].path + graph[x][y+1].ruby;
            if(originPath > newPath) {
                graph[x][y+1].path = newPath;
                pq.push({newPath, {x, y+1}});
            }
        }
        if(y > 0) {
            int originPath = graph[x][y-1].path;
            int newPath = graph[x][y].path + graph[x][y-1].ruby;
            if(originPath > newPath) {
                graph[x][y-1].path = newPath;
                pq.push({newPath, {x, y-1}});
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    int count = 0;
    while(cin >> n) {
        if(!n) break;
        vector<vector<Node>> graph(n, vector<Node>(n));
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < n ; j++) cin >> graph[i][j].ruby;
        }
        graph[0][0].path = graph[0][0].ruby;
        dijkstra(graph, n);
        cout << "Problem " << ++count << ": " << graph[n-1][n-1].path << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 무난한 다익스트라 문제

- 행렬로 입력이 주어지면 얼타기 쉽다.  

</div>
</details>

### [12837][def4]

```c++
#include <iostream>
#include <vector>
using namespace std;

void update(vector<long long>& segtree, int index, int value) {
    segtree[index] += value;
    index >>= 1;
    while(index) {
        segtree[index] = segtree[index<<1] + segtree[(index<<1)+1];
        index >>= 1;
    }
}
long long getSum(vector<long long>& segtree, int a, int b, int start, int end, int index) {
    if(end < a || b < start) return 0;
    if(a <= start && end <= b) return segtree[index];
    int mid = (start + end) / 2;
    return getSum(segtree, a, b, start, mid, index<<1) + getSum(segtree, a, b, mid+1, end, (index<<1)+1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, q;
    cin >> n >> q;
    int size = 1;
    while(size < n) size <<= 1;
    size <<= 1;
    vector<long long> segtree(size, 0);
    int leafIndex = size >> 1;

    int type, a, b;
    while(q--) {
        cin >> type >> a >> b;
        if(!(--type)) {
            update(segtree, leafIndex+a-1, b);
            continue;
        }
        cout << getSum(segtree, a, b, 1, leafIndex, 1) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 무난한 세그먼트 트리 문제

- 문제를 제대로 읽도록 하자. 값 변경이 아니라 값이 합해지는 것이었음 !

</div>
</details>

### [2133][def5]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> dpTable(n+1, 0);
    dpTable[2] = 3;
    dpTable[4] = 11;
    for(int i = 6; i <= n ; i++) {
        if(i % 2 == 1) continue;
        dpTable[i] = (dpTable[2] * dpTable[i-2]);
        long long special_case_left = 0;
        for(int j = i-4 ; j > 0 ; j-=2) {
            special_case_left += 2 * dpTable[j];  // 2 -> means 왼쪽에 j개일때 special case의 개수
        }
        dpTable[i] += special_case_left;
        dpTable[i] += 2;  // 2 -> means i 번째의 special case의 개수
    }
    cout << dpTable[n];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다소 발상이 어려운 DP 문제

- 모든 경우에 대하여 Special Case가 2개 생긴다는 확신이 있어야 했다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1068
[def2]: https://www.acmicpc.net/problem/14950
[def3]: https://www.acmicpc.net/problem/4485
[def4]: https://www.acmicpc.net/problem/12837
[def5]: https://www.acmicpc.net/problem/2133