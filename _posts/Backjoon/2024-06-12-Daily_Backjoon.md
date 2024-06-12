---
layout: post
title: "[데일리 백준] 2805"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-12
last_modified_at: 2024-06-12
---
## Silver
### [2805][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int cutter(vector<int> trees, int longest, int m) {
    long long left = 0;
    long long right = longest;
    int mid;
    long long sum_trees;
    int result = 0;
    while(left <= right) {
        mid = (left + right) / 2;
        sum_trees = 0;
        for(int i = 0 ; i < trees.size() ; i++) {
            if(trees[i] > mid)
                sum_trees += trees[i] - mid;
        }
        if(sum_trees >= m) {  // 잘랐을 때 충분히 나오는 경우
            if(result < mid)
                result = mid;  // 마지막으로 기록된 가능한 높이 (점점 높아질거임)
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;

    vector<int> trees;
    int next;
    int longest = 0;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        if(next > longest)
            longest = next;
        trees.push_back(next);
    }

    cout << cutter(trees, longest, m);
}
```

[def]: https://www.acmicpc.net/problem/2805