---
layout: post
title: "[데일리 백준] 9019"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-01
last_modified_at: 2024-08-01
---
## Gold
### [9019][def]

```c++
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

typedef struct Number {
    short x;
    string command;
} Number;
vector<bool> visited(10000, false);

Number D(Number& n) {
    short x_ = n.x;
    short x = x_ * 2;
    if(x > 9999) x %= 10000;
    if(visited[x]) return {-1, ""};
    visited[x] = true;
    return {x, n.command + 'D'};
}
Number S(Number& n) {
    short x_ = n.x;
    short x = x_ - 1;
    if(x == -1) x = 9999;
    if(visited[x]) return {-1, ""};
    visited[x] = true;
    return {x, n.command + 'S'};
}
Number L(Number& n) {
    short x_ = n.x;
    short x = (x_ % 1000) * 10 + (x_ / 1000);
    if(visited[x]) return {-1, ""};
    visited[x] = true;
    return {x, n.command + 'L'};
}
Number R(Number& n) {
    short x_ = n.x;
    short x = (x_ % 10) * 1000 + (x_ / 10);
    if(visited[x]) return {-1, ""};
    visited[x] = true;
    return {x, n.command + 'R'};
}

Number DSLR(short from, short to) {
    queue<Number> q;
    q.push({from, ""});
    visited[from] = true;
    while(true) {
        Number n = q.front();
        q.pop();
        if(n.x == to) return n;  // 종료 조건
        Number next = D(n);
        if(next.x != -1) q.push(next);
        next = S(n);
        if(next.x != -1) q.push(next);
        next = L(n);
        if(next.x != -1) q.push(next);
        next = R(n);
        if(next.x != -1) q.push(next);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    for(int i = 0 ; i < t ; i++) {
        short from;
        short to;
        cin >> from >> to;
        Number result = DSLR(from, to);
        cout << result.command << '\n';

        fill(visited.begin(), visited.end(), false);
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 수많은 메모리초과와 수많은 시간초과.  
![p9019][def2]  

- 결국 정답은 `string`이고 구조체고 뭐고, `visited`를 큐에 집어넣을 때 수정하면 그만이었다.  
나는 왜, 어째서 무슨 까닭으로 `visited`를 밖으로 뺐었을까? 분명히 알면서 의도적으로 뺐었는데,  
분명 그때는 뺐을때가 예제를 통과했는데 멍청한 생각이었음.  
당연하게도 집어넣을 때 건드리는게 맞음.  
너무 힘들었다

</div>
</details>

[def]: https://www.acmicpc.net/problem/9019
[def2]: https://i.imgur.com/Vyt0a2A.png