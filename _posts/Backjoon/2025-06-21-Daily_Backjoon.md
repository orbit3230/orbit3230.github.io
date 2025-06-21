---
layout: post
title: "[데일리 백준] 5800"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-21
last_modified_at: 2025-06-21
---
## Silver
### [5800][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int k;
    cin >> k;
    vector<vector<int>> scores(k, vector<int>());
    int n, score;
    for(int i = 0 ; i < k ; i++) {
        cin >> n;
        for(int j = 0 ; j < n ; j++) {
            cin >> score;
            scores[i].push_back(score);
        }
    }
    int maxDiff;
    for(int i = 0 ; i < k ; i++) {
        vector<int>& score = scores[i];
        sort(score.begin(), score.end());
        maxDiff = 0;
        size_t size = score.size();
        for(size_t i = 1 ; i < size ; i++) maxDiff = max(maxDiff, score[i] - score[i-1]);
        cout << "Class " << i + 1 << '\n';
        cout << "Max " << score[size-1] << ", Min " << score[0] << ", Largest gap " << maxDiff << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/5800