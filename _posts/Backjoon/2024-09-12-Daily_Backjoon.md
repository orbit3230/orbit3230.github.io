---
layout: post
title: "[데일리 백준] 6549, 1725*"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-12
last_modified_at: 2024-09-12
---
## Platinum
### [6549][def]

```c++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;
// (1) 스택의 top보다 input이 크면, fromIndex = 현재
//   (1-1) 그리고 스택에 push
// (2) 스택의 top보다 input이 작거나 같으면, fromIndex = {top의 fromIndex}
//   (2-1) input보다 더 큰 스택 내용물들은 모두 pop out
//   (2-2) pop out 시키는 원소들은 toIndex를 i-1로 업데이트
//   (2-3) 그리고 스택에 push
// (3) (1)-(2)를 반복하고, 반복이 끝나면 스택에 남은 모든 원소에 대해 toIndex를 end로 업데이트
typedef struct Stick {
    int index;
    int value;
    int fromIndex;  // 자신의 앞에서 자신보다 높이가 크거나 같은 연속된 막대 중 가장 작은 인덱스
    int toIndex;  // 자신의 뒤에서 자신보다 높이가 크거나 같은 연속된 막대 중 가장 큰 인덱스
} Stick;

int setFrom(vector<Stick*>& list, int fromIndex, int value) {
    if(fromIndex == 0) return 0;
    if(list[fromIndex-1]->value < value) return fromIndex;
    return setFrom(list, list[fromIndex-1]->fromIndex, value);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    while(cin >> n) {
        if(!n) break;
        vector<Stick*> list;  // 정보 저장을 위한 벡터
        stack<Stick*> s;
        int input;
        for(int i = 0 ; i < n ; i++) {
            Stick* stick = new Stick();
            stick->index = i;
            cin >> stick->value;
            stick->fromIndex = (s.empty() || stick->value > s.top()->value) ? i : setFrom(list, s.top()->fromIndex, stick->value);
            while(!s.empty() && s.top()->value > stick->value) {
                s.top()->toIndex = i-1;
                s.pop();
            }

            s.push(stick);
            list.push_back(stick);
        }
        while(!s.empty()) {
            s.top()->toIndex = n-1;
            s.pop();
        }
        long long maxArea = 0;
        long long area;
        for(int i = 0 ; i < n ; i++) {
            area = 1LL * list[i]->value * (list[i]->toIndex - list[i]->fromIndex + 1);
            if(maxArea < area) maxArea = area;
        }
        cout << maxArea << '\n';
    }   
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 스택을 활용하는 어려운 문제.

- 일단 최근에 스택 문제를 많이 풀어 봤음에도 불구하고 아이디어가 바로 막 떠오르지는 않았다.  

- 반례 찾는게 너무너무너무 어려웠다.  
40개 이상의 테스트 케이스를 통과했음에도 해결하지 못하여 좌절했는데,  
겨우 반례 하나를 찾았고 `setFrom()` 함수를 새로 작성한 코드가 드디어 통과했다.  

- 1725 문제와 완전히 동일한 문제이다.  
따라서 해당 문제는 레이팅을 받지 못한다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/6549