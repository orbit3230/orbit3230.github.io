---
layout: post
title: "[데일리 백준] 7662"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-06
last_modified_at: 2024-09-06
---
## Gold
### [7662][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Data {
    int value;
    bool deleted;
} Data;

struct Compare1 {
    bool operator()(const Data* a, const Data* b) {
        return a->value < b->value;
    }
};
struct Compare2 {
    bool operator()(const Data* a, const Data* b) {
        return a->value > b->value;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    for(int i = 0 ; i < t ; i++) {
        int k;
        cin >> k;
        priority_queue<Data*, vector<Data*>, Compare1> maxQueue;
        priority_queue<Data*, vector<Data*>, Compare2> minQueue;
        for(int j = 0 ; j < k ; j++) {
            char command; int value;
            cin >> command >> value;
            if(command == 'I') {
                Data* data = new Data();
                data->value = value;
                data->deleted = false;
                maxQueue.push(data);
                minQueue.push(data);
                continue;
            }
            if(value == 1) {
                while(!maxQueue.empty() && maxQueue.top()->deleted) {  // 이미 버려진 쓰레기 제거
                    maxQueue.pop();
                }
                if(!maxQueue.empty()) {
                    maxQueue.top()->deleted = true;
                    maxQueue.pop();
                }
            }
            else {
                while(!minQueue.empty() && minQueue.top()->deleted) {  // 이미 버려진 쓰레기 제거
                    minQueue.pop();
                }
                if(!minQueue.empty()) {
                    minQueue.top()->deleted = true;
                    minQueue.pop();
                }
            }
        }
        while(!maxQueue.empty() && maxQueue.top()->deleted) {  // 쓰레기 제거
            maxQueue.pop();
        }
        while(!minQueue.empty() && minQueue.top()->deleted) {  // 쓰레기 제거
            minQueue.pop();
        }
        if(maxQueue.empty()) cout << "EMPTY" << '\n';
        else cout << maxQueue.top()->value << ' ' << minQueue.top()->value << '\n';
    }
}

```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 이중 우선순위 큐.

- 생각보다 시간 복잡도가 괜찮은 코드이다.  
원소마다 쓰레기 제거 행위는 한번씩만 일어나기 때문에, 큐의 개수가 두 개이므로 시간복잡도가 `O(2N)`, 즉 `O(N)` 에 불과하다.  

- 이전에 포인터를 저장하는 우선순위 큐의 경우 우선순위를 지정할 때 비교함수를 부여해야 하기 때문에 `decltype(람다함수)` 방식을 얘기했었다.  
[참고 포스팅][def2]  

  - 그러나 본인은 람다함수의 사용이 불편해서 구조체 속에 비교 함수를 선언하는 방식을 찾았다.  
  이 방식을 잘 기억해 두는 게 좋을 것 같다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/7662
[def2]: https://orbit3230.github.io/2024/08/11/Daily_Backjoon/