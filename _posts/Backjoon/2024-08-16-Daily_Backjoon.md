---
layout: post
title: "[데일리 백준] 1644"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-16
last_modified_at: 2024-08-16
---
## Gold
### [1644][def]

```c++
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

void eratos(vector<bool>& isPrime, int n) {
    isPrime[0] = isPrime[1] = false;
    for(int base = 2 ; base <= sqrt(n) ; base++) {
        for(int che = base + base ; che <= n ; che += base) {
            isPrime[che] = false;
        }
    }
}

int twoPointerCount(vector<int>& primeSum, int size, int target) {
    int count = 0;
    int left = -1; int leftSum;
    int right = 0; int rightSum;
    int sum;
    while(right < size) {
        leftSum = left == -1 ? 0 : primeSum[left];
        rightSum = primeSum[right];
        sum = rightSum - leftSum;
        if(sum < target) {
            right++;
            continue;
        }
        if(sum == target) {
            count++;
        }
        left++;
    }
    return count;
}

int main() {
    int n;
    cin >> n;
    vector<bool> isPrime(n + 1, true);
    eratos(isPrime, n);

    vector<int> primeSum;  // 소수 누적합
    int sum = 0;
    for(int i = 1 ; i <= n ; i++) {
        if(isPrime[i]) {
            sum += i;
            primeSum.push_back(sum);
        }
    }

    int count = twoPointerCount(primeSum, primeSum.size(), n);
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 에라토스테네스의 체 + 투 포인터(누적합)

</div>
</details>

[def]: https://www.acmicpc.net/problem/1644