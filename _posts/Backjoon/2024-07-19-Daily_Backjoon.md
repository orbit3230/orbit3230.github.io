---
layout: post
title: "[데일리 백준] 11286"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-19
last_modified_at: 2024-07-19
---
## Silver
### [11286][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

class Element {
public:
    int x;
    bool operator<(const Element& other) const {
        if(abs(this->x) == abs(other.x)) return this->x > other.x;
        return abs(this->x) > abs(other.x);
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;

    int x;
    priority_queue<Element> pq;
    for(int i = 0 ; i < n ; i++) {
        cin >> x;
        if(x == 0) {
            if(pq.empty()) cout << 0 << '\n';
            else {
                cout << pq.top().x << '\n';
                pq.pop();
            }
        }
        else pq.push({x});
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- `priority_queue` 생성자 인자로 직접 람다함수를 주는 것도 안되고, 함수를 주는 것도 안된다고 해서  
클래스를 직접 만들어 `operator<`를 오버로딩 하는 식으로 문제를 해결해봤다.  
이 방법 말고, 비교 함수를 위한 구조체나 클래스를 만들어,  
`operator()` 를 오버로딩하고 Functor로 응용하는 방식이 있던데 차후에 기회 된다면 떠올려서 써봐야겠다.  

<br>

- (9/11 자 추가 내용) **코드를 재작성하였다**. (꼴보기 싫어서)  

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Element {
    int x;
    bool operator<(const Element& other) const {
        return (abs(this->x) == abs(other.x)) ? (this->x > other.x) : abs(this->x) > abs(other.x);
    }
} Element;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;

    int x;
    priority_queue<Element> pq;
    for(int i = 0 ; i < n ; i++) {
        cin >> x;
        if(x == 0) {
            if(pq.empty()) cout << 0 << '\n';
            else {
                cout << pq.top().x << '\n';
                pq.pop();
            }
        }
        else pq.push({x});
    }
}
```

</div>
</details>

[def]: https://www.acmicpc.net/problem/11286