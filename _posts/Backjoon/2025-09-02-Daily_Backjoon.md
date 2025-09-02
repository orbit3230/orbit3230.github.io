---
layout: post
title: "[데일리 백준] 14891"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-02
last_modified_at: 2025-09-02
---
## Gold
### [14891][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void clockwise(vector<int>& gear) {
    int temp = gear[7];
    for(int i = 7 ; i > 0 ; i--) gear[i] = gear[i-1];
    gear[0] = temp;
}
void counterClockwise(vector<int>& gear) {
    int temp = gear[0];
    for(int i = 0 ; i < 7 ; i++) gear[i] = gear[i+1];
    gear[7] = temp;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    vector<int> gear1(8);
    vector<int> gear2(8);
    vector<int> gear3(8);
    vector<int> gear4(8);
    string input;
    cin >> input;
    for(int i = 0 ; i < 8 ; i++) gear1[i] = input[i] - '0';
    cin >> input;
    for(int i = 0 ; i < 8 ; i++) gear2[i] = input[i] - '0';
    cin >> input;
    for(int i = 0 ; i < 8 ; i++) gear3[i] = input[i] - '0';
    cin >> input;
    for(int i = 0 ; i < 8 ; i++) gear4[i] = input[i] - '0';

    int k;
    cin >> k;
    int index, direction;
    while(k--) {
        cin >> index >> direction;
        switch(index) {
            case 1 : {
                switch(direction) {
                    case 1 : {
                        if(gear1[2] != gear2[6]) {
                            if(gear2[2] != gear3[6]) {
                                if(gear3[2] != gear4[6]) {
                                    counterClockwise(gear4);
                                } clockwise(gear3);
                            } counterClockwise(gear2);
                        } clockwise(gear1);
                        break;
                    }
                    case -1 : {
                        if(gear1[2] != gear2[6]) {
                            if(gear2[2] != gear3[6]) {
                                if(gear3[2] != gear4[6]) {
                                    clockwise(gear4);
                                } counterClockwise(gear3);
                            } clockwise(gear2);
                        } counterClockwise(gear1);
                        break;
                    }
                }
                break;
            }
            case 2 : {
                switch(direction) {
                    case 1 : {
                        if(gear2[6] != gear1[2]) counterClockwise(gear1);
                        if(gear2[2] != gear3[6]) {
                            if(gear3[2] != gear4[6]) {
                                clockwise(gear4);
                            } counterClockwise(gear3);
                        } clockwise(gear2);
                        break;
                    }
                    case -1 : {
                        if(gear2[6] != gear1[2]) clockwise(gear1);
                        if(gear2[2] != gear3[6]) {
                            if(gear3[2] != gear4[6]) {
                                counterClockwise(gear4);
                            } clockwise(gear3);
                        } counterClockwise(gear2);
                        break;
                    }
                }
                break;
            }
            case 3 : {
                switch(direction) {
                    case 1 : {
                        if(gear3[2] != gear4[6]) counterClockwise(gear4);
                        if(gear3[6] != gear2[2]) {
                            if(gear2[6] != gear1[2]) {
                                clockwise(gear1);
                            } counterClockwise(gear2);
                        } clockwise(gear3);
                        break;
                    }
                    case -1 : {
                        if(gear3[2] != gear4[6]) clockwise(gear4);
                        if(gear3[6] != gear2[2]) {
                            if(gear2[6] != gear1[2]) {
                                counterClockwise(gear1);
                            } clockwise(gear2);
                        } counterClockwise(gear3);
                        break;
                    }
                }
                break;
            }
            case 4 : {
                switch(direction) {
                    case 1 : {
                        if(gear4[6] != gear3[2]) {
                            if(gear3[6] != gear2[2]) {
                                if(gear2[6] != gear1[2]) {
                                    counterClockwise(gear1);
                                } clockwise(gear2);
                            } counterClockwise(gear3);
                        } clockwise(gear4);
                        break;
                    }
                    case -1 : {
                        if(gear4[6] != gear3[2]) {
                            if(gear3[6] != gear2[2]) {
                                if(gear2[6] != gear1[2]) {
                                    clockwise(gear1);
                                } counterClockwise(gear2);
                            } clockwise(gear3);
                        } counterClockwise(gear4);
                        break;
                    }
                }
                break;
            }
        }
    }
    int score = 0;
    if(gear1[0] == 1) score += 1;
    if(gear2[0] == 1) score += 2;
    if(gear3[0] == 1) score += 4;
    if(gear4[0] == 1) score += 8;
    cout << score;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Simulation

</div>
</details>

[def]: https://www.acmicpc.net/problem/14891