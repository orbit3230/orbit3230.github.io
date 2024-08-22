---
layout: post
title: "[데일리 백준] 2239"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-22
last_modified_at: 2024-08-22
---
## Gold

- 오늘 두 문제는 같은 스도쿠 문제입니다. (입출력 형식만 다름)

### [2239][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Block {
    short x;
    short y;
    short value;
} Block;

vector<int> check(vector<vector<Block>>& sudoku, int x_, int y_) {
    vector<bool> check(10, true);
    vector<int> availables;
    for(int i = 0 ; i < 9 ; i++) {
        check[sudoku[x_][i].value] = false;  // 가로
        check[sudoku[i][y_].value] = false;  // 세로
    }
    // 소속하는 3x3의 좌측 상단으로 좌표 이동
    x_ = x_ / 3 * 3;
    y_ = y_ / 3 * 3;
    for(int i = x_ ; i < x_ + 3 ; i++) {
        for(int j = y_ ; j < y_ + 3 ; j++) {
            check[sudoku[i][j].value] = false;
        }
    }
    for(int i = 1 ; i <= 9 ; i++) {
        if(check[i]) availables.push_back(i);
    }
    return availables;
}

bool play(vector<vector<Block>>& sudoku, vector<Block*> fills, int fill_index) {
    if(fill_index == fills.size()) {  // 종료 조건
        for(int i = 0 ; i < 9 ; i++) {
            for(int j = 0 ; j < 9 ; j++) {
                cout << sudoku[i][j].value;
            }
            cout << '\n';
        }
        return true;
    }
    int x_ = fills[fill_index]->x;
    int y_ = fills[fill_index]->y;
    vector<int> availables = check(sudoku, x_, y_);
    for(int trying : availables) {
        sudoku[x_][y_].value = trying;
        if(!play(sudoku, fills, fill_index+1)) sudoku[x_][y_].value = 0;
        else return true;
    }
    // 이 곳에 도달했다면 진행이 불가한 상태, 되돌려야한다. (백트래킹)
    return false;
}

int main() {
    vector<vector<Block>> sudoku(9, vector<Block>(9));
    vector<Block*> fills;  // 채워야 할 곳의 좌표를 저장
    string input;
    for(int i = 0 ; i < 9 ; i++) {
        cin >> input;
        for(int j = 0 ; j < 9 ; j++) {
            sudoku[i][j].x = i;
            sudoku[i][j].y = j;
            sudoku[i][j].value = input[j] - '0';
            if(sudoku[i][j].value == 0) {
                fills.push_back(&sudoku[i][j]);
            }
        }
    }

    play(sudoku, fills, 0);
}
```

### [2580][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Block {
    short x;
    short y;
    short value;
} Block;

vector<int> check(vector<vector<Block>>& sudoku, int x_, int y_) {
    vector<bool> check(10, true);
    vector<int> availables;
    for(int i = 0 ; i < 9 ; i++) {
        check[sudoku[x_][i].value] = false;  // 가로
        check[sudoku[i][y_].value] = false;  // 세로
    }
    // 소속하는 3x3의 좌측 상단으로 좌표 이동
    x_ = x_ / 3 * 3;
    y_ = y_ / 3 * 3;
    for(int i = x_ ; i < x_ + 3 ; i++) {
        for(int j = y_ ; j < y_ + 3 ; j++) {
            check[sudoku[i][j].value] = false;
        }
    }
    for(int i = 1 ; i <= 9 ; i++) {
        if(check[i]) availables.push_back(i);
    }
    return availables;
}

bool play(vector<vector<Block>>& sudoku, vector<Block*> fills, int fill_index) {
    if(fill_index == fills.size()) {  // 종료 조건
        for(int i = 0 ; i < 9 ; i++) {
            for(int j = 0 ; j < 9 ; j++) {
                cout << sudoku[i][j].value << ' ';
            }
            cout << '\n';
        }
        return true;
    }
    int x_ = fills[fill_index]->x;
    int y_ = fills[fill_index]->y;
    vector<int> availables = check(sudoku, x_, y_);
    for(int trying : availables) {
        sudoku[x_][y_].value = trying;
        if(!play(sudoku, fills, fill_index+1)) sudoku[x_][y_].value = 0;
        else return true;
    }
    // 이 곳에 도달했다면 진행이 불가한 상태, 되돌려야한다. (백트래킹)
    return false;
}

int main() {
    vector<vector<Block>> sudoku(9, vector<Block>(9));
    vector<Block*> fills;  // 채워야 할 곳의 좌표를 저장
    for(int i = 0 ; i < 9 ; i++) {
        for(int j = 0 ; j < 9 ; j++) {
            cin >> sudoku[i][j].value;
            sudoku[i][j].x = i;
            sudoku[i][j].y = j;
            if(sudoku[i][j].value == 0) {
                fills.push_back(&sudoku[i][j]);
            }
        }
    }

    play(sudoku, fills, 0);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 백트래킹.  

- 백트래킹같은 재귀함수에서도 레퍼런스를 쓸 수 있다니!  
원본으로 되돌리기 위해 `0`(기본값)으로 되돌리면서 리턴해나가는 방식이 신박했다.  
시간을 절반으로 줄일 수 있었음!

</div>
</details>

[def]: https://www.acmicpc.net/problem/2239
[def2]: https://www.acmicpc.net/problem/2580