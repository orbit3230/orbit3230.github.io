---
layout: post
title: "[데일리 백준] 1244"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-30
last_modified_at: 2024-04-30
---
## Silver
### [1244][def]

```c++
#include <iostream>
using namespace std;

void boySwitch(bool* switches, int s_index, int size) {
    int index = s_index;
    while(index <= size) {
        switches[index-1] = !switches[index-1]; // 스위치가 1부터 시작하므로
        index += s_index;
    }
}
void girlSwitch(bool* switches, int s_index, int size) {
    int index = s_index-1; // 스위치가 1부터 시작하므로
    int pair = 1;
    switches[index] = !switches[index];
    while(index - pair >= 0 && index + pair < size) {
        if(switches[index - pair] == switches[index + pair]) {
            switches[index - pair] = !switches[index - pair];
            switches[index + pair] = !switches[index + pair];
        }
        else
            break;
        pair++;
    }
}

int main() {
    int s_n;
    cin >> s_n;
    bool switches[s_n];
    for(int i = 0 ; i < s_n ; i++) {
        cin >> switches[i];
    }

    int n;
    cin >> n;

    int sex;
    int s_index;
    for(int i = 0 ; i < n ; i++) {
        cin >> sex;
        cin >> s_index;
        if(sex == 1) {
            boySwitch(switches, s_index, s_n);
        }
        else {
            girlSwitch(switches, s_index, s_n);
        }
    }

    for(int i = 0 ; i < s_n ; i++) {
        if(i % 20 == 0 && i != 0) cout << "\n";
        if(switches[i]) cout << "1 ";
        else cout << "0 ";
    }
}
```

[def]: https://www.acmicpc.net/problem/1244