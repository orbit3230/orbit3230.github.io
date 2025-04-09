---
layout: post
title: "[데일리 백준] 1963"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-09
last_modified_at: 2025-04-09
---
## Gold
### [1963][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Index {
    int a, b, c, d;
} Index;

void eratos(vector<int>& four_digit_primes) {
    vector<bool> isPrime(10000, true);
    isPrime[0] = isPrime[1] = false;
    for(int base = 2 ; base * base < 10000 ; base++) {
        if(!isPrime[base]) continue;
        for(int i = base*base ; i < 10000 ; i += base) isPrime[i] = false;
    }
    for(int i = 1000 ; i < 10000 ; i++) {
        if(isPrime[i]) four_digit_primes.push_back(i);
    }
}
Index indexing(int n) {
    Index indices;
    indices.a = n / 1000;
    indices.b = (n % 1000) / 100;
    indices.c = (n % 100) / 10;
    indices.d = n % 10;
    return indices;
}
int hashing(Index& indices) {
    return indices.a * 1000 + indices.b * 100 + indices.c * 10 + indices.d;
}
void fillMatrix(vector<int>& four_digit_primes, vector<vector<vector<vector<bool>>>>& isPrime) {
    for(int prime : four_digit_primes) {
        Index indices = indexing(prime);
        isPrime[indices.a][indices.b][indices.c][indices.d] = true;
    }
}
int bfs(vector<vector<vector<vector<bool>>>> isPrime, int from, int to) {
    // {digit, step}
    queue<pair<int, int>> q;
    q.push({from, 0});
    Index indices = indexing(from);
    isPrime[indices.a][indices.b][indices.c][indices.d] = false;
    while(!q.empty()) {
        int digit = q.front().first;
        int step = q.front().second;
        q.pop();
        if(digit == to) return step;
        indices = indexing(digit);
        for(int i = 0 ; i <= 9 ; i++) {
            Index newIndices = indices;
            newIndices.a = i;
            if(isPrime[newIndices.a][newIndices.b][newIndices.c][newIndices.d]) {
                q.push({hashing(newIndices), step+1});
                isPrime[newIndices.a][newIndices.b][newIndices.c][newIndices.d] = false;
            }
            newIndices = indices;
            newIndices.b = i;
            if(isPrime[newIndices.a][newIndices.b][newIndices.c][newIndices.d]) {
                q.push({hashing(newIndices), step+1});
                isPrime[newIndices.a][newIndices.b][newIndices.c][newIndices.d] = false;
            }
            newIndices = indices;
            newIndices.c = i;
            if(isPrime[newIndices.a][newIndices.b][newIndices.c][newIndices.d]) {
                q.push({hashing(newIndices), step+1});
                isPrime[newIndices.a][newIndices.b][newIndices.c][newIndices.d] = false;
            }
            newIndices = indices;
            newIndices.d = i;
            if(isPrime[newIndices.a][newIndices.b][newIndices.c][newIndices.d]) {
                q.push({hashing(newIndices), step+1});
                isPrime[newIndices.a][newIndices.b][newIndices.c][newIndices.d] = false;
            }
        }
    }
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    vector<int> four_digit_primes;
    eratos(four_digit_primes);
    vector<vector<vector<vector<bool>>>> isPrime
    (10, vector<vector<vector<bool>>>(10, vector<vector<bool>>(10, vector<bool>(10, false))));
    fillMatrix(four_digit_primes, isPrime);
    int from, to;
    while(t--) {
        cin >> from >> to;
        int step = bfs(isPrime, from, to);
        cout << (step == -1 ? "Impossible" : to_string(step)) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 소수 판별 + BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/1963