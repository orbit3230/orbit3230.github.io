---
layout: post
title: "[데일리 백준] 1987, 1517"
excerpt: "1 Gold, 1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-02
last_modified_at: 2024-10-02
---
## Gold
### [1987][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int max_step = 0;

void dfs_search(vector<vector<char>>& board, int r, int c, int r_, int c_, int visited, int step) {
    max_step = max(max_step, step);
    // 방문 확인 방법 : 비트마스킹, 0이면 아직 방문하지 않은 새로운 알파벳
    if(r_ - 1 >= 0) {
        int up = visited & (1 << (board[r_-1][c_] - 'A'));
        if(!up) dfs_search(board, r, c, r_-1, c_, visited | (1 << (board[r_-1][c_] - 'A')), step+1);
    }
    if(r_ + 1 < r) {
        int down = visited & (1 << (board[r_+1][c_] - 'A'));
        if(!down) dfs_search(board, r, c, r_+1, c_, visited | (1 << (board[r_+1][c_] - 'A')), step+1);
    }
    if(c_ - 1 >= 0) {
        int left = visited & (1 << (board[r_][c_-1] - 'A'));
        if(!left) dfs_search(board, r, c, r_, c_-1, visited | (1 << (board[r_][c_-1] - 'A')), step+1);
    }
    if(c_ + 1 < c) {
        int right = visited & (1 << (board[r_][c_+1] - 'A'));
        if(!right) dfs_search(board, r, c, r_, c_+1, visited | (1 << (board[r_][c_+1] - 'A')), step+1);
    }
}

int main() {
    int r, c;
    cin >> r >> c;
    vector<vector<char>> board(r, vector<char>(c));
    for(int i = 0 ; i < r ; i++) {
        string line;
        cin >> line;
        for(int j = 0 ; j < c ; j++) board[i][j] = line[j];
    }
    dfs_search(board, r, c, 0, 0, (1 << board[0][0] - 'A'), 1);
    cout << max_step;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 간단한 dfs + 백트래킹 문제.

- 중복을 체크하는 방식으로 비트마스킹을 사용해보았다.  

</div>
</details>

<br>

## Platinum
### [1517][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

void merge_sort(vector<int>& list, int start, int end, long long& result, vector<int>& result_list) {
    if(start - end == 0) return;
    int mid = (start + end) / 2;
    merge_sort(list, start, mid, result, result_list);
    merge_sort(list, mid+1, end, result, result_list);
    int index = start;
    int left_index = start; int right_index = mid+1;
    while(left_index <= mid && right_index <= end) {
        if(list[left_index] <= list[right_index]) {
            result_list[index++] = list[left_index++];
        }
        else {
            result_list[index++] = list[right_index++];
            result += mid - left_index + 1;  // 왼쪽 배열에서 남은 개수, 즉 뛰어넘은 개수 만큼 swap이 일어난다.
        }
    }
    // 잔반 처리
    while(left_index <= mid) {
        result_list[index++] = list[left_index++];
    }
    while(right_index <= end) {
        result_list[index++] = list[right_index++];
    }
    for(int i = start ; i <= end ; i++) {
        list[i] = result_list[i];
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> list[i];
    }

    long long result = 0;
    vector<int> result_list(n);
    merge_sort(list, 0, n-1, result, result_list);
    cout << result;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Merge sort를 직접 구현해보는 문제.

- 버블 소트의 총 swap 횟수가 결국 머지 소트에서 오른쪽 배열의 element가 왼쪽 배열의 element들을 뛰어넘는 개수의 총합과 같기 때문이다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1987
[def2]: https://www.acmicpc.net/problem/1517