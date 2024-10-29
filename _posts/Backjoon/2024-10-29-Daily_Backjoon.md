---
layout: post
title: "[데일리 백준] 1149, 9251, 1562"
excerpt: "1 Silver, 2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-29
last_modified_at: 2024-10-29
---
## Silver
### [1149][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int paint(vector<vector<short>>& rgb, short n, short row, short col, vector<vector<int>>& dpTable) {
    if(row == n-1) return rgb[row][col];
    if(dpTable[row][col] != 0) return dpTable[row][col];  // 이미 계산한 적이 있다면
    dpTable[row][col] = rgb[row][col];
    switch(col) {
        case 0 :
            dpTable[row][col] += min(paint(rgb, n, row+1, 1, dpTable), paint(rgb, n, row+1, 2, dpTable));
            break;
        case 1 :
            dpTable[row][col] += min(paint(rgb, n, row+1, 0, dpTable), paint(rgb, n, row+1, 2, dpTable));
            break;
        case 2 :
            dpTable[row][col] += min(paint(rgb, n, row+1, 0, dpTable), paint(rgb, n, row+1, 1, dpTable));
            break;
    }
    return dpTable[row][col];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    short n;
    cin >> n;
    vector<vector<short>> rgb(n, vector<short>(3));
    vector<vector<int>> dpTable(n, vector<int>(3, 0));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < 3 ; j++) {
            cin >> rgb[i][j];
        }
    }
    for(int i = 0 ; i < 3 ; i++) {
        paint(rgb, n, 0, i, dpTable);
    }
    int min = INT32_MAX;
    for(int i = 0 ; i < 3 ; i++) {
        min = std::min(min, dpTable[0][i]);
    }
    cout << min;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍 - Optimal path 문제.

- Top-down 방식의 풀이 방법.

</div>
</details>

<br>

## Gold
### [9251][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

int lcs (string s1, string s2){
    // first row/column : margin (gap)  
    vector<vector<int>> dpTable(s2.size()+1, vector<int>(s1.size()+1, 0));
    // dpTable 채우기
    // s1을 A, s2를 B 라고 했을 때
    // (1) An == Bn 인 경우
    //   -> A1A2...An-1 과 B1B2...Bn-1 의 LCS + 1 이다. 부분수열이 늘어났으므로  
    // (2) An != Bn 인 경우  
    //  -> A1A2...An 과 B1B2...Bn-1의 LCS 
    //  -> A1A2...An-1 과 B1B2...Bn 의 LCS 중에서 최댓값  
    for(int i = 1 ; i <= s2.size() ; i++) {
        for(int j = 1 ; j <= s1.size() ; j++) {
            if(s1[j-1] == s2[i-1]) {
                dpTable[i][j] = dpTable[i-1][j-1] + 1;
                continue;
            }
            dpTable[i][j] = max(dpTable[i-1][j], dpTable[i][j-1]);
        }
    }
    return dpTable[s2.size()][s1.size()];
}


int main() {
    string s1;
    string s2;
    cin >> s1 >> s2;
    cout << lcs(s1, s2);
}

```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍 - LCS(Longest Common Subsequence) 문제.

- 주석에 적어둔 부분이 이 알고리즘의 핵심이다.  

- Bottom-up 방식의 풀이 방법.

</div>
</details>

### [1562][def3]

```c++
#include <iostream>
#include <vector>
#define DIV 1000000000
using namespace std;

// bits : 지금까지 등장한 숫자의 종류(개수)
int stair(int i, int mask, int bits, int length, int n, vector<vector<vector<int>>>& dpTable) {
    if(10 - bits > n - length) return 0;  // 유망하지 않음
    if(length == n) {
        return 1;
    }
    if(dpTable[i][mask][length] != 0) return dpTable[i][mask][length];  // 계산한 적이 있음
    int sum = 0;
    if(i > 0) {
        int bits_ = bits;
        if(mask != (mask | (1 << (i-1)))) bits_++;
        sum += stair(i-1, mask | 1 << (i-1), bits_, length+1, n, dpTable) % DIV;
    }
    if(i < 9) {
        int bits_ = bits;
        if(mask != (mask | (1 << (i+1)))) bits_++;
        sum += stair(i+1, mask | 1 << (i+1), bits_, length+1, n, dpTable) % DIV;
    }
    return dpTable[i][mask][length] = sum % DIV;
}

int main() {
    int n;
    cin >> n;
    // [i][masking][length]
    vector<vector<vector<int>>> dpTable(10, vector<vector<int>>(1 << 10, vector<int>(n+1, 0)));
    for(int i = 1 ; i <= 9 ; i++) {
        int mask = 1 << i;
        stair(i, mask, 1, 1, n, dpTable);
    }
    int count = 0;
    for(int i = 1 ; i <= 9 ; i++) {
        count += dpTable[i][1 << i][1] % DIV;
        count %= DIV;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍 문제.

- 일반적인 top-down 방식의 풀이.

- 비트마스킹과 최적화, 3차원 배열을 사용한 메모이제이션 모두 떠올릴 수는 있었지만, 확신을 가지지 못했으나 통과.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1149
[def2]: https://www.acmicpc.net/problem/9251
[def3]: https://www.acmicpc.net/problem/1562