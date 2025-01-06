---
layout: post
title: "[데일리 백준] 2150"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-06
last_modified_at: 2025-01-06
---
## Platinum
### [2150][def]

```c++
#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

typedef struct Vertex {
    int index;
    int parent = -1;
    vector<Vertex*> nexts;
    bool visited = false;  // SCC로 이미 체결되었는 지 여부
} Vertex;

bool compare(const vector<int>& a, const vector<int>& b) {
    return a[0] < b[0];
}

int dfs(vector<Vertex>& graph, Vertex& v, int& index, stack<int>& stack, vector<vector<int>>& SCCs) {
    v.parent = index++;
    // stack includes "indexes", not "parents"
    stack.push(v.index);

    int root = v.parent;
    for(Vertex* next : v.nexts) {
        if(next->parent == -1) {
            root = min(root, dfs(graph, *next, index, stack, SCCs));
            continue;
        }
        // 핵심 부분 : 사이클이 발견된 경우 root를 탐색
        if(!(next->visited)) root = min(root, next->parent);
    }

    if(root == v.parent) {
        vector<int> SCC;
        int top;
        do {
            top = stack.top();
            stack.pop();
            SCC.push_back(top);
            graph[top].visited = true;
        } while(top != v.index);
        sort(SCC.begin(), SCC.end());
        SCCs.push_back(SCC);
        return INT32_MAX;  // doesn't matter
    }
    return root;  // must not be "v.parent"
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int v, e;
    cin >> v >> e;
    vector<Vertex> graph(v);
    for(int i = 0 ; i < v ; i++) graph[i].index = i;
    int from, to;
    for(int i = 0 ; i < e ; i++) {
        cin >> from >> to;
        from--; to--;
        graph[from].nexts.push_back(&graph[to]);
    }
    vector<vector<int>> SCCs;
    stack<int> stack;
    int index = 0;
    for(Vertex& v : graph) {
        if(v.parent != -1) continue;
        dfs(graph, v, index, stack, SCCs);
    }
    cout << SCCs.size() << '\n';
    sort(SCCs.begin(), SCCs.end(), compare);
    for(vector<int>& SCC : SCCs) {
        for(int& i : SCC) cout << i+1 << ' ';
        cout << "-1\n";
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- SCC(Strongly Connected Component) 문제

- 새로 학습한 알고리즘.

- `parent`보다 더 좋은 변수명을 생각해보는게...

- 재귀 함수를 따라가면서 직접 그려보며 `root`와 `parent`의 값 변화를 추적해보면,  
알고리즘 작동 방식 이해에 도움이 된다.  

- 헷갈리는 부분을 주석 처리했다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2150