---
layout: post
title: "[데일리 백준] 1158"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-19
last_modified_at: 2024-05-19
---
## Silver
### [1158][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;

    // index of 0 -> not used
    bool circle[n+1];
    for(int i = 0 ; i < n+1 ; i++)
        circle[i] = true;

    cout << "<";
    int next = 0;
    for(int i = 0 ; i < n ; i++) {
        for(int count = 0 ; count < k ; count++) {
            next = (next != n) ? next+1 : 1;
            if(!circle[next])
                count--;
        }
        circle[next] = false;
        if(i != n-1)
            cout << next << ", ";
        else
            cout << next;
    }
    cout << ">";
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- C++에서 배열을 초기화할 때,  
`bool circle[n+1] = {true, }` 와 같이 초기화 해주는 방식은  
모두 `true`로 초기화하는 것이 아닌, 첫 원소만 `true`, 나머지는 default인 `false`로 초기화 한다.  
`bool` 타입의 default가 `false`임에 또 유의하고, 배열의 초기화 방식을 remind 하자.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1158