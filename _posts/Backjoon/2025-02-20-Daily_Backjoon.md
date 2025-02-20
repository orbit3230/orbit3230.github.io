---
layout: post
title: "[데일리 백준] 14888"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-20
last_modified_at: 2025-02-20
---
## Silver
### [14888][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void backtracking(vector<int>& numbers, vector<int>& operators, int index, int n, vector<bool>& operator_used, int result, int& max, int& min) {
    if(index == n) {
        max = std::max(max, result);
        min = std::min(min, result);
        return;
    }
    for(int i = 0 ; i < n-1 ; i++) {
        if(operator_used[i]) continue;
        operator_used[i] = true;
        switch(operators[i]) {
            case 1 : result += numbers[index]; break;
            case 2 : result -= numbers[index]; break;
            case 3 : result *= numbers[index]; break;
            case 4 : result /= numbers[index]; break;
        }
        backtracking(numbers, operators, index+1, n, operator_used, result, max, min);
        // restore
        operator_used[i] = false;
        switch(operators[i]) {
            case 1 : result -= numbers[index]; break;
            case 2 : result += numbers[index]; break;
            case 3 : result /= numbers[index]; break;
            case 4 : result *= numbers[index]; break;
        }
    }
}

int main() {
    int n;
    cin >> n;
    vector<int> numbers(n);
    for(int i = 0 ; i < n ; i++) cin >> numbers[i];
    // {+, -, *, /}
    vector<int> operators;
    int count;
    for(int i = 0 ; i < 4 ; i++) {
        cin >> count;
        for(int j = 0 ; j < count ; j++) operators.push_back(i+1);
    }
    int max = INT32_MIN;
    int min = INT32_MAX;
    int result;
    vector<bool> operator_used(n-1, false);
    for(int i = 0 ; i < n-1 ; i++) {
        operator_used[i] = true;
        switch(operators[i]) {
            case 1 : result = numbers[0] + numbers[1]; break;
            case 2 : result = numbers[0] - numbers[1]; break;
            case 3 : result = numbers[0] * numbers[1]; break;
            case 4 : result = numbers[0] / numbers[1]; break;
        }
        backtracking(numbers, operators, 2, n, operator_used, result, max, min);
        operator_used[i] = false;
    }
    cout << max << '\n' << min;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Backtracking

</div>
</details>

[def]: https://www.acmicpc.net/problem/14888