---
layout: post
title: "[데일리 백준] 3151"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-07
last_modified_at: 2024-10-07
---
## Gold
### [3151][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> students(n);
    vector<int> frequency(20001, 0);
    for(int i = 0 ; i < n ; i++) {
        cin >> students[i];
        frequency[students[i]+10000]++;
    }
    sort(students.begin(), students.end());

    long long count = 0;
    for(int i = 0 ; i < n ; i++) {
        int fixed = students[i];
        frequency[students[i]+10000]--;
        fixed *= -1;
        int left = i+1;
        int right = n-1;
        int sum;
        while(left < right) {
            sum = students[left] + students[right];
            if(sum == fixed) {
                if(students[left] == students[right]) count += frequency[students[left]+10000] * (frequency[students[right]+10000]-1) >> 1;
                else count += frequency[students[left]+10000] * frequency[students[right]+10000];
                while(left < n-1 && students[left] == students[left+1]) left++;
                while(right > 0 && students[right] == students[right-1]) right--;
            }
            if(sum > fixed) {
                right--;
                continue;
            }
            left++;
        }
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 투 포인터 + 조합(Combination)

- 같은 수에 대하여 여러가지 조합 경우의 수가 있다는 사실을 처음에 파악하지 못하였다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/3151