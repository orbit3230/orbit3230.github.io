---
layout: post
title: "[데일리 백준] 11053, 12015, 12738, 14002, 14003"
excerpt: "1 Silver, 2 Gold, 1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-27
last_modified_at: 2024-10-27
---
## Silver
### [11053][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> dpTable;
    // initialize
    int input;
    cin >> input;
    dpTable.push_back(input);

    for(int i = 1 ; i < n ; i++) {
        cin >> input;
        for(int& next : dpTable) {
            if(input <= next) {
                next = input;
                goto nextLoop;
            }
        }
        dpTable.push_back(input);
        nextLoop:
        continue;
    }
    cout << dpTable.size();
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍 - LIS(Longest Increasing Subsequence) 문제.

- 이 코드는 `O(n^2)` 시간복잡도 코드이다.  

</div>
</details>

<br>

## Gold
### [12015][def], [12738][def3]

```c++
#include <iostream>
#include <vector>
using namespace std;

// input보다 크거나 같은 값 중에서 가장 작은 값의 인덱스 반환
int binarySearch(vector<int>& dpTable, int input) {
    int left = 0;
    int right = dpTable.size()-1;
    int mid;
    int index = -1;
    while(left <= right) {
        mid = (left + right) / 2;
        if(dpTable[mid] < input) {
            left = mid + 1;
            continue;
        }
        index = mid;
        right = mid - 1;
    }
    return index;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> dpTable;
    // initialize
    int input;
    cin >> input;
    dpTable.push_back(input);

    for(int i = 1 ; i < n ; i++) {
        cin >> input;
        int index = binarySearch(dpTable, input);
        if(index == -1) dpTable.push_back(input);
        else dpTable[index] = input;
    }
    cout << dpTable.size();
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍- LIS(Longest Increasing Subsequence) 문제.

- Binary Search를 사용하여 시간 복잡도를 `O(nlogn)`로 줄인 코드이다.  

</div>
</details>

<br>

## Gold, Platinum
### [14002][def4], [14003][def5]

```c++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

// input보다 크거나 같은 값 중에서 가장 작은 값의 인덱스 반환
int binarySearch(vector<int>& dpTable, int input) {
    int left = 0;
    int right = dpTable.size()-1;
    int mid;
    int index = dpTable.size();
    while(left <= right) {
        mid = (left + right) / 2;
        if(dpTable[mid] < input) {
            left = mid + 1;
            continue;
        }
        index = mid;
        right = mid - 1;
    }
    return index;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<int> dpTable;
    vector<pair<int, int>> result; // 역추적을 위한 배열 {index, value}
    // initialize
    int input;
    cin >> input;
    dpTable.push_back(input);
    result.push_back({0, input});

    for(int i = 1 ; i < n ; i++) {
        cin >> input;
        int index = binarySearch(dpTable, input);
        if(index == dpTable.size()) dpTable.push_back(input);
        else dpTable[index] = input;
        result.push_back({index, input});
    }

    cout << dpTable.size() << '\n';
    // 역추적은 역순으로 진행한다. (마지막에 선택된 것을 고르기 위하여)
    stack<int> printing;
    int nextIndex = dpTable.size()-1;
    for(int i = result.size()-1 ; i >= 0 ; i--) {
        if(result[i].first == nextIndex) {
            printing.push(result[i].second);
            nextIndex--;
        }
    }
    while(!printing.empty()) {
        cout << printing.top() << ' ';
        printing.pop();
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍- LIS(Longest Increasing Subsequence) 문제.

- 역추적을 곁들인.

  - 역추적 시 마지막으로 선택된 것을 고르기 위해 반복문을 역순으로 돌면서 체크한다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/12015
[def2]: https://www.acmicpc.net/problem/11053
[def3]: https://www.acmicpc.net/problem/12738
[def4]: https://www.acmicpc.net/problem/14002
[def5]: https://www.acmicpc.net/problem/14003