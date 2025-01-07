---
layout: post
title: "[데일리 백준] 11280"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-07
last_modified_at: 2025-01-07
---
## Platinum
### [11280][def]

```c++
#include <iostream>
#include <vector>
#include <stack>
#include <unordered_set>
using namespace std;

typedef struct Literal {
    int index;
    int order = -1;
    vector<Literal*> nexts;
    bool madeSSC = false;
} Literal;

int dfs(vector<Literal>& posLiteral, vector<Literal>& negLiteral, 
Literal& literal, int& index, vector<unordered_set<int>>& SCCs, stack<int>& stack) {
    literal.order = index++;
    stack.push(literal.index);

    int root = literal.order;
    for(Literal* next : literal.nexts) {
        if(next->order == -1) {
            root = min(root, dfs(posLiteral, negLiteral, *next, index, SCCs, stack));
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
            (top > 0 ? posLiteral[top] : negLiteral[-top]).madeSSC = true;
        } while(top != literal.index);
        SCCs.push_back(SCC);
        return INT32_MAX;
    }
    return root;
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
    for(int i = 1 ; i <= n ; i++) {
        Literal& l = posLiteral[i];
        if(l.order != -1) continue;
        dfs(posLiteral, negLiteral, l, index, SCCs, stack);
    }
    for(int i = 1 ; i <= n ; i++) {
        Literal& l = negLiteral[i];
        if(l.order != -1) continue;
        dfs(posLiteral, negLiteral, l, index, SCCs, stack);
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
    cout << 1;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 2-SAT 문제 (Strongly Connected Component, SCC 응용 문제)

  - 주어진 Clause를 바탕으로 한 Literal이 거짓이면 다른 Literal이 참이여야 함을 이용해  
  그래프를 형성하고,  

  - 그래프 내에서 SCC를 찾아서

  - 해당 SCC 내에 어떤 변수의 basic/NOT 이 모두 포함되어있다면 모순임을 활용하는 문제.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/11280