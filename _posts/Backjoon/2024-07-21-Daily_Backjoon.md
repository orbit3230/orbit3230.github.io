---
layout: post
title: "[데일리 백준] 18870"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-21
last_modified_at: 2024-07-21
---
## Silver
### [18870][def]

```c++
#include <iostream>
#include <vector>
#include <set>
#include <map>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    set<int> s;
    vector<int> origin;
    int input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        origin.push_back(input);
        s.insert(input);
    }

    map<int, int> rankMap;
    int rank = 0;
    for(int num : s) {
        rankMap[num] = rank++;
    }

    for(int i = 0; i < n; i++) {
        cout << rankMap[origin[i]] << ' ';
    }
}
```


<details>
<summary>코멘트</summary>
<div markdown="1">

- 아래 코드는 시간 제한을 통과하지 못했다.  

  - `distance` 함수를 사용하면서 탐색을 시도한 것은 괜찮은 아이디어인 것 같았지만,  
  시간적으로 비효율적이었던 것 같다. (과도한 탐색)

  - 대신 `map`을 사용하여 인덱스를 기록함과 함께 한 번의 순차 탐색으로 끝내니 시간적으로 훨씬 효율적이었다.  

```c++
#include <iostream>
#include <vector>
#include <set>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    set<int> s;
    vector<int> origin;
    int input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        origin.push_back(input);
        s.insert(input);
    }
    for(int next : origin) {
        cout << distance(s.begin(), s.find(next)) << ' ';
    }
}
```

- 10/06 일 자 재풀이. 250ms 전후로 매우 빠른 코드이다.(백준 상위 0.1%)  

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Element {
    int value;
    int origin_order;
} Element;

bool compare(const Element& e1, const Element& e2) {
    return e1.value < e2.value;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<Element> list(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> list[i].value;
        list[i].origin_order = i;
    }
    sort(list.begin(), list.end(), compare);

    int rank = -1;
    int prev = INT32_MIN;
    vector<int> ordering(n);
    for(Element& e : list) {
        if(e.value != prev) rank++;
        ordering[e.origin_order] = rank;
        prev = e.value;
    }
    for(int order : ordering) cout << order << ' ';
}
```

</div>
</details>


[def]: https://www.acmicpc.net/problem/18870