---
layout: post
title: "[데일리 백준] 1012"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-06
last_modified_at: 2024-05-06
---
## Silver
### [1012][def]

```c++
#include <iostream>
using namespace std;

int need; // 필요한 지렁이 개수
int secure; // 보호한 배추 개수 (until k)

// 하나의 지렁이가 이동하며 배추를 보호
void moveSecure(int r, int c, int n, int m, bool** vege, bool** checking) {
    checking[r][c] = true;
    secure++;
    // 조건식의 의미는, 배추가 심어져있는데 아직 방문하지 않은 곳
    if(r-1 >= 0 && vege[r-1][c] == true && checking[r-1][c] == false) {
        moveSecure(r-1, c, n, m, vege, checking);
    }
    if(r+1 < n && vege[r+1][c] == true && checking[r+1][c] == false) {
        moveSecure(r+1, c, n, m, vege, checking);
    }
    if(c-1 >= 0 && vege[r][c-1] == true && checking[r][c-1] == false) {
        moveSecure(r, c-1, n, m, vege, checking);
    }
    if(c+1 < m && vege[r][c+1] == true && checking[r][c+1] == false) {
        moveSecure(r, c+1, n, m, vege, checking);
    }
}
// 보호할 배추를 탐색하는 함수.
void check(int n, int m, bool** vege, bool** checking, int k) {
    for(int r = 0 ; r < n ; r++) {
        for(int c = 0 ; c < m ; c++) {
            // 조건식의 의미는, 배추가 심어져있는데 아직 방문하지 않은 곳
            if(vege[r][c] == true && checking[r][c] == false) {
                need++;
                moveSecure(r, c, n, m, vege, checking);
                // 다 보호했다면 탐색 조기 종료
                if(secure == k)
                    return;
            }
        }
    }
}

int main() {
    int t;
    cin >> t;
    int m, n, k;
    for(int i = 0 ; i < t ; i++) {
        cin >> m >> n >> k;
        // memory allocation
        bool** vege = new bool*[n];
        bool** checking = new bool*[n];
        for(int r = 0 ; r < n ; r++) {
            vege[r] = new bool[m];
            checking[r] = new bool[m];
            // initialize
            for(int c = 0 ; c < m ; c++) {
                vege[r][c] = false;
                checking[r][c] = false;
            }
        }
        // coordinate input
        int x, y;
        for(int j = 0 ; j < k ; j++) {
            cin >> x >> y;
            vege[y][x] = true;
        }

        need = 0;
        secure = 0;
        check(n, m, vege, checking, k);
        cout << need << endl;

        // memory deallocation
        for(int r = 0 ; r < n ; r++) {
            delete[] vege[r];
            delete[] checking[r];
        }
        delete[] vege;
        delete[] checking;
    }
    
}
```

[def]: https://www.acmicpc.net/problem/1012