---
layout: post
title: "[데일리 백준] 1351, 2458, 2056, 11000, 2133"
excerpt: "4 Gold, 1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-18
last_modified_at: 2024-12-18
---
## Gold
- 시험 대비 5문제 풀이

### [1351][def]

```c++
#include <iostream>
#include <unordered_map>
using namespace std;

long long dp(unordered_map<long long, long long>& map, long long i, const int p, const int q) {
    if(map.find(i) != map.end()) return map[i];
    return map[i] = dp(map, i/p, p, q) + dp(map, i/q, p, q);
}

int main() {
    long long n;
    int p, q;
    cin >> n >> p >> q;
    unordered_map<long long, long long> map;
    map.insert({0, 1});
    cout << dp(map, n, p, q);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 해시 + 다이나믹 프로그래밍

</div>
</details>

### [2458][def2]

```c++
#include <iostream>
#include <vector>
#define INF INT32_MAX/2
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> graph(n, vector<int>(n, INF));
    for(int i = 0 ; i < n ; i++) graph[i][i] = 0;
    int from, to;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to;
        from--; to--;  // 0-based index
        graph[from][to] = 1;
    }
    // floyd-warshall
    for(int k = 0 ; k < n ; k++) {
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < n ; j++) {
                if(i == j) continue;
                graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j]);
            }
        }
    }
    // checking
    int count = 0;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            if(graph[i][j] == INF && graph[j][i] == INF) goto next;
        }
        count++;
        next:
        continue;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 플로이드 워셜 응용 문제

- 두 노드가 서로 연관이 없음을 서로에 대한 거리가 `INF`임으로 연관지었다.  

</div>
</details>

### [2056][def3]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Task {
    int time;
    int waiting = 0;
    int degree = 0;
    vector<Task*> nexts;
} Task;

void traversal(vector<Task>& tasks, int& max_time) {
    queue<Task*> q;
    // initialize
    for(Task& task : tasks) {
        if(!task.degree) q.push(&task);
    }
    while(!q.empty()) {
        Task* t = q.front();
        q.pop();
        int time = t->waiting + t->time;
        max_time = max(max_time, time);
        for(Task* next: t->nexts) {
            next->degree--;
            next->waiting = max(next->waiting, time);
            if(!next->degree) q.push(next);
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<Task> tasks(n);
    for(Task& task : tasks) {
        cin >> task.time;
        int next;
        cin >> next;
        int nextIndex;
        while(next--) {
            cin >> nextIndex;
            nextIndex--;  // 0-based index
            task.nexts.push_back(&tasks[nextIndex]);
            tasks[nextIndex].degree++;
        }
    }
    int max_time = 0;
    traversal(tasks, max_time);
    cout << max_time;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 위상 정렬 + 메모이제이션

</div>
</details>

### [11000][def4]

```c++
#include <iostream>
#include <queue>
#include <algorithm>
using namespace std;

typedef struct Class {
    int from;
    int to;
    bool operator<(const Class& other) const {
        return this->to > other.to;
    }
} Class;

bool compare(const Class& c1, const Class& c2) {
    return c1.from < c2.from;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<Class> classes(n);
    Class c;
    for(int i = 0 ; i < n ; i++) cin >> classes[i].from >> classes[i].to;
    sort(classes.begin(), classes.end(), compare);
    priority_queue<Class> activated;
    size_t need = 0;
    for(int i = 0 ; i < n ; i++) {
        c = classes[i];
        while(!activated.empty() && activated.top().to <= c.from) activated.pop();
        activated.push(c);
        need = max(need, activated.size());
    }
    cout << need;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그리디 알고리즘.

- 스케쥴링 문제는 항상 헷갈린다.  

</div>
</details>

<br>

## Platinum
### [1219][def5]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MIN>>1
using namespace std;

typedef struct Edge {
    int from;
    int to;
    int cost;
} Edge;
typedef struct Node {
    long long path = INF;
    int value;
    vector<Edge*> edges;
} Node;

bool bfs(vector<Node>& nodes, int n, int start, int end) {
    queue<Node> q;
    vector<bool> visited(n, false);
    q.push(nodes[start]);
    while(!q.empty()) {
        Node next = q.front();
        q.pop();
        for(Edge* e : next.edges) {
            int toward = e->to;
            if(!visited[toward]) {
                if(toward == end) return true;
                visited[toward] = true;
                q.push(nodes[toward]);
            }
        }
    }
    return false;
}

void bellman_ford(vector<Node>& nodes, vector<Edge>& edges, int n) {
    for(int i = 0 ; i < n-1 ; i++) {
        for(Edge& edge : edges) {
            if(nodes[edge.from].path == INF) continue;
            long long originPath = nodes[edge.to].path;
            long long newPath =  nodes[edge.from].path - edge.cost + nodes[edge.to].value;
            nodes[edge.to].path = max(originPath, newPath);
        }
    }
}
bool is_infinite_cycle(vector<Node>& nodes, vector<Edge>& edges, int n, int start, int end) {
    for(Edge& edge : edges) {
        if(nodes[edge.from].path == INF) continue;
        long long originPath = nodes[edge.to].path;
        long long newPath =  nodes[edge.from].path - edge.cost + nodes[edge.to].value;
        if(originPath < newPath && bfs(nodes, n, start, edge.from) && bfs(nodes, n, edge.to, end)) return true;
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, start, end, m;
    cin >> n >> start >> end >> m;
    vector<Node> nodes(n);
    vector<Edge> edges(m);
    for(int i = 0 ; i < m ; i++) {
        cin >> edges[i].from >> edges[i].to >> edges[i].cost;
        nodes[edges[i].from].edges.push_back(&edges[i]);
    }
    for(int i = 0 ; i < n ; i++) cin >> nodes[i].value;

    nodes[start].path = nodes[start].value;
    bellman_ford(nodes, edges, n);
    if(nodes[end].path == INF) {
        cout << "gg";
        return 0;
    }
    if(is_infinite_cycle(nodes, edges, n, start, end)) {
        cout << "Gee";
        return 0;
    }
    cout << nodes[end].path;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다소 복잡한 벨만-포드 문제

- 사이클을 발견했더라도, 해당 사이클을 통해 도착점에 도달하는 경우가 존재하는 지를 추가로 확인해야 한다.  

- 그리고 아직 개척되지 않은 노드에 대해서는 업데이트를 하지 않도록 하자....

</div>
</details>

[def]: https://www.acmicpc.net/problem/1351
[def2]: https://www.acmicpc.net/problem/2458
[def3]: https://www.acmicpc.net/problem/2056
[def4]: https://www.acmicpc.net/problem/11000
[def5]: https://www.acmicpc.net/problem/1219