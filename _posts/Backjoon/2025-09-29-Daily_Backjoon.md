---
layout: post
title: "[데일리 백준] 2529"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-29
last_modified_at: 2025-09-29
---
## Silver
### [2529][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void backtrack(vector<bool>& used, vector<int>& trace, int step, int n, const vector<char>& symbols,
     long long& min, long long& max, string& min_string, string& max_string) {
    if(step == n) {
        long long result = 0;
        string result_string = "";
        for(int t : trace) {
            result *= 10;
            result += t;
            result_string += to_string(t);
        }
        if(result < min) {
            min = result;
            min_string = result_string;
        }
        if(max < result) {
            max = result;
            max_string = result_string;
        }
        return;
    }
    if(symbols[step] == '<') {
        int past = trace[step];
        for(int i = past+1 ; i < 10 ; i++) {
            if(!used[i]) {
                trace.push_back(i);
                used[i] = true;
                backtrack(used, trace, step+1, n, symbols, min, max, min_string, max_string);
                used[i] = false;
                trace.pop_back();
            }
        }
        return;
    }
    int past = trace[step];
    for(int i = past-1 ; i >= 0 ; i--) {
        if(!used[i]) {
            trace.push_back(i);
            used[i] = true;
            backtrack(used, trace, step+1, n, symbols, min, max, min_string, max_string);
            used[i] = false;
            trace.pop_back();
        }
    }
}

int main() {
    int n;
    cin >> n;
    vector<char> symbols(n);
    for(int i = 0 ; i < n ; i++) cin >> symbols[i];
    vector<bool> used(10, false);
    vector<int> trace;
    long long min = INT64_MAX; string min_string = "";
    long long max = 0; string max_string = "";
    for(int i = 0 ; i < 10 ; i++) {
        trace.push_back(i);
        used[i] = true;
        backtrack(used, trace, 0, n, symbols, min, max, min_string, max_string);
        used[i] = false;
        trace.pop_back();
    }
    cout << max_string << '\n' << min_string;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Backtracking

</div>
</details>

[def]: https://www.acmicpc.net/problem/2529