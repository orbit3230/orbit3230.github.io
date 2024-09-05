---
layout: post
title: "[데일리 백준] 1786"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-05
last_modified_at: 2024-09-05
---
## Platinum
### [1786][def]

```c++
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// pi 벡터의 각 원소 N
// : 각 문자마다, 해당 문자부터 앞방향으로 최대 N개의 크기의 부분 문자열(suffix)가 접두사(prefix)와 일치할 수 있는 지
vector<int> makePi(const string& p) {
    int p_size = p.size();
    vector<int> pi(p_size, 0);
    int matching = 0;
    for(int i = 1 ; i < p_size ; i++) {
        while(matching > 0 && p[i] != p[matching]) {
            matching = pi[matching - 1]; // 불일치 시 이전 패턴의 마지막 인덱스로 이동하여 재탐색
        }
        if(p[i] == p[matching]) {
            matching++;
            pi[i] = matching;
        }
    }
    return pi;
}

vector<int> kmp(const string& t, const string& p) {
    vector<int> pi = makePi(p);
    int t_size = t.size();
    int p_size = p.size();
    int matching = 0;
    vector<int> resultIndexes;
    for(int i = 0 ; i < t_size ; i++) {
        while(matching > 0 && t[i] != p[matching]) {
            matching = pi[matching-1]; // 불일치 시 이전 패턴의 마지막 인덱스로 이동하여 재탐색
        }
        if(t[i] == p[matching]) {
            if(matching == p_size-1) {  // 단어 전체 탐색 성공
                resultIndexes.push_back(i-(p_size-1) + 1); // last plus 1 means 1-based index
                matching = pi[matching];
            }
            else {
                matching++;  // 탐색 성공, 이어서 탐색
            }
        }
    }
    return resultIndexes;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    string t;
    getline(cin, t);
    string p;
    getline(cin, p);
    
    vector<int> result = kmp(t, p);
    cout << result.size() << '\n';
    for(int i : result) {
        cout << i << ' ';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- KMP 알고리즘. 너무너무 어렵다

- KMP 알고리즘 관련 문제를 한 두개 더 풀어봐야 할 것 같다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1786