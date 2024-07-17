---
layout: post
title: "[데일리 백준] 17144"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-17
last_modified_at: 2024-07-17
---
## Gold
### [17144][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Place {
    int dust;
    int turnOver;  // 1초가 지나면 바뀌게 될 미세먼지의 농도의 저장 값
} Place;

void simulate(vector<vector<Place*>>& room, int r, int c, Place* upperCleaner, int upperRow, Place* lowerCleaner, int lowerRow) {
    // (1) 확산, 미세먼지 농도가 5 미만인 곳은 무시.
    int diffuse;
    for(int i = 0 ; i < r ; i++) {
        for(int j = 0 ; j < c ; j++) {
            if(room[i][j]->dust >= 5) {
               diffuse = 0;
               // 상하좌우로 확산
               if((i-1 >= 0) && (room[i-1][j]->dust != -1)) {
                   diffuse += room[i][j]->dust / 5;
                   room[i-1][j]->turnOver += room[i][j]->dust / 5;
               }
                if((i+1 < r) && (room[i+1][j]->dust != -1)) {
                     diffuse += room[i][j]->dust / 5;
                     room[i+1][j]->turnOver += room[i][j]->dust / 5;
                }
                if((j-1 >= 0) && (room[i][j-1]->dust != -1)) {
                     diffuse += room[i][j]->dust / 5;
                     room[i][j-1]->turnOver += room[i][j]->dust / 5;
                }
                if((j+1 < c) && (room[i][j+1]->dust != -1)) {
                     diffuse += room[i][j]->dust / 5;
                     room[i][j+1]->turnOver += room[i][j]->dust / 5;
                }
                // 확산된 양만큼 현재 위치는 감소
                room[i][j]->turnOver -= diffuse;
            }
        }
    }
    // (2) 확산 후의 농도 재 계산
    for(int i = 0 ; i < r ; i++) {
        for(int j = 0 ; j < c ; j++) {
            room[i][j]->dust += room[i][j]->turnOver;
            room[i][j]->turnOver = 0;
        }
    }
    // (3) 공기청정기 작동
    // (3-1) upperCleaner
    for(int i = upperRow-1 ; i > 0 ; i--) {
        room[i][0]->dust = room[i-1][0]->dust;
    }
    for(int i = 0 ; i < c-1 ; i++) {
        room[0][i]->dust = room[0][i+1]->dust;
    }
    for(int i = 0 ; i < upperRow ; i++) {
        room[i][c-1]->dust = room[i+1][c-1]->dust;
    }
    for(int i = c-1 ; i > 1 ; i--) {
        room[upperRow][i]->dust = room[upperRow][i-1]->dust;
    }
    room[upperRow][1]->dust = 0;
    // (3-2) lowerCleaner
    for(int i = lowerRow+1 ; i < r-1 ; i++) {
        room[i][0]->dust = room[i+1][0]->dust;
    }
    for(int i = 0 ; i < c-1 ; i++) {
        room[r-1][i]->dust = room[r-1][i+1]->dust;
    }
    for(int i = r-1 ; i > lowerRow ; i--) {
        room[i][c-1]->dust = room[i-1][c-1]->dust;
    }
    for(int i = c-1 ; i > 1 ; i--) {
        room[lowerRow][i]->dust = room[lowerRow][i-1]->dust;
    }
    room[lowerRow][1]->dust = 0;
}

int sum(const vector<vector<Place*>>& room, int r, int c) {
    int sum = 0;
    for(int i = 0 ; i < r ; i++) {
        for(int j = 0 ; j < c ; j++) {
            if(room[i][j]->dust != -1) sum += room[i][j]->dust;
        }
    }
    return sum;
}

int main() {
    int r, c, t;
    cin >> r >> c >> t;
    vector<vector<Place*>> room(r, vector<Place*>(c));
    Place* upperCleaner;
    int upperRow;
    Place* lowerCleaner;
    int lowerRow;
    bool isFirstCleaner = true;
    for(int i = 0 ; i < r ; i++) {
        for(int j = 0 ; j < c ; j++) {
            room[i][j] = new Place();
            cin >> room[i][j]->dust;
            room[i][j]->turnOver = 0;
            if(room[i][j]->dust == -1) {
                if(isFirstCleaner) {
                    upperCleaner = room[i][j];
                    upperRow = i;
                    isFirstCleaner = false;
                }
                else {
                    lowerCleaner = room[i][j];
                    lowerRow = i;
                }
            }
        }
    }

    for(int i = 0 ; i < t ; i++) {
        simulate(room, r, c, upperCleaner, upperRow, lowerCleaner, lowerRow);
    }
    cout << sum(room, r, c);
}
```

[def]: https://www.acmicpc.net/problem/17144