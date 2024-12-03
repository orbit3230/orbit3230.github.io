---
layout: post
title: "[데일리 백준] 2533, 13398"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-03
last_modified_at: 2024-12-03
---
## Gold
### [2533][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Node {
    vector<Node*> neighbors;
    int index;
    bool visited = false;
} Node;

void dfs(Node& n, vector<vector<int>>& dpTable) {
    int index = n.index;
    n.visited = true;
    dpTable[index][0] = 0;
    dpTable[index][1] = 1;
    for(Node* next : n.neighbors) {
        if(next->visited) continue;
        dfs(*next, dpTable);
        dpTable[index][0] += dpTable[next->index][1];
        dpTable[index][1] += min(dpTable[next->index][0], dpTable[next->index][1]);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<Node> nodes(n);
    for(int i = 0 ; i < n ; i++) nodes[i].index = i;
    int from, to;
    for(int i = 0 ; i < n-1 ; i++) {
        cin >> from >> to;
        from--; to--;  // 0-based index
        nodes[from].neighbors.push_back(&nodes[to]);
        nodes[to].neighbors.push_back(&nodes[from]);
    }
    // col 0 : normal / col 1 : early adopters
    vector<vector<int>> dpTable(n, vector<int>(2, -1));
    // starts from arbitrary one
    dfs(nodes[n-2], dpTable);
    cout << min(dpTable[n-2][0], dpTable[n-2][1]);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 트리에서의 Dynamic Programming  
  - 각 노드의 상태가 단 두 가지로 나뉘어 짐을 바탕으로, 빠르게 다이나믹 프로그래밍을 적용해볼 생각을 하는 것이 핵심.  

</div>
</details>

### [13398][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<vector<int>> dpTable(2, vector<int>(n+1));
    dpTable[0][0] = 0;
    dpTable[1][0] = 0;
    int input;
    vector<int> inputs(n+1);
    int max = INT32_MIN;
    for(int i = 1 ; i <= n ; i++) {
        cin >> input;
        inputs[i] = input;
        dpTable[0][i] = std::max(dpTable[0][i-1]+input, input);
        max = std::max(max, dpTable[0][i]);
    }
    dpTable[1][1] = dpTable[0][1];
    for(int i = 2 ; i <= n ; i++) {
        dpTable[1][i] = std::max(dpTable[1][i-1] + inputs[i], dpTable[0][i-1]);
        max = std::max(max, dpTable[1][i]);
    }
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍.

- 먹기 싫은 숫자는 한 번 편식할 수 있다.  
그런데 양파를 편식해서 버렸다가, 나중에 더 어마무시한 빌런인 오이를 만난다면,  
울며 겨자먹기로 다시 양파를 꺼내 먹어야 겠죠?  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2533
[def2]: https://www.acmicpc.net/problem/13398