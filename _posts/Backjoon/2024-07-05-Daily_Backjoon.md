---
layout: post
title: "[데일리 백준] 12851, 13549, 13913"
excerpt: "3 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-05
last_modified_at: 2024-07-05
---
## Gold
- 오늘 세 문제는 모두 [숨바꼭질][def3] 문제의 파생형입니다.
### [12851][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Position {
    int n_;
    int step;
} Position;

int* calculate(int n, int k) {
    if(n >= k) {
        int* result = new int[2];
        result[0] = n - k;
        result[1] = 1;
        return result;
    }
    bool *visited = new bool[k+20];
    for(int i = 0 ; i < k+20 ; i++) visited[i] = false;
    queue<Position> q;
    q.push({n, 0});
    visited[n] = true;
    Position p_;
    int n_;
    int step;
    int minStep = 0;
    int ways = 0;
    while(!q.empty()) {
        p_ = q.front();
        q.pop();
        n_ = p_.n_;
        step = p_.step;
        if(n_ == k) {
            if(ways == 0) {  // 가장 빠른 시간 최초 발견
                minStep = step;
                ways++;
            }
            else if(minStep == step)  // 이와 동일한 시간에 도착한 경우를 카운트
                ways++;
            else  // 늦게 도착한 경우가 발견되면 STOP
                break;
        }
        else {
            visited[n_] = true;
        }
        if(n_ < k) {
            if(n_ != 0 && n_ < k/2 + 10 && !visited[n_ * 2]) {
                q.push({n_ * 2, step + 1});
            }
            if(!visited[n_ + 1]) {
                q.push({n_ + 1, step + 1});
            }
        }
        if(n_ > 0 && !visited[n_ - 1]) {
            q.push({n_ - 1, step + 1});
        }
    }

    int* result = new int[2];
    result[0] = minStep;
    result[1] = ways;
    return result;
}

int main() {
    int n, k;
    cin >> n >> k;
    int *result = calculate(n, k);
    cout << result[0] << '\n' << result[1];
}                        
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 일반적으로 BFS와 같은 그래프탐색에서는 `visited`를 큐에 집어 넣을 때에 업데이틑하지만,  
현재 문제에서는 동일한 타이밍에서의 가지수를 모두 체크해야하기 때문에, 같은 타이밍에 큐에 집어넣어 지는 경우를 고려하기 위하여  
큐에서 꺼낼 때 `visited`를 업데이트 하는 것이 알고리즘적으로 올바르겠다.  

</div>
</details> 

### [13549][def2]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Position {
    int n_;
    int step;
} Position;

int calculate(int n, int k) {
    if(n >= k) return n - k;
    bool *visited = new bool[k+20];
    for(int i = 0 ; i < k+20 ; i++) visited[i] = false;
    queue<Position> q;
    q.push({n, 0});
    Position p_;
    int n_;
    int step;
    while(true) {
        p_ = q.front();
        q.pop();
        n_ = p_.n_;
        step = p_.step;
        if(n_ == k) return step;
        if(n_ > 0 && !visited[n_ - 1]) {
            q.push({n_ - 1, step + 1});
            visited[n_ - 1] = true;
        }
        if(n_ < k) {
            if(n_ != 0 && n_ < k/2 + 10 && !visited[n_ * 2]) {
                q.push({n_ * 2, step});
                visited[n_ * 2] = true;
            }
            if(!visited[n_ + 1] || n_ == 0) {
                q.push({n_ + 1, step + 1});
                visited[n_ + 1] = true;
            }
        }
    }
}

int main() {
    int n, k;
    cin >> n >> k;
    cout << calculate(n, k);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- [숨바꼭질 1][def3] 문제와 알고리즘이 살짝 다른데,  
여기서는 곱셈 큐 삽입이 압도적으로 효율적이기 때문에  
1회 뺄셈 후 곱셈이 유용한 경우를 생각하여 뺄셈을 큐에 먼저 넣는다.  

</div>
</details>

### [13913][def4]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Position {
    int n_;
    int step;
    vector<int> path;  // 이전 까지의 경로들을 저장
} Position;

Position calculate(int n, int k) {
    if(n >= k) {
        Position p;
        p.n_ = n;
        p.step = n - k;
        for(int i = n ; i >= k ; i--) {
            p.path.push_back(i);
        }
        return p;
    }
    bool *visited = new bool[k+20];
    for(int i = 0 ; i < k+20 ; i++) visited[i] = false;
    queue<Position> q;
    q.push({n, 0});
    Position p_;
    int n_;
    int step;
    while(true) {
        p_ = q.front();
        q.pop();
        n_ = p_.n_;
        step = p_.step;
        if(n_ == k) {
            p_.path.push_back(n_);
            return p_;
        }
        if(n_ < k) {
            if(n_ != 0 && n_ < k/2 + 10 && !visited[n_ * 2]) {
                Position p__; // 새로운 객체 (기존 객체 사용은 경로 중복 삽입 문제 발생)
                p__.n_ = n_ * 2;
                p__.step = step + 1;
                p__.path = p_.path;  // 이전 경로 복사
                p__.path.push_back(n_);
                q.push(p__);
                visited[n_ * 2] = true;
            }
            if(!visited[n_ + 1]) {
                Position p__;
                p__.n_ = n_ + 1;
                p__.step = step + 1;
                p__.path = p_.path;
                p__.path.push_back(n_);
                q.push(p__);
                visited[n_ + 1] = true;
            }
        }
        if(n_ > 0 && !visited[n_ - 1]) {
            Position p__;
            p__.n_ = n_ - 1;
            p__.step = step + 1;
            p__.path = p_.path;
            p__.path.push_back(n_);
            q.push(p__);
            visited[n_ - 1] = true;
        }
    }
}

int main() {
    int n, k;
    cin >> n >> k;
    Position p = calculate(n, k);
    cout << p.step << '\n';
    for(int way : p.path) {
        cout << way << ' ';
    }
}
```

[def]: https://www.acmicpc.net/problem/12851
[def2]: https://www.acmicpc.net/problem/13549
[def3]: https://www.acmicpc.net/problem/1697
[def4]: https://www.acmicpc.net/problem/13913