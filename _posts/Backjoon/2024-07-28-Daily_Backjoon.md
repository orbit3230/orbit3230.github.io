---
layout: post
title: "[데일리 백준] 5430"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-28
last_modified_at: 2024-07-28
---
## Gold
### [5430][def]

```c++
#include <iostream>
#include <deque>
using namespace std;

void applyFunc(string func, deque<int>& dq) {
    bool reversed = false;
    for(int i = 0 ; i < func.length() ; i++) {
        if(func[i] == 'R') {
            reversed = !reversed;
        }
        else if(func[i] == 'D') {
            if(dq.empty()) {
                cout << "error" << '\n';
                return;
            }
            if(!reversed) {
                dq.pop_front();
            }
            else {
                dq.pop_back();
            }
        }
    }
    // 출력
    cout << '[';
    if(!dq.empty()) {
        if(!reversed) {  // 정방향
            for(size_t i = 0 ; i < dq.size() ; i++) {
                cout << dq[i];
                if(i != dq.size() - 1) {
                    cout << ',';
                }
            }
        }
        else {  // 역방향
            for(size_t i = dq.size() ; i > 0 ; i--) {
                cout << dq[i - 1];
                if(i != 1) {
                    cout << ',';
                }
            }
        }
    }
    cout << ']' << '\n';
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    for(int tc = 0 ; tc < t ; tc++) {
        string func;
        cin >> func;
        
        int length;
        cin >> length;
        deque<int> dq;

        string array;
        cin >> array;
        bool isNum = false;
        string num = "";
        for(int i = 0 ; i < array.length() ; i++) {
            if(array[i] == ',' || array[i] == ']') {
                if(isNum) {
                    dq.push_back(stoi(num));
                    num = "";
                    isNum = false;
                }
            }
            else if(array[i] == '[') {
                continue;
            }
            else {
                num += array[i];
                isNum = true;
            }
        }

        applyFunc(func, dq);
    }
}
```
<details>
<summary>코멘트</summary>
<div markdown="1">

- 자료구조에 크기를 지정해주는 것은 인덱스로 접근하기에는 편리하지만,  
Element를 뺐을 때 동적으로 줄어들지는 않기 때문에 애로사항이 생길 수가 있다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/5430