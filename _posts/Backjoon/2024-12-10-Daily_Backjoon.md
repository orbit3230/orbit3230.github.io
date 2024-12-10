---
layout: post
title: "[데일리 백준] 1414, 1328"
excerpt: "1 Gold, 1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-10
last_modified_at: 2024-12-10
---
## Gold
### [1414][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Node {
    short index;
    short parent;
} Node;
typedef struct Edge {
    short from;
    short to;
    short length;
} Edge;

bool compare(const Edge& e1, const Edge& e2) {
    return e1.length < e2.length;
}

short find(vector<Node>& nodes, Node& n) {
    if(n.index == n.parent) return n.index;
    return n.parent = find(nodes, nodes[n.parent]);
}
bool unionFind(vector<Node>& nodes, Node& a, Node& b) {
    short rootA = find(nodes, a);
    short rootB = find(nodes, b);
    if(rootA == rootB) return true;
    nodes[rootB].parent = rootA;
    return false;
}

int main() {
    int n;
    cin >> n;
    vector<Node> nodes(n);
    for(short i = 0 ; i < n ; i++) nodes[i].index = nodes[i].parent = i;
    vector<Edge> edges;
    string input;
    short length;
    for(short i = 0 ; i < n ; i++) {
        cin >> input;
        for(short j = 0 ; j < n ; j++) {
            length = input[j] - 'A' + 1;
            if(length < 0) continue;
            length += (length > 26 ? -32 : 26);  // 장난질 에바임 진짜
            Edge e = {i, j, length};
            edges.push_back(e);
        }
    }
    sort(edges.begin(), edges.end(), compare);
    int giveAway = 0;
    int selected = 0;
    for(Edge& edge : edges) {
        if(selected == n-1 || unionFind(nodes, nodes[edge.from], nodes[edge.to])) {
            giveAway += edge.length;
            continue;
        }
        selected++;
    }
    cout << (selected != n-1 ? -1 : giveAway);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 최소 스패닝 트리 문제.

- 드디어 `nodes[rootB].parent = ~` 의 진짜 의미를 깨달았다.  
  - `b.parent`와 `nodes[rootB].parent`가 다른 이유.

  - 올바른 방법인 `nodes[rootB].parent`의 경우, 현재 자신이 따라가고 있는 선두주자에게  
  누구를 따라가도록 할 것인지 알려주는 행위이다.  
  따라서, 선두를 따르던 모든 하위 노드들이 모두 같은 집합으로 union 되도록 할 수 있다.  

  - 반면 잘못된 방법인 `b.parent`의 경우, 자신만 현재 따라가던 선두를 버리고 다른 집합으로 이동하게 된다.  
  따라서 제대로 된 union이 이루어지지 않는다.  

</div>
</details>

## Platinum
### [1328][def2]

```c++
#include <iostream>
#include <vector>
#define DIV 1000000007
using namespace std;

int dp(vector<vector<vector<int>>>& dpTable, int n, int l, int r) {
    if(dpTable[n][l][r] != -1) return dpTable[n][l][r];
    if(l == 1 && r == 1) {
        if(n == 1) return dpTable[n][l][r] = 1;
        return dpTable[n][l][r] = 0;
    }
    if(!l || !r) return dpTable[n][l][r] = 0;
    if(n == 1) return dpTable[n][l][r] = 0;
    return dpTable[n][l][r] = ((((long long)dp(dpTable, n-1, l, r) * (n-2)) % DIV)
    + (dp(dpTable, n-1, l-1, r) % DIV) + (dp(dpTable, n-1, l, r-1) % DIV)) % DIV;
}

int main() {
    int n, l, r;
    cin >> n >> l >> r;
    vector<vector<vector<int>>> dpTable(n+1, vector<vector<int>>(l+1, vector<int>(r+1, -1)));
    cout << dp(dpTable, n, l, r);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming.

- 순수 점화식의 난이도가 어마어마하다.
  - 큰 빌딩부터 세워야 겠다는 아이디어는 떠올릴 수 있었는데,  
  점화식에 감이 안와서 난감했다.  
  아직 DP 트레이닝이 더 필요한 듯

</div>
</details>

[def]: https://www.acmicpc.net/problem/1414
[def2]: https://www.acmicpc.net/problem/1328