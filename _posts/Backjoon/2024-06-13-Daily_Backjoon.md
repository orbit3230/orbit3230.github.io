---
layout: post
title: "[데일리 백준] 29702"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-13
last_modified_at: 2024-06-13
---
## Silver
### [29702][def]

```c++
#include <iostream>
using namespace std;

/// @brief 몇 번째 방인지 주어지면, 해당 방이 몇층 몇호인지 알려주는 함수.
/// @param roomNum 몇 번째 방인지
/// @return int[층, 호]
long long* findFloor(long long roomNum) {
    int floor = 1;
    long long room;
    long long power = 1;
    while(power * 2 <= roomNum) {
        floor++;
        power *= 2;
    }
    room = roomNum - power + 1;

    long long *result = new long long[2];
    result[0] = floor;
    result[1] = room;
    return result;
}

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    int t;
    cin >> t;

    long long n;
    long long *floor_and_room;
    int floor;
    long long room;
    string room_str;
    for(int i = 0 ; i < t ; i++) {
        cin >> n;
        floor_and_room = findFloor(n);
        floor = floor_and_room[0];
        room = floor_and_room[1];
        while(floor != 0) {
            cout << floor;
            room_str = to_string(room);
            for(int i = 0 ; i < 18-(room_str.size()) ; i++) {
                cout << '0';
            }
            cout << room << '\n';
            floor -= 1;
            room = (room+1)/2;
        }
    }
}
```

[def]: https://www.acmicpc.net/problem/29702