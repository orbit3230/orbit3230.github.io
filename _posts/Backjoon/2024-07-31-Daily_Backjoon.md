---
layout: post
title: "[데일리 백준] 24468"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-31
last_modified_at: 2024-07-31
---
## Silver
### [24468][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Ball {
    int x;
    int moving;  // 1 or -1
} Ball;

int changeDirection(vector<vector<Ball*>>& position, int l) {
    int crashed = 0;
    // 가장 왼쪽
    for(Ball* ball : position[0]) {
        if(ball->moving == -1) {
            ball->moving = 1;
        }
    }
    // 가장 오른쪽
    for(Ball* ball : position[l]) {
        if(ball->moving == 1) {
            ball->moving = -1;
        }
    }
    // 충돌
    for(int i = 1 ; i < l ; i++) {
        if(position[i].size() >= 2) {  // 충돌 시 (==)
            for(Ball* ball : position[i]) {
                ball->moving *= -1;  // 방향 전환    
            }
            crashed++;
        }
    }
    return crashed;
}

void moving(vector<Ball>& balls) {
    for(Ball& ball : balls) {
        ball.x += ball.moving;
    }
}

int simulate(vector<Ball>& balls, int n, int l, int t) {
    int crashed = 0;
    for(int i = 0 ; i < t ; i++) {
        moving(balls);
        vector<vector<Ball*>> position(l+1);  // 각 인덱스는 위치를 나타내며, 공이 들어있거나 없을 것.
        // 공 위치로
        for(int j = 0 ; j < n ; j++) {
            position[balls[j].x].push_back(&balls[j]);
        }
        crashed += changeDirection(position, l);
    }
    return crashed;
}

int main() {
    int l, n, t;
    cin >> l >> n >> t;
    vector<Ball> balls;
    int x;
    char moving;
    for(int i = 0 ; i < n ; i++) {
        cin >> x >> moving;
        if(moving == 'R') {
            balls.push_back({x, 1});
        }
        else {  // 'L'
            balls.push_back({x, -1});
        }
    }

    int crashed = simulate(balls, n, l, t);

    cout << crashed;
}
```

[def]: https://www.acmicpc.net/problem/24468