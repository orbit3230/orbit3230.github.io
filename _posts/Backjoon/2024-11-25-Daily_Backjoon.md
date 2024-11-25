---
layout: post
title: "[데일리 백준] 2549"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-25
last_modified_at: 2024-11-25
---
## Platinum
### [2549][def]

```c++
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

typedef struct Trace {
    bool rowOrCol;  // 0: row, 1: col
    int index;  // 1~4
    int offset;  // 1~3
} Trace;

int checking(const vector<vector<int>>& board, const vector<vector<int>>& result) {
    int miss_match = 0;
    for(int i = 0 ; i < 4 ; i++) {
        for(int j = 0 ; j < 4 ; j++) {
            if(board[i][j] != result[i][j]) miss_match++;
        }
    }
    return miss_match;
}
long long hashing(vector<vector<int>>& board) {
    long long hash = 0;
    for(int i = 0 ; i < 4 ; i++) {
        for(int j = 0 ; j < 4 ; j++) {
            hash <<= 4;
            hash |= (board[i][j]-1);
        }
    }
    return hash;
}
void turn_row(vector<vector<int>>& board, int row, int offset) {
    row--;  // 0-based index
    offset = 4 - offset;
    vector<int> new_row(4);
    for(int i = 0 ; i < 4 ; i++) new_row[i] = board[row][(i+offset)%4];
    for(int i = 0 ; i < 4 ; i++) board[row][i] = new_row[i];
}
void turn_col(vector<vector<int>>& board, int col, int offset) {
    col--;  // 0-based index
    offset = 4 - offset;
    vector<int> new_col(4);
    for(int i = 0 ; i < 4 ; i++) new_col[i] = board[(i+offset)%4][col];
    for(int i = 0 ; i < 4 ; i++) board[i][col] = new_col[i];
}
void backtracking(vector<vector<int>>& board, const vector<vector<int>>& result,
vector<Trace>& trace, vector<Trace>& result_trace, int step, int& min_step, unordered_map<long long, int>& visited) {
    int miss_match = checking(board, result);
    if(!miss_match) {
        min_step = min(min_step, step);
        result_trace = trace;
        return;
    }
    int lower_bound = (miss_match-1) / 4 + 1;
    if(step > 7) return;  // pruning (1)
    if(step + lower_bound >= min_step) return;  // pruning (2)
    // row-level
    long long hash;
    for(int i = 1 ; i <= 4 ; i++) {
        for(int offset = 1 ; offset <= 3 ; offset++) {
            turn_row(board, i, offset);
            Trace t = {0, i, offset};
            trace.push_back(t);
            // visited pruning (3)
            hash = hashing(board);
            if((visited.find(hash) != visited.end()) && (step+1 >= visited[hash])) goto Restore_r;
            visited[hash] = step+1;
            backtracking(board, result, trace, result_trace, step+1, min_step, visited);
            // restore
            Restore_r:
            turn_row(board, i, 4-offset);
            trace.pop_back();
        }
    }
    // col-level
    for(int i = 1 ; i <= 4 ; i++) {
        for(int offset = 1 ; offset <= 3 ; offset++) {
            turn_col(board, i, offset);
            Trace t = {1, i, offset};
            trace.push_back(t);
            // visited pruning
            hash = hashing(board);
            if((visited.find(hash) != visited.end()) && (step+1 >= visited[hash])) goto Restore_c;
            visited[hash] = step+1;
            // recursive call
            backtracking(board, result, trace, result_trace, step+1, min_step, visited);
            // restore
            Restore_c:
            turn_col(board, i, 4-offset);
            trace.pop_back();
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    vector<vector<int>> board(4, vector<int>(4));
    vector<vector<int>> result(4, vector<int>(4));
    for(int i = 0 ; i < 4 ; i++) {
        for(int j = 0 ; j < 4 ; j++) {
            cin >> board[i][j];
            result[i][j] = i*4+j+1;
        }
    }
    int min_step = 8;
    vector<Trace> result_trace;
    vector<Trace> trace;
    unordered_map<long long, int> visited;
    visited.insert({hashing(board), 0});
    backtracking(board, result, trace, result_trace, 0, min_step, visited);
    
    cout << min_step << '\n';
    for(Trace t : result_trace) {
        cout << t.rowOrCol+1 << ' ' << t.index << ' ' << t.offset << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Backtracking 심화 문제.

- 일치하지 않는 타일의 개수와 4의 배수의 관계에 주목하여 pruning을 수행하는게 핵심.  
Algorithm Presentation으로 선택한 문제이므로, 설명은 간략하게 하겠습니다.

- 조금의 [기교를 부려][def2] [시간을 줄여보기도][def3] 했는데, 위 코드가 그나마 단정한 것 같다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2549
[def2]: https://www.acmicpc.net/source/86850126
[def3]: https://www.acmicpc.net/source/86848613