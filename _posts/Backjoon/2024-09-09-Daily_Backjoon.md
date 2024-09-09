---
layout: post
title: "[데일리 백준] 3015"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-09
last_modified_at: 2024-09-09
---
## Platinum
### [3015][def]

```c++
#include <iostream>
#include <stack>
using namespace std;

typedef struct Person {
    int height;
    int same_height;  // 왼쪽에 자신을 "볼 수 있는" 키가 같은 사람의 수
} Person;
// https://i.imgur.com/W9tqYZz.jpeg <- 알고리즘 분석
int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    stack<Person> s;
    int input;
    long long count = 0;
    for(int i = 0 ; i < n ; i++) {
        Person p;
        cin >> p.height;
        p.same_height = 1;
        while(!s.empty() && s.top().height <= p.height) {
            count += s.top().same_height;  // 같은 키도 제거하므로, 같은 키의 객체는 unique하다.
            if(s.top().height == p.height) {
                p.same_height = s.top().same_height + 1;
            }
            s.pop();
        }
        if(!s.empty()) {  // 자신보다 키가 큰 사람이 앞에 존재한다면, 인사를 오지게 박는다.
            count++;
        }
        s.push(p);
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 스택을 센스있게 활용해야 하는 문제.  

- 나는 처음엔 [옥상문제][def2]와 유사한 문제인 줄 알았다.  
그래서 스택의 크기에 초점을 두고 문제를 해결하려 했으나,  
해당 방식의 경우 입력이 오목한 그래프(U) 모양으로 주어질 경우 필요한 정보가 유실되는 문제가 있었다.  

- 결국 이 문제의 핵심은 `height`가 같은 연속된, 혹은 따로 떨어져 있으나 중간 방해물이 없는,  
즉 `height`가 같으면서 서로 볼 수 있는 경우에 대한 적절한 처리였다.  

- 이에 대한 알고리즘의 단계별 설명이다.  
![algorithm][def3]

</div>
</details>

[def]: https://www.acmicpc.net/problem/3015
[def2]: https://www.acmicpc.net/problem/6198
[def3]: https://i.imgur.com/W9tqYZz.jpeg