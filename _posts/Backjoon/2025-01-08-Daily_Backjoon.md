---
layout: post
title: "[데일리 백준] 11281"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-08
last_modified_at: 2025-01-08
---
## Platinum
### [11281][def]

```c++
#include <iostream>
#include <vector>
#include <stack>
#include <unordered_set>
#include <algorithm>
using namespace std;

typedef struct Literal {
    int index;
    int order = -1;
    vector<Literal*> nexts;
    int SCCIndex;
    bool madeSSC = false;
    bool value = true;
} Literal;

int dfs(vector<Literal>& posLiteral, vector<Literal>& negLiteral, 
Literal& literal, int& index, int& SCCIndex, vector<unordered_set<int>>& SCCs, stack<int>& stack) {
    literal.order = index++;
    stack.push(literal.index);

    int root = literal.order;
    for(Literal* next : literal.nexts) {
        if(next->order == -1) {
            root = min(root, dfs(posLiteral, negLiteral, *next, index, SCCIndex, SCCs, stack));
            continue;
        }
        if(next->madeSSC) continue;
        root = min(root, next->order);
    }

    if(root == literal.order) {
        unordered_set<int> SCC;
        int top;
        do {
            top = stack.top();
            stack.pop();
            SCC.insert(top);
            Literal& l = top > 0 ? posLiteral[top] : negLiteral[-top];
            l.SCCIndex = SCCIndex;
            l.madeSSC = true;
        } while(top != literal.index);
        SCCs.push_back(SCC);
        SCCIndex++;
        return INT32_MAX;
    }
    return root;
}

bool compare(const Literal* a, const Literal* b) {
    return a->SCCIndex > b->SCCIndex;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Literal> posLiteral(n+1);
    for(int i = 1 ; i <= n ; i++) posLiteral[i].index = i;
    vector<Literal> negLiteral(n+1);
    for(int i = 1 ; i <= n ; i++) negLiteral[i].index = -i;
    int a, b;
    while(m--) {
        cin >> a >> b;
        if(a > 0) {
            if(b > 0) {  // (+, +) is (-) -> (+) & (+) <- (-)
                negLiteral[a].nexts.push_back(&posLiteral[b]);
                negLiteral[b].nexts.push_back(&posLiteral[a]);
                continue;
            }
            // (+, -) is (-) -> (-) & (+) <- (+)
            negLiteral[a].nexts.push_back(&negLiteral[-b]);
            posLiteral[-b].nexts.push_back(&posLiteral[a]);
            continue;
        }
        if(b > 0) {  // (-, +) is (+) -> (+) & (-) <- (-)
            posLiteral[-a].nexts.push_back(&posLiteral[b]);
            negLiteral[b].nexts.push_back(&negLiteral[-a]);
            continue;
        }
        // (-, -) is (+) -> (-) & (-) <- (+)
        posLiteral[-a].nexts.push_back(&negLiteral[-b]);
        posLiteral[-b].nexts.push_back(&negLiteral[-a]);
    }

    vector<unordered_set<int>> SCCs;
    stack<int> stack;
    int index = 0;
    int SCCIndex = 0;
    for(int i = 1 ; i <= n ; i++) {
        Literal& l = posLiteral[i];
        if(l.order != -1) continue;
        dfs(posLiteral, negLiteral, l, index, SCCIndex, SCCs, stack);
    }
    for(int i = 1 ; i <= n ; i++) {
        Literal& l = negLiteral[i];
        if(l.order != -1) continue;
        dfs(posLiteral, negLiteral, l, index, SCCIndex, SCCs, stack);
    }
    for(unordered_set<int>& SCC : SCCs) {
        for(int i : SCC) {
            // x & -x in cycle => CONTRADICTION
            if(SCC.find(-i) != SCC.end()) {
                cout << 0;
                return 0;
            }
        }
    }
    vector<Literal*> literals;
    for(int i = 1 ; i <= n ; i++) {
        literals.push_back(&posLiteral[i]);
        literals.push_back(&negLiteral[i]);
    }
    // SCC가 만들어진 역순으로 정렬 -> 위상정렬 순서
    sort(literals.begin(), literals.end(), compare);
    for(Literal* l : literals) {
        // 반대쪽 Literal이 위상정렬 순서 상 먼저 처리되었을 경우
        if((l->index > 0) ? !negLiteral[l->index].value : !posLiteral[-(l->index)].value) continue;
        l->value = false;
    }
    cout << 1 << '\n';
    for(int i = 1 ; i <= n ; i++) {
        cout << posLiteral[i].value << ' ';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 2-SAT 문제 (Strongly Connected Component, SCC 응용 문제)

  - 어제 문제는 단순히 Decision Problem 이었다면, 오늘은 한 단계 더 나아가서 Answer를 구하는 문제.  

  - 실제 Answer를 구하려면, 위상정렬을 떠올리면 된다.  

  - 위상정렬의 방문 순서는, SCC가 만들어진 "역순"이다.  
  DFS는 재귀함수이므로 call stack이 깊은 곳 부터 SCC를 체결하기 때문이다.  

  - 우선 SAT를 해결 가능하다는 것은, 같은 SCC 내에서는 우선 Basic Literal과 Not Literal이 공존할 수 없다.  

  - 위상정렬 순서대로, **전건이 부정이면 후건은 긍정이어야만 한다**는 것을 이용하여  
  한 Literal에 대해 Basic 또는 Not 중 먼저 발견된 것에 대해 Greedy하게 `False`로 처리한다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/11281