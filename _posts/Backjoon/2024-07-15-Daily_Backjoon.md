---
layout: post
title: "[데일리 백준] 16953, 1463"
excerpt: "2 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-15
last_modified_at: 2024-07-15
---
## Silver
### [16953][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Position {
    int x;
    int step;
} Position;

int change(int a, int b) {
    int minStep = -1;

    queue<Position> q;
    q.push({a, 1});

    Position p;
    int x_1;
    int x_2;
    while(!q.empty()) {
        p = q.front();
        q.pop();
        if(p.x == b) {
            minStep = p.step;
            break;
        }
        x_1 = p.x*2;
        // Be careful with overflow 
        x_2 = (stol(to_string(p.x) + "1") > INT32_MAX) ? INT32_MAX :  stoi(to_string(p.x) + "1");
        if(x_1 <= b) q.push({x_1, p.step+1});
        if(x_2 <= b) q.push({x_2, p.step+1});
    }

    return minStep;
}

int main() {
    int a, b;
    cin >> a >> b;

    cout << change(a, b);
}
```

<br>

### [1463][def2]
- `1로 만들기` 문제가 DP가 아니라는 것을 위 문제를 풀고 깨달았다.  

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Position {
    int x;
    int step;
} Position;

int change(int a) {
    queue<Position> q;
    vector<bool> visited(a+1, false);
    q.push({a, 0});
    visited[a] = true;

    Position p;
    while(!q.empty()) {
        p = q.front();
        q.pop();
        if(p.x == 1) {
            return p.step;
        }
        if(p.x % 3 == 0 && !visited[p.x / 3]) {
            q.push({p.x / 3, p.step+1});
            visited[p.x / 3] = true;
        }
        if(p.x % 2 == 0 && !visited[p.x / 2]) {
            q.push({p.x / 2, p.step+1});
            visited[p.x / 2] = true;
        }
        if(!visited[p.x - 1]) {
            q.push({p.x - 1, p.step+1});
            visited[p.x - 1] = true;
        }
    }
}

int main() {
    int a, b;
    cin >> a >> b;

    cout << change(a);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 이 문제는 중복 방문의 경우가 많기 때문에, `visited` 배열을 따로 쓰지 않으면 시간적/공간적 손해를 본다.  
아래는 `visited`를 쓰지 않은 코드.  

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Position {
    int x;
    int step;
} Position;

int change(int a) {
    queue<Position> q;
    q.push({a, 0});

    Position p;
    while(!q.empty()) {
        p = q.front();
        q.pop();
        if(p.x == 1) {
            return p.step;
        }
        if(p.x % 3 == 0) q.push({p.x / 3, p.step+1});
        if(p.x % 2 == 0) q.push({p.x / 2, p.step+1});
        q.push({p.x - 1, p.step+1});
    }
}

int main() {
    int a, b;
    cin >> a >> b;

    cout << change(a);
}
```

- `visited` 사용한 경우 : 메모리 **2024KB** / 시간 **0ms**
- `visited` 사용하지 않은 경우 : 메모리 16524KB / 시간 44ms

</div>
</details> 

[def]: https://www.acmicpc.net/problem/16953
[def2]: https://www.acmicpc.net/problem/1463