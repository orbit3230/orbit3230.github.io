---
layout: post
title: "[데일리 백준] 14503"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-31
last_modified_at: 2024-08-31
---
## Gold
### [14503][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Direction {
    int x;
    int y;
} Direction;

typedef struct Robot {
    int x;
    int y;
    Direction direction;
    int d;
} Robot;

vector<Direction> directions = {{% raw %}{-1, 0}, {0, 1}, {1, 0}, {0, -1}{% endraw %}};  // 북, 동, 남, 서

bool notCleaned(vector<vector<int>>& room, int n, int m, Robot& robot) {
    if(robot.x + 1 < n && room[robot.x+1][robot.y] == 0) return true;
    if(robot.y + 1 < m && room[robot.x][robot.y+1] == 0) return true;
    if(robot.x - 1 >= 0 && room[robot.x-1][robot.y] == 0) return true;
    if(robot.y - 1 >= 0 && room[robot.x][robot.y-1] == 0) return true;
    return false;
}

int simulate(vector<vector<int>>& room, int n, int m, Robot& robot, int haveToClean) {
    int clean = 0;
    while(true) {
        if(clean == haveToClean) break;  // 청소 끝
        // 1. 청소
        if(room[robot.x][robot.y] == 0) {
            room[robot.x][robot.y] = 1;
            clean++;
        }
        // 2-1. 주변 4칸 중 청소되지 않은 빈 칸이 없는 경우
        if(!notCleaned(room, n, m, robot)) {
            // 후진이 가능
            int x_ = robot.x + (robot.direction.x * -1);
            int y_ = robot.y + (robot.direction.y * -1);
            if(x_ >= 0 && x_ < n && y_ >= 0 && y_ < m && room[x_][y_] != 10000) {
                robot.x = x_;
                robot.y = y_;
            }
            // 후진이 불가능
            else break;
        }
        // 2-2. 주변 4칸 중 청소되지 않은 빈 칸이 있는 경우
        else {
            // 반시계 방향으로 회전
            robot.d--;
            if(robot.d == -1) robot.d = 3;
            robot.direction = directions[robot.d];
            // 앞 칸이 청소되지 않은 칸이면 전진
            int x_ = robot.x + robot.direction.x;
            int y_ = robot.y + robot.direction.y;
            if(x_ >= 0 && x_ < n && y_ >= 0 && y_ < m && room[x_][y_] == 0) {
                robot.x = x_;
                robot.y = y_;
            }
        }
    }
    return clean;
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> room(n, vector<int>(m));

    Robot robot;
    int x, y, d;
    cin >> x >> y >> d;
    robot.x = x;
    robot.y = y;
    robot.direction = directions[d];
    robot.d = d;

    int haveToClean = 0;
    int input;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            cin >> input;
            room[i][j] = input*10000;  // 10000: 벽, 0: 청소 안됨, 1: 청소됨
            if(room[i][j] == 0) haveToClean++;
        }
    }

    int clean = simulate(room, n, m, robot, haveToClean);
    cout << clean;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 간단한 시뮬레이션 구현 문제  

</div>
</details>

[def]: https://www.acmicpc.net/problem/14503