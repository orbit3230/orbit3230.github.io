---
layout: post
title: "[데일리 백준] 2776"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-14
last_modified_at: 2024-06-14
---
## Silver
### [2776][def]

```c++
#include <iostream>
#include <unordered_set>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    int n;
    int m;
    for(int i = 0 ; i < t ; i++) {
        cin >> n;
        int next;
        unordered_set<int> watches;
        for(int j = 0 ; j < n ; j++) {
            cin >> next;
            watches.insert(next);
        }
        
        cin >> m;
        for(int j = 0 ; j < m ; j++) {
            cin >> next;
            if(watches.find(next) != watches.end()) {
                cout << 1 << '\n';
            }
            else {
                cout << 0 << '\n';
            }
        }
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- `unordered_set`을 사용하면 어떠한 element가 존재하는 지를 찾을 때  
`find()` 메소드를 사용하면 시간 복잡도가 `O(1)`이라고 한다.  

  - `find()` 메소드는 찾은 위치의 iterator를 반환하고, 찾지 못하였을 경우 끝을 가리키는 iterator를 반환.  

</div>
</details>  

<br>

- 하지만 이분탐색 STL 메소드를 사용하면 더 빠르다. (600ms / unordered_set : 900ms)  

  - 안타깝게도 직접 구현한 이분탐색 메소드는 통과에 실패했다 . . .

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    int n;
    int m;
    vector<int> watches;
    for(int i = 0 ; i < t ; i++) {
        watches.clear();
        cin >> n;
        int next;
        for(int j = 0 ; j < n ; j++) {
            cin >> next;
            watches.push_back(next);
        }
        sort(watches.begin(), watches.end());
        
        cin >> m;
        for(int j = 0 ; j < m ; j++) {
            cin >> next;
            if(binary_search(watches.begin(), watches.end(), next)) {
                cout << 1 << '\n';
            }
            else {
                cout << 0 << '\n';
            }
        }
    }
}
```

[def]: https://www.acmicpc.net/problem/2776