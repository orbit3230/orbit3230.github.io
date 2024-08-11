---
layout: post
title: "[데일리 백준] 1766"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-11
last_modified_at: 2024-08-11
---
## Gold
### [1766][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Problem {
    int level;
    vector<Problem*> next;
    int inputDegree;
    bool operator<(const Problem& other) const {
        return this->level > other.level;
    }
} Problem;

void topologycal_sort(vector<Problem*>& problems, int n) {
    priority_queue<Problem> pq;
    for(int i = 0 ; i < n ; i++) {
        if(problems[i]->inputDegree == 0) {
            pq.push(*problems[i]);
        }
    }
    Problem p;
    while(!pq.empty()) {
        p = pq.top();
        pq.pop();
        cout << p.level << ' ';
        for(Problem* n : p.next) {
            n->inputDegree--;
            if(n->inputDegree == 0) {
                pq.push(*n);
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Problem*> problems;
    for(int i = 0 ; i < n ; i++) {
        Problem* p = new Problem();
        p->level= i+1;
        p->inputDegree = 0;
        problems.push_back(p);
    }
    int from, to;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to;
        from--; to--;
        problems[from]->next.push_back(problems[to]);
        problems[to]->inputDegree++;
    }
    topologycal_sort(problems, n);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 포인터 타입을 저장하는 우선순위 큐는,  
비록 해당 포인터가 실제로 가리키는 객체에 연산자 오버로딩을 했더라도  
주소를 가지고 비교하기 때문에 연산자 오버로딩의 의미가 사라진다.  

- 따라서 포인터를 저장하는 우선순위 큐에는  
세 번째 인자로 비교함수를 `decltype(cmp)`(`cmp`는 람다함수) 등으로 지정해 주어야 한다.  

- 나는 람다함수 사용이 껄끄러워서 우선순위 큐는 일반 객체를 저장하는 방식으로 진행했다.  
다만, 만약 메모리 제한이 빡셌다면 포인터와 비교함수를 사용하는 쪽으로 가야할 것이다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1766