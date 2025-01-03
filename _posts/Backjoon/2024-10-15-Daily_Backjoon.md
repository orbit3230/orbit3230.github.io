---
layout: post
title: "[데일리 백준] 1325, 18352, 1707, 2749"
excerpt: "2 Silver, 2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-15
last_modified_at: 2024-10-15
---
## Silver
### [1325][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Computer {
    vector<Computer*> connected;
    bool hacked = false;
} Computer;

void hacking(Computer* current, int& count) {
    count++;
    current->hacked = true;
    for(Computer* next : current->connected) {
        if(!next->hacked) hacking(next, count);
    }
    return;
}
void initialize(vector<Computer>& network) {
    for(Computer& c : network) c.hacked = false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Computer> network(n);
    int a, b;
    for(int i = 0 ; i < m ; i++) {
        cin >> a >> b;
        a--; b--;  // 0-based index
        network[b].connected.push_back(&network[a]);
    }
    int max_count = 0;
    vector<int> best;
    for(int i = 0 ; i < n ; i++) {
        int count = 0;
        hacking(&network[i], count);
        initialize(network);
        if(max_count <= count) {
            if(max_count == count) {
                best.push_back(i+1);
                continue;
            }
            max_count = count;
            best.clear();
            best.push_back(i+1);
        }
    }
    for(int i : best) cout << i << ' ';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 무난한 그래프 탐색 문제.

- 가장 긴 그래프 연결을 찾는 브루트포스 문제.

</div>
</details>

### [18352][def3]

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

typedef struct Node {
    int index;
    vector<Node*> neighbors;
    bool visited = false;
    int step = 0;
} Node;

void bfs_search(vector<Node>& nodes, Node& current, int k, vector<int>& exact) {
    current.visited = true;
    queue<Node*> q;
    q.push(&current);
    Node* n;
    while(!q.empty()) {
        n = q.front();
        q.pop();
        if(n->step > k) break;
        if(n->step == k) exact.push_back(n->index);
        for(Node* next : n->neighbors) {
            if(!next->visited) {
                next->step = n->step+1;
                next->visited = true;
                q.push(next);
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m, k, x;
    cin >> n >> m >> k >> x;
    x--;  // 0-based index
    vector<Node> nodes(n);
    for(int i = 0 ; i < n ; i++) {
        nodes[i].index = i+1;  // 1-based index
    }
    int a, b;
    for(int i = 0 ; i < m ; i++) {
        cin >> a >> b;
        a--; b--;  // 0-based index
        nodes[a].neighbors.push_back(&nodes[b]);
    }
    vector<int> exact;
    bfs_search(nodes, nodes[x], k, exact);
    if(exact.empty()) {
        cout << -1;
        return 0;
    }
    sort(exact.begin(), exact.end());
    for(int i : exact) cout << i << '\n';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 무난한 BFS 문제.

- 양방향 그래프인 줄 알았는데 단방향 그래프였다. 문제를 잘 읽도록

</div>
</details>

<br>

## Gold
### [1707][def2]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Node {
    vector<Node*> neighbors;
    bool visited = false;
    int step = 0;  // 몇 번째 스텝에 방문했는 지
} Node;

bool hasCycle(vector<Node>& nodes, int start) {
    Node* n = &nodes[start];
    n->visited = true;
    queue<Node*> q;
    q.push(n);
    while(!q.empty()) {
        n = q.front();
        q.pop();
        for(Node* neighbor : n->neighbors) {
            if(neighbor->visited) {
                // 바로 직전 노드 : OK
                // 동시에 도착하는 것 : OK
                if(neighbor->step != n->step-1 && neighbor->step != n->step+1) return true;
                continue;
            }
            neighbor->visited = true;
            neighbor->step = n->step+1;
            q.push(neighbor);
        }
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int k;
    cin >> k;
    for(int t = 0 ; t < k ; t++) {
        int V, E;
        cin >> V >> E;
        vector<Node> nodes(V);
        for(int i = 0 ; i < E ; i++) {
            int u, v;
            cin >> u >> v;
            u--; v--;  // 0-based index
            nodes[u].neighbors.push_back(&nodes[v]);
            nodes[v].neighbors.push_back(&nodes[u]);
        }
        bool cycle = false;
        for(int i = 0 ; i < V ; i++) {
            if(nodes[i].visited) continue;
            if(hasCycle(nodes, i)) {
                cycle = true;
                break;
            }
        }
        if(cycle) cout << "NO\n";
        else cout << "YES\n";
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 이분 그래프 : 그래프를 두 개의 집합으로 나누는데, 같은 집합에 들어있는 노드들끼리는 서로 인접하지 않도록 나눌 수 있는 그래프.  

- 내가 깨달은 이분 그래프의 특성
  - (1) 기본적으로 사이클이 존재하면 안된다.  
  - (2) 단, 사이클이 존재하더라도 BFS 기준 같은 시간에 도착 한다면 이분 그래프가 될 수도 있다.   

</div>
</details>

### [2749][def4]

```c++
#include <iostream>
#include <vector>
#define DIV 1000000
using namespace std;

// 계산 결과는 a에 담아서 줍니다.
void multiply(vector<vector<long long>>& a, const vector<vector<long long>>& b) {
    long long lt = (a[0][0]*b[0][0] + a[0][1]*b[1][0]) % DIV;
    long long lb = (a[1][0]*b[0][0] + a[1][1]*b[1][0]) % DIV;
    long long rt = (a[0][0]*b[0][1] + a[0][1]*b[1][1]) % DIV;
    long long rb = (a[1][0]*b[0][1] + a[1][1]*b[1][1]) % DIV;
    a[0][0] = lt; a[0][1] = rt; a[1][0] = lb; a[1][1] = rb;
}
void power(vector<vector<long long>>& a, long long n, const vector<vector<long long>>& origin) {
    if(n == 1) return;
    power(a, n/2, origin);
    multiply(a, a);  // a = a^2
    // e.g.,
    // 13 -> 6 -> 3 -> 1
    // 1 -> 2(+1) -> 6 -> 12(+1) = 13 (복원을 위한 +1)
    if(n % 2 == 1) {
        multiply(a, origin);
    }
}

// [[0, 1][1, 1]]^x = [[fib(x-1), fib(x)][fib(x), fib(x+1)]]
long long fibonacci(long long n) {
  vector<vector<long long>> matrix(2, vector<long long>(2, 1));
  matrix[0][0] = 0;
  const vector<vector<long long>> origin = matrix;
  
  power(matrix, n, origin);
  
  return matrix[0][1];
}

int main() {
  long long n;
  cin >> n;
  cout << fibonacci(n);

  return 0;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 분할 정복을 활용한 피보나치 수열 계산 문제 !!

- 굉장히 신기했다. 피보나치 수열을 행렬의 거듭 제곱으로 표현 가능하다는 사실이 놀라웠다.  

- 또한 이것을 분할 정복으로 구하는, 특히 홀수를 처리하는 기법이 신기했다.

- 어쩌다보니 알고리즘 과제하다가 서버가 터져서 똑같이 생긴 백준 문제를 풀어버림.  

</div>
</details>


[def]: https://www.acmicpc.net/problem/1325
[def2]: https://www.acmicpc.net/problem/1707
[def3]: https://www.acmicpc.net/problem/18352
[def4]: https://www.acmicpc.net/problem/2749