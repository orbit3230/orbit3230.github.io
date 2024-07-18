---
layout: post
title: "[데일리 백준] 16236"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-18
last_modified_at: 2024-07-18
---
## Gold
### [16236][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

class Place {
public:
    int x;
    int y;
    int size;
    int time;
    bool visited;
};

class Shark : public Place {
public:
    int food;
    int sharkSize;
};

void roomInitialize(vector<vector<Place>>& room, int n) {
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            room[i][j].visited = false;
            room[i][j].time = 0;
        }
    }
}

int simulate(vector<vector<Place>>& room, int n, Shark& babyShark) {
    int timeFlow = 0;
    Simulation:
    queue<Place> q;
    roomInitialize(room, n);
    q.push(babyShark);
    room[babyShark.x][babyShark.y].visited = true;
    Place p;
    int x_, y_;
    vector<Place> eatableFishes;
    while(!q.empty()) {
        p = q.front();
        q.pop();
        x_ = p.x; y_ = p.y;
        // 먹을 수 있는 물고기면 리스트에 추가하자
        if(p.size != 0 && babyShark.sharkSize > p.size) {
            eatableFishes.push_back(p);
        }
        // 탐색 우선순위는 중요하지 않다.
        if(x_ > 0 && room[x_-1][y_].size <= babyShark.sharkSize && !room[x_-1][y_].visited) {
            room[x_-1][y_].visited = true;
            room[x_-1][y_].time = p.time + 1;
            q.push(room[x_-1][y_]);
        }
        if(y_ > 0 && room[x_][y_-1].size <= babyShark.sharkSize && !room[x_][y_-1].visited) {
            room[x_][y_-1].visited = true;
            room[x_][y_-1].time = p.time + 1;
            q.push(room[x_][y_-1]);
        }
        if(y_ < n-1 && room[x_][y_+1].size <= babyShark.sharkSize && !room[x_][y_+1].visited) {
            room[x_][y_+1].visited = true;
            room[x_][y_+1].time = p.time + 1;
            q.push(room[x_][y_+1]);
        }
        if(x_ < n-1 && room[x_+1][y_].size <= babyShark.sharkSize && !room[x_+1][y_].visited) {
            room[x_+1][y_].visited = true;
            room[x_+1][y_].time = p.time + 1;
            q.push(room[x_+1][y_]);
        }
    }
    // 먹을 수 있는 물고기 리스트 확인 후 계속 탐색을 진행할 지 결정
    if(!eatableFishes.empty()) {
        sort(eatableFishes.begin(), eatableFishes.end(), [](Place& a, Place& b) {
            if(a.time == b.time) {
                if(a.x == b.x) {
                    return a.y < b.y;  // (3) 왼쪽에 있는 물고기 우선
                }
                return a.x < b.x;  // (2) 위에 있는 물고기 우선
            }
            return a.time < b.time;  // (1) 가까운 물고기 우선
        });
        Place nyamnyam = eatableFishes[0];
        x_ = nyamnyam.x;
        y_ = nyamnyam.y;
        babyShark.food++;
        if(babyShark.food == babyShark.sharkSize) {
            babyShark.sharkSize++;
            babyShark.food = 0;
        }
        room[x_][y_].size = 0;
        babyShark.x = x_;
        babyShark.y = y_;
        timeFlow += nyamnyam.time;
        goto Simulation;
    }

    return timeFlow;
}

int main() {
    int n;
    cin >> n;
    vector<vector<Place>> room(n, vector<Place>(n));
    Shark babyShark;
    int input;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> input;
            if(input == 9) {
                babyShark.x = i;
                babyShark.y = j;
                babyShark.size = 0;
                babyShark.time = 0;
                babyShark.visited = false;
                // -- shark properties --
                babyShark.food = 0;
                babyShark.sharkSize = 2;
                room[i][j] = babyShark;
            }
            else {
                Place place;
                place.x = i;
                place.y = j;
                place.size = input;
                place.time = 0;
                place.visited = false;
                room[i][j] = place;
            }
        }
    }

    cout << simulate(room, n, babyShark);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 구현이 빡세다.

- 람다 함수와 연산자 오버로딩, 상속을 다시 한번 리마인드 했다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/16236