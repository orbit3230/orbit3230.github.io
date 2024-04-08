---
layout: post
title: "[데일리 백준] 1620"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-08
last_modified_at: 2024-04-08
---
## Silver
### [1620][def]

```c++
#include <iostream>
#include <cctype>
#include <unordered_map>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    unordered_map<string, int> nameToIndex;
    unordered_map<int, string> indexToName;
    for(int i = 0 ; i < n ; i++) {
        string name;
        cin >> name;
        nameToIndex[name] = i+1;
        indexToName[i+1] = name;
    }
    for(int i = 0 ; i < m ; i++) {
        string s;
        cin >> s;
        if(isdigit(s[0])) { // isdigit은 digit이면 0이 아닌 숫자를 반환
            int index = stoi(s);
            cout << indexToName[index] << '\n';
        }
        else
            cout << nameToIndex[s] << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

```c++
ios::sync_with_stdio(false);
cin.tie(NULL);
cout.tie(NULL);
```

- 해당 코드의 유무 차이가 컸다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1620