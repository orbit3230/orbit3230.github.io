---
layout: post
title: "[데일리 백준] 2473"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-09
last_modified_at: 2024-08-09
---
## Gold
### [2473][def]

- 투 포인터에 대하여 공부하였음.

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Result {
    long long first;
    long long second;
    long long third;
} Result;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<long long> list;
    long long next;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        list.push_back(next);
    }
    sort(list.begin(), list.end());
    long long sum;
    long long min_abs = 3000000000;
    Result result;
    // 하나의 포인터(가장 작은 인덱스)를 고정시켜두고 반복하는 투포인터 방식
    for(int fixed = 0 ; fixed < n-2 ; fixed++) {
        int left = fixed+1;           // 왼쪽 포인터
        int right = n-1;   // 오른쪽 포인터
        while(left < right) {
            sum = list[fixed] + list[left] + list[right];
            if(sum == 0) {  // 조기 종료
                result = {list[fixed], list[left], list[right]};
                cout << result.first << ' ' << result.second << ' ' << result.third;
                return 0;
            }
            if(abs(sum) < min_abs) {
                min_abs = abs(sum);
                result = {list[fixed], list[left], list[right]};
            }
            if(sum < 0) {
                left++;
            }
            else {  // sum > 0
                right--;
            }
        }
    }

    cout << result.first << ' ' << result.second << ' ' << result.third;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 처음엔 투포인터를 한 사이클만 돌리면서, 가운데 `mid` 변수로 이분탐색을 시도했는데  
무언가 반례에 걸려 실패했다. (시간은 통과했을듯)  

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Result {
    long long first;
    long long second;
    long long third;
} Result;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<long long> list;
    long long next;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        list.push_back(next);
    }
    sort(list.begin(), list.end());
    int left = 0;           // 왼쪽 포인터
    int right = n-1;   // 오른쪽 포인터
    int mid;                 // 중간 포인터
    long long sum;
    long long min_abs = 3000000000;
    Result result;
    while(true) {
        mid = (left + right) / 2;
        if(mid <= left || mid >= right) break;
        int inflection = 0;  // 변곡점 (1: 왼쪽 -> 오른쪽, -1: 오른쪽 -> 왼쪽)
        bool move_left = false;
        bool move_right = false;
        while(mid > left && mid < right) {  // moving mid
            sum = list[left] + list[mid] + list[right];
            if(sum == 0) {
                result = {list[left], list[mid], list[right]};
                cout << result.first << ' ' << result.second << ' ' << result.third;
                return 0;
            }
            if(abs(sum) < min_abs) {
                min_abs = abs(sum);
                result = {list[left], list[mid], list[right]};
            }
            if(sum < 0) {
                if(inflection == -1) break;  // 공기의 흐름이 바뀌었다면 stop
                if(inflection == 0) {  // 첫 움직임
                    move_left = true;
                    inflection = 1;
                }
                mid++;
            }
            else {  // sum > 0
                if(inflection == 1) break;  // 공기의 흐름이 바뀌었다면 stop
                if(inflection == 0) {  // 첫 움직임
                    move_right = true;
                    inflection = -1;
                }
                mid--;
            }
        }
        if(move_left)  left++;
        if(move_right)  right--;
    }

    cout << result.first << ' ' << result.second << ' ' << result.third;
}
```

- 결국 가장 작은 인덱스를 고정시킨 후 투포인터를 `n`회 돌리며 풀었다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2473