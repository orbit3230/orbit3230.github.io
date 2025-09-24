---
layout: post
title: "[데일리 백준] 1946"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-24
last_modified_at: 2025-09-24
---
## Silver
### [1946][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Applicant {
    int rank1;
    int rank2;
};

bool compare(const Applicant& a1, const Applicant& a2) {
    return a1.rank1 < a2.rank1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int n;
        cin >> n;
        vector<Applicant> applicants(n);
        for(int i = 0 ; i < n ; i++) cin >> applicants[i].rank1 >> applicants[i].rank2;
        sort(applicants.begin(), applicants.end(), compare);
        int top = INT32_MAX;
        int count = 0;
        for(Applicant applicant : applicants) {
            if(applicant.rank2 < top) {
                count++;
                top = applicant.rank2;
            }
        }
        cout << count << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy Algorithm  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1946