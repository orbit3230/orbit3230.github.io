---
layout: post
title: "[데일리 백준] 1071"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-04
last_modified_at: 2024-07-04
---
## Platinum
### [1071][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> extract(vector<int> list, int n) {
    vector<int> result;
    int next;
    int index;
    for(int i = 0 ; i < n ; i++) {
        index = 0;
        next = list[index];  // 우선 가장 작은 수 획득
        if(i != 0 && result[i-1] + 1 == next) {  // 연속된 수인 경우
            while(result[i-1] + 1 == next) {
                index++;
                if(index == n) {  // 하지만 쓸 만한 수가 없는 경우, 연속된 수라도 사용
                    index = 0;
                    next = list[index];
                    break;
                }
                next = list[index];
            }
        }
        result.push_back(next);
        list.erase(list.begin() + index);
    }
    return result;  // 완전하지 않은 결과 리스트 반환
}

void checking(vector<int>& list, int n) {
    chackAgain:
    bool allFine = true;
    for(int i = 0 ; i < n-1 ; i++) {
        if(list[i] + 1 == list[i+1]) {
            int temp = list[i];
            list[i] = list[i+1];
            list[i+1] = temp;
            allFine = false;
        }
    }
    if(!allFine) goto chackAgain;
    return;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> list[i];
    }
    sort(list.begin(), list.end());

    list = extract(list, n);

    checking(list, n);

    for(int i = 0 ; i < n ; i++) {
        cout << list[i] << " ";
    }
}                         
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- `vector`와 같은 STL 컨테이너들은 기본적으로 함수에 파라미터로 전달할 때 복사본을 전달한다.  
따라서 참조로 전달하여 함수 내에서 수정사항이 반영되도록 하고 싶다면, Reference `&` 사용.  

</div>
</details> 

[def]: https://www.acmicpc.net/problem/1071