---
layout: post
title: "[데일리 백준] 17825"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-10
last_modified_at: 2025-03-10
---
## Gold
### [17825][def]

```c++
#include <iostream>
#include <vector>
#define ARRIVED 32
using namespace std;

typedef struct Place {
    int index;
    int score;
    bool onPlayer = false;
    vector<Place*> nexts;
} Place;

void makeBoard(vector<Place>& board) {
    for(int i = 0 ; i <= ARRIVED ; i++) board[i].index = i;
    for(int i = 0 ; i <= 20 ; i++) board[i].score = i * 2;
    board[21].score = 13; board[22].score = 16; board[23].score = 19;
    board[24].score = 25;
    board[25].score = 22; board[26].score = 24;
    board[27].score = 28; board[28].score = 27; board[29].score = 26;
    board[30].score = 30; board[31].score = 35; board[ARRIVED].score = 0;
    for(int i = 0 ; i <= 20 ; i++) {
        if(i == 5 || i == 10 || i == 15) continue;
        for(int j = 1 ; j <= 5 ; j++) {
            int next = (i + j > 20) ? ARRIVED : i + j;
            board[i].nexts.push_back(&board[next]);
        }
    }
    // left -> center
    board[5].nexts.push_back(&board[21]); board[5].nexts.push_back(&board[22]); board[5].nexts.push_back(&board[23]); board[5].nexts.push_back(&board[24]); board[5].nexts.push_back(&board[30]);
    board[21].nexts.push_back(&board[22]); board[21].nexts.push_back(&board[23]); board[21].nexts.push_back(&board[24]); board[21].nexts.push_back(&board[30]); board[21].nexts.push_back(&board[31]);
    board[22].nexts.push_back(&board[23]); board[22].nexts.push_back(&board[24]); board[22].nexts.push_back(&board[30]); board[22].nexts.push_back(&board[31]); board[22].nexts.push_back(&board[20]);
    board[23].nexts.push_back(&board[24]); board[23].nexts.push_back(&board[30]); board[23].nexts.push_back(&board[31]); board[23].nexts.push_back(&board[20]); board[23].nexts.push_back(&board[ARRIVED]);
    // center
    board[24].nexts.push_back(&board[30]); board[24].nexts.push_back(&board[31]); board[24].nexts.push_back(&board[20]); board[24].nexts.push_back(&board[ARRIVED]); board[24].nexts.push_back(&board[ARRIVED]);
    // down -> center
    board[10].nexts.push_back(&board[25]); board[10].nexts.push_back(&board[26]); board[10].nexts.push_back(&board[24]); board[10].nexts.push_back(&board[30]); board[10].nexts.push_back(&board[31]);
    board[25].nexts.push_back(&board[26]); board[25].nexts.push_back(&board[24]); board[25].nexts.push_back(&board[30]); board[25].nexts.push_back(&board[31]); board[25].nexts.push_back(&board[20]);
    board[26].nexts.push_back(&board[24]); board[26].nexts.push_back(&board[30]); board[26].nexts.push_back(&board[31]); board[26].nexts.push_back(&board[20]); board[26].nexts.push_back(&board[ARRIVED]);
    // right -> center
    board[15].nexts.push_back(&board[27]); board[15].nexts.push_back(&board[28]); board[15].nexts.push_back(&board[29]); board[15].nexts.push_back(&board[24]); board[15].nexts.push_back(&board[30]);
    board[27].nexts.push_back(&board[28]); board[27].nexts.push_back(&board[29]); board[27].nexts.push_back(&board[24]); board[27].nexts.push_back(&board[30]); board[27].nexts.push_back(&board[31]);
    board[28].nexts.push_back(&board[29]); board[28].nexts.push_back(&board[24]); board[28].nexts.push_back(&board[30]); board[28].nexts.push_back(&board[31]); board[28].nexts.push_back(&board[20]);
    board[29].nexts.push_back(&board[24]); board[29].nexts.push_back(&board[30]); board[29].nexts.push_back(&board[31]); board[29].nexts.push_back(&board[20]); board[29].nexts.push_back(&board[ARRIVED]);
    // center -> up
    board[30].nexts.push_back(&board[31]); board[30].nexts.push_back(&board[20]); board[30].nexts.push_back(&board[ARRIVED]); board[30].nexts.push_back(&board[ARRIVED]); board[30].nexts.push_back(&board[ARRIVED]);
    board[31].nexts.push_back(&board[20]); board[31].nexts.push_back(&board[ARRIVED]); board[31].nexts.push_back(&board[ARRIVED]); board[31].nexts.push_back(&board[ARRIVED]); board[31].nexts.push_back(&board[ARRIVED]);
}

void backtracking(vector<Place>& board, vector<int>& players,
vector<int>& dice, int dice_index, int score, int& max_score) {
    max_score = max(max_score, score);
    if(dice_index == 10) return;
    for(int& player : players) {
        if(player == ARRIVED) continue;
        int temp = player;
        Place* next = board[player].nexts[dice[dice_index]-1];
        player = next->index;
        if(next->onPlayer) {
            player = temp;  // restore
            continue;
        }
        if(next->score != 0) next->onPlayer = true;
        board[temp].onPlayer = false;
        backtracking(board, players, dice, dice_index+1, score + next->score, max_score);
        // restore
        next->onPlayer = false;
        board[temp].onPlayer = true;
        player = temp;
    }
}
int main() {
    vector<int> dice(10);
    for(int i = 0 ; i < 10 ; i++) cin >> dice[i];
    vector<Place> board(ARRIVED+1);  // 32 : arrived
    makeBoard(board);
    vector<int> players(4, 0);
    int max_score = 0;
    backtracking(board, players, dice, 0, 0, max_score);
    cout << max_score;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 백트래킹 (노가다를 곁들인)  

- 백트래킹 재귀 호출 시 설정+복원 할 데이터를 잘 정하고 빠뜨리지 않도록 주의  

</div>
</details>

[def]: https://www.acmicpc.net/problem/17825