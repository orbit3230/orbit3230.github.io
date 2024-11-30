---
layout: post
title: "[데일리 백준] 1755"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-30
last_modified_at: 2024-11-30
---
## Gold
### [1755][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    int size = n;
    int type;
    cin >> type;

    long long n_;
    long long division = 1;
    for(int i = n ; i >= 1 ; i--) division *= i;
    vector<bool> check(n+1, true);
    if(!(--type)) {
        cin >> n_;
        vector<int> result;
        while(n) {
            division /= (n--);
            int index = (n_ - 1) / division + 1;
            for(int j = 1 ; j <= size ; j++) {
                if(check[j]) {
                    if(index == 1) {
                        result.push_back(j);
                        check[j] = false;
                        break;
                    }
                    index--;
                }
            }
            n_ = (n_ - 1) % division + 1;
        }
        for(int e : result) cout << e << ' ';
        return 0;
    }
    int next;
    long long result = 0;
    while(n) {
        cin >> next;
        division /= (n--);
        for(int i = 1 ; i <= size ; i++) {
            if(check[i]) {
                if(next == i) {
                    check[i] = false;
                    break;
                }
                result += division;
            }
        }
    }
    cout << result + 1;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 순열 활용 문제.

- 나눗셈이랑 나머지 연산 진짜 헷갈려죽겠다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1755