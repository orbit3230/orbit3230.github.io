---
layout: post
title: "[데일리 백준] 11047"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-04
last_modified_at: 2024-06-04
---
## Silver
### [11047][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> q;
    for(int i = 1 ; i <= n ; i++) {
        q.push_back(i);
    }
    int sum = 0;
    for(int i = 0 ; i < m ; i++) {
        int find;
        cin >> find;
        int count = 0;
        while(true) {
            vector<int>::iterator it = q.begin();
            int point = *it;
            if(find == point) {
                q.erase(it);
                break;
            }
            // 일단은 무지성으로 왼쪽으로 돌리고,
            // 만약 오른쪽방향이 효율적이었는지는 후에 판단
            else {
                q.erase(it);
                q.push_back(point);
                count++;
            }
        }
        // 오른쪽으로 돌리는게 더 효율적이다면..
        if(count > (q.size()+1) / 2)
            count = (q.size()+1) - count;

        sum += count;
    }

    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- `erase(iterator)` 함수는 element 삭제 후  
iterator가 더 이상 유효하지 않은 데이터를 가리키게 되기 때문에,  
삭제한 다음의 데이터를 가리키는 iterator를 새로 return해준다.  

- `push` 함수가 실행된 후에는 iterator가 더 이상 유효하지 않게 될 수 있기 때문에,  
새로운 iterator 할당이 필요하다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/11047