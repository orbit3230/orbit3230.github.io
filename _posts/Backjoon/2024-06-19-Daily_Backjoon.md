---
layout: post
title: "[데일리 백준] 26168"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-19
last_modified_at: 2024-06-19
---
## Silver
### [26168][def]

```c++
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

// 이진 탐색을 진행하여 k보다 같거나 더 큰 수의 개수를 반환
int binarySearch_includeEqual(const vector<long long>& v, long long k) {
    long long left = 0;
    long long right = v.size() - 1;
    long long mid;
    while(left <= right) {
        mid = (left + right) / 2;
        if(v[mid] < k) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return v.size() - left;
}
// 이진 탐색을 진행하여 k보다 더 큰 수의 개수를 반환
int binarySearch_excludeEqual(const vector<long long>& v, long long k) {
    long long left = 0;
    long long right = v.size() - 1;
    long long mid;
    while(left <= right) {
        mid = (left + right) / 2;
        if(v[mid] <= k) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return v.size() - left;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<long long> v;
    long long next;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        v.push_back(next);
    }
    sort(v.begin(), v.end());

    int mode;
    long long k;
    long long j;
    for(int i = 0 ; i < m ; i++) {
        cin >> mode;
        if(mode == 1) {
            cin >> k;
            cout << binarySearch_includeEqual(v, k) << '\n';
        }
        if(mode == 2) {
            cin >> k;
            cout << binarySearch_excludeEqual(v, k) << '\n';
        }
        if(mode == 3) {
            cin >> k >> j;
            cout << binarySearch_includeEqual(v, k) - binarySearch_excludeEqual(v, j) << '\n';
        }
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 함수의 호출이 많아지면, 동일한 정보를 반복해서 복사시키는 것은 비효율적이므로,  
그러한 파라미터는 Reference로 전달하는 것이 시간복잡도를 `O(n)` -> `O(1)`로 줄여준다.  

- 추가적으로, 처음 작성했었던 살짝 다른 알고리즘.  
  - 이 코드 또한 파라미터를 참조로 전달하였더니 통과할 수 있었다.  
  다만 시간적으로 살짝 비효율적 (선형 탐색이 섞여있음)  

    ```c++
    #include <iostream>
    #include <algorithm>
    #include <vector>
    using namespace std;

    // 이진 탐색을 진행하여 k보다 같거나 더 큰 수의 개수를 반환
    int binarySearch_includeEqual(vector<long long>& v, long long k) {
        long long left = 0;
        long long right = v.size() - 1;
        long long mid;
        while(left <= right) {
            mid = (left + right) / 2;
            if(v[mid] == k) {
                while(mid >= 0 && v[mid] == k) {
                    mid--;
                }
                mid++;
                return v.size() - mid;
            }
            else if(v[mid] < k) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }
        return v.size() - left;
    }
    // 이진 탐색을 진행하여 k보다 더 큰 수의 개수를 반환
    int binarySearch_excludeEqual(vector<long long>& v, long long k) {
        long long left = 0;
        long long right = v.size() - 1;
        long long mid;
        while(left <= right) {
            mid = (left + right) / 2;
            if(v[mid] == k) {
                while(mid < v.size() && v[mid] == k) {
                    mid++;
                }
                return v.size() - mid;
            }
            else if(v[mid] < k) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }
        return v.size() - left;
    }

    int main() {
        ios::sync_with_stdio(false);
        cin.tie(NULL);
        cout.tie(NULL);

        int n, m;
        cin >> n >> m;
        vector<long long> v;
        long long next;
        for(int i = 0 ; i < n ; i++) {
            cin >> next;
            v.push_back(next);
        }
        sort(v.begin(), v.end());

        int mode;
        long long k;
        long long j;
        for(int i = 0 ; i < m ; i++) {
            cin >> mode;
            if(mode == 1) {
                cin >> k;
                cout << binarySearch_includeEqual(v, k) << '\n';
            }
            if(mode == 2) {
                cin >> k;
                cout << binarySearch_excludeEqual(v, k) << '\n';
            }
            if(mode == 3) {
                cin >> k >> j;
                cout << binarySearch_includeEqual(v, k) - binarySearch_excludeEqual(v, j) << '\n';
            }
        }
    }
    ```

</div>
</details>  

[def]: https://www.acmicpc.net/problem/26168