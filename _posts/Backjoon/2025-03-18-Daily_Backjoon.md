---
layout: post
title: "[데일리 백준] 22942"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-18
last_modified_at: 2025-03-18
---
## Gold
### [22942][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <stack>
using namespace std;

typedef struct Circle {
    int left;
    int right;
} Circle;

bool compare(const Circle& c1, const Circle& c2) {
    return c1.left < c2.left;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    cin >> n;
    vector<Circle> circles(n);
    int r, centre;
    for(int i = 0 ; i < n ; i++) {
        cin >> centre >> r;
        circles[i].left = centre - r;
        circles[i].right = centre + r;
    }
    sort(circles.begin(), circles.end(), compare);
    stack<Circle*> stack;
    stack.push(&circles[0]);
    for(int i = 1 ; i < n ; i++) {
        Circle* next = &circles[i];
        if(stack.top()->right == next->left) {  // 외접
            cout << "NO";
            return 0;
        }
        if(stack.top()-> right < next->left) {  // 밖에 있음
            stack.pop();
            stack.push(next);
            continue;
        }
        if(stack.top()->left == next->left) {  // 내접
            cout << "NO";
            return 0;
        }
        if(stack.top()->right == next->right) {  // 내접
            cout << "NO";
            return 0;
        }
        if(stack.top()->right  < next->right) {  // 두 점에서 만남
            cout << "NO";
            return 0;
        }
        // 안에 있음
        stack.push(next);
    }
    cout << "YES";
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기하학으로 위장한 정렬 & 스위핑 & 스택 문제

</div>
</details>

[def]: https://www.acmicpc.net/problem/22942