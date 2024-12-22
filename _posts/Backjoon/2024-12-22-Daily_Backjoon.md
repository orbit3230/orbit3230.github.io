---
layout: post
title: "[데일리 백준] 1213"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-22
last_modified_at: 2024-12-22
---
## Silver
### [1213][def]

```c++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    string input;
    cin >> input;
    int size = input.size();
    vector<int> freq(26, 0);
    for(size_t i = 0 ; i < size ; i++) {
        freq[input[i]-'A']++;
    }
    char middle = 0;
    string result = "";
    stack<char> s;
    for(int alphabet = 0 ; alphabet < 26 ; alphabet++) {
        int f = freq[alphabet];
        for(int i = f ; i > 0 ; i -= 2) {
            if(i == 1) {
                if(middle) {
                    cout << "I'm Sorry Hansoo";
                    return 0;
                }
                middle = alphabet+'A';
                continue;
            }
            result += alphabet+'A';
            s.push(alphabet+'A');
        }
    }
    if(middle) result += middle;
    while(!s.empty()) {
        result += s.top();
        s.pop();
    }
    cout << result;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열 + 구현

</div>
</details>

[def]: https://www.acmicpc.net/problem/1213