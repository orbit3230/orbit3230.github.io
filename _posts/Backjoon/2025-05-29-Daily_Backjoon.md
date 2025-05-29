---
layout: post
title: "[데일리 백준] 1461"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-29
last_modified_at: 2025-05-29
---
## Gold
### [1461][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<int> negative;
    vector<int> positive;
    int input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        if(input < 0) {
            negative.push_back(-input);
            continue;
        }
        positive.push_back(input);
    }
    vector<int> distances;
    sort(negative.begin(), negative.end(), greater<int>());
    sort(positive.begin(), positive.end(), greater<int>());
    size_t size = negative.size();
    for(size_t i = 0 ; i < size ; i += m) distances.push_back(negative[i]);
    size = positive.size();
    for(size_t i = 0 ; i < size ; i += m) distances.push_back(positive[i]);
    
    int sum = 0;
    sort(distances.begin(), distances.end());
    size = distances.size();
    int i;
    for(i = 0 ; i < size-1 ; i++) sum += distances[i]<<1;
    sum += distances[i];
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬 + 그리디

</div>
</details>

[def]: https://www.acmicpc.net/problem/1461