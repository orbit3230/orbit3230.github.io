---
layout: post
title: "[데일리 백준] 16139"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2026-01-03
last_modified_at: 2026-01-03
---
## Silver
### [16139][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    string s;
    cin >> s;
    size_t size = s.length();
    vector<vector<int>> prefix_sum(26, vector<int>(size, 0));
    prefix_sum[s[0]-'a'][0] = 1;
    for(int i = 1 ; i < size ; i++) {
        for(int j = 0 ; j < 26 ; j++) {
            prefix_sum[j][i] = prefix_sum[j][i-1];
        }
        prefix_sum[s[i]-'a'][i]++;
    }
    
    int q;
    cin >> q;
    char c;
    int from, to;
    while(q--) {
        cin >> c >> from >> to;
        if(from == 0) {
            cout << prefix_sum[c-'a'][to] << '\n';
            continue;
        }
        cout << prefix_sum[c-'a'][to] - prefix_sum[c-'a'][from-1] << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Prefix Sum

</div>
</details>

[def]: https://www.acmicpc.net/problem/16139