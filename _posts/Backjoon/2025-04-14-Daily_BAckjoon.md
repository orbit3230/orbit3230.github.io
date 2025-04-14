---
layout: post
title: "[데일리 백준] 20366"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-14
last_modified_at: 2025-04-14
---
## Gold
### [20366][def]

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
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    sort(list.begin(), list.end());
    
    vector<bool> used(n, false);
    int min = INT32_MAX;
    int first;
    for(int i = 0 ; i < n ; i++) {
        for(int j = i+1 ; j < n ; j++) {
            used[i] = true; used[j] = true;
            first = list[i] + list[j];
            int left = 0;
            int right = n-1;
            int second;
            while(left < right) {
                if(used[left]) {
                    left++;
                    continue;
                }
                if(used[right]) {
                    right--;
                    continue;
                }
                second = list[left] + list[right];
                min = std::min(min, abs(first - second));
                if(first == second) {
                    cout << 0;
                    return 0;
                }
                if(first < second) {
                    right--;
                    continue;
                }
                left++;
            }
            used[i] = false; used[j] = false;
        }
    }
    cout << min;
}
```

<details>
<summary>코멘트 ★</summary>
<div markdown="1">

- Two pointer (4 Elements)

- 위 코드는 84ms

- 아래 코드가 시간 효율적이다. (20ms)  
미리 모든 쌍을 구해놓고 Two pointer 적용 (disjoint check)  

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Sum {
    int sum;
    int index_1, index_2;
} Sum;

bool compare(const Sum& s1, const Sum& s2) {
    return s1.sum < s2.sum;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    vector<Sum> sums;
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    for(int i = 0 ; i < n ; i++) {
        for(int j = i+1 ; j < n ; j++) {
            Sum sum;
            sum.sum = list[i] + list[j];
            sum.index_1 = i;
            sum.index_2 = j;
            sums.push_back(sum);
        }
    }
    sort(sums.begin(), sums.end(), compare);
    int min = INT32_MAX;
    int left = 0;
    int right = 1;
    int size = sums.size();
    while(right < size) {
        if(sums[left].index_1 == sums[right].index_1 || sums[left].index_1 == sums[right].index_2 || 
           sums[left].index_2 == sums[right].index_1 || sums[left].index_2 == sums[right].index_2) {
            goto Next;
        }
        if(sums[left].sum == sums[right].sum) {
            cout << 0;
            return 0;
        }
        min = std::min(min, abs(sums[left].sum - sums[right].sum));
        Next:
        if(sums[left].sum < sums[right].sum) {
            left++;
            continue;
        }
        right++;
    }
    cout << min;
}
```

</div>
</details>

[def]: https://www.acmicpc.net/problem/20366