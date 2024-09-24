---
layout: post
title: "[데일리 백준] 3986, 2075, 10799, 13335, 12865"
excerpt: "4 Silver, 1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-24
last_modified_at: 2024-09-24
---
## Silver
### [3986][def2]

```c++
#include <iostream>
#include <stack>
using namespace std;

bool isGood(string input) {
    stack<char> s;
    for(size_t i = 0 ; i < input.size() ; i++) {
        if(!s.empty() && s.top() == input[i]) {
            s.pop();
            continue;
        }
        s.push(input[i]);
    }
    return (s.empty()) ? true : false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    string input;
    int count = 0;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        if(isGood(input)) count++;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 쉬운 스택 문제.

</div>
</details>

### [2075][def3]

```c++
#include <iostream>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    priority_queue<int, vector<int>, greater<int>> pq;
    int input;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> input;
            pq.push(input);
        }
        while(pq.size() != n) pq.pop();
    }
    cout << pq.top();
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 쉬운 우선순위 큐 문제

- 메모리 주의

</div>
</details>

### [10799][def4]

```c++
#include <iostream>
#include <stack>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    string input;
    cin >> input;
    stack<int> sticks;
    size_t index = 0;
    int count = 0;
    while(index < input.size()) {
        char next = input[index++];
        if(next == '(') {
            // Lazer
            if(input[index] == ')') {
                if(!sticks.empty()) sticks.top()++;
                index++;
            }
            // new Stick
            else sticks.push(0);
        }
        // stick end ( ')' )
        else {
            int lazer_inside = sticks.top();
            sticks.pop();
            if(!sticks.empty()) sticks.top() += lazer_inside;
            count += lazer_inside+1;  // piece = lazer + 1
        }
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 스택을 적절히 활용해야 하는 문제

- Segfault 조심!

</div>
</details>

### [13335][def5]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Truck {
    int weight;
    int ETA;  // What's your ETA
} Truck;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, w, l;
    cin >> n >> w >> l;
    queue<Truck> bridge;
    int onBridge = 0;
    int time = 0;
    int truck;
    for(int i = 0 ; i < n ; i++) {
        time++;
        Truck next;
        cin >> next.weight;
        onBridge += next.weight;
        while (onBridge > l) {  // 투입 불가능, time flows
            time = bridge.front().ETA;
            onBridge -= bridge.front().weight;
            bridge.pop();
        }
        next.ETA = time + w;  // 도착 예정시간은 현재시각 + 다리 길이
        bridge.push(next);
        if(bridge.front().ETA == time) {  // 자연스레 시간이 다 되어 나가는 트럭 처리
            onBridge -= bridge.front().weight;
            bridge.pop();
        }
    }
    while(!bridge.empty()) {
        time = bridge.front().ETA;
        bridge.pop();
    }
    cout << time;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 큐를 활용하는 재미있는 시뮬레이션 문제.

</div>
</details>

## Gold
### [12865][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Object {
    int weight;
    short value;
} Object;
// 행 단위 배열 메모리 접근. 이게 더 빠를 것이다.
void dp(vector<vector<int>>& dpTable, vector<Object>& list, int n, int k) {
    int startCol = list[0].weight;
    // outofbounds 방지를 위해 첫 열은 직접 초기화
    for(int j = startCol ; j < k+1 ; j++) {
        dpTable[0][j] = list[0].value;
    }
    // dpTable 완성
    for(int i = 1 ; i < n ; i++) {
        startCol = min(startCol, list[i].weight);
        for(int j = startCol ; j < k+1 ; j++) {
            if(j < list[i].weight || dpTable[i-1][j] >= dpTable[i-1][j-list[i].weight] + list[i].value) {
                dpTable[i][j] = dpTable[i-1][j];
                continue;
            }
            dpTable[i][j] = dpTable[i-1][j-list[i].weight] + list[i].value;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    vector<vector<int>> dpTable(n, vector<int>(k+1, 0));
    vector<Object> list(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> list[i].weight >> list[i].value;
    }

    dp(dpTable, list, n, k);
    cout << dpTable[n-1][k];
}
```

- 실행 시간 : 44ms

<details>
<summary>코멘트</summary>
<div markdown="1">

- 오늘은 추가적인 DP 학습을 위하여 배낭 문제를 공부해 보았다.  

- 추가적으로, 아래처럼 열 단위 배열 메모리 접근을 하게되면  
메모리의 contiguous한 특성때문에 백준 기준 3배의 시간 차이가 발생한다. (더 느리다)  

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Object {
    int weight;
    short value;
} Object;
// 열 단위 배열 메모리 접근을 해볼 것이다. (시간 테스트)
void dp(vector<vector<int>>& dpTable, vector<Object>& list, int k, int n) {
    int startRow = list[0].weight;
    // outofbounds 방지를 위해 첫 열은 직접 초기화
    for(int i = startRow ; i < k+1 ; i++) {
        dpTable[i][0] = list[0].value;
    }
    // dpTable 완성
    for(int j = 1 ; j < n ; j++) {
        startRow = min(startRow, list[j].weight);
        for(int i = startRow ; i < k+1 ; i++) {
            if(i < list[j].weight || dpTable[i][j-1] >= dpTable[i-list[j].weight][j-1] + list[j].value) {
                dpTable[i][j] = dpTable[i][j-1];
                continue;
            }
            dpTable[i][j] = dpTable[i-list[j].weight][j-1] + list[j].value;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    vector<vector<int>> dpTable(k+1, vector<int>(n, 0));
    vector<Object> list(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> list[i].weight >> list[i].value;
    }

    dp(dpTable, list, k, n);
    cout << dpTable[k][n-1];
}
```

- 실행 시간 : 112ms

</div>
</details>

[def]: https://www.acmicpc.net/problem/12865
[def2]: https://www.acmicpc.net/problem/3986
[def3]: https://www.acmicpc.net/problem/2075
[def4]: https://www.acmicpc.net/problem/10799
[def5]: https://www.acmicpc.net/problem/13335