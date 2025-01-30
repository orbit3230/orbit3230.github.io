---
layout: post
title: "[데일리 백준] 1969"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-30
last_modified_at: 2025-01-30
---
## Silver
### [1969][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<string> DNAs(n);
    for(int i = 0 ; i < n ; i++) cin >> DNAs[i];
    vector<vector<int>> freq(m, vector<int>(26, 0));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            freq[j][DNAs[i][j] - 'A']++;
        }
    }
    string perfectDNA = "";
    for(int i = 0 ; i < m ; i++) {
        int max_freq = 0;
        char max_char;
        for(int j = 0 ; j < 26 ; j++) {
            if(freq[i][j] > max_freq) {
                max_freq = freq[i][j];
                max_char = j + 'A';
            }
        }
        perfectDNA += max_char;
    }
    int hammingDistanceSum = 0;
    for(string DNA : DNAs) {
        for(int i = 0 ; i < m ; i++) {
            if(DNA[i] != perfectDNA[i]) hammingDistanceSum++;
        }
    }
    cout << perfectDNA << '\n' << hammingDistanceSum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열 날먹

</div>
</details>

[def]: https://www.acmicpc.net/problem/1969