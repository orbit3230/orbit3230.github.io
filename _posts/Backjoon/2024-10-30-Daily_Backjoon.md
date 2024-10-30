---
layout: post
title: "[데일리 백준] 1149, 9252, 11054"
excerpt: "1 Silver, 2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-30
last_modified_at: 2024-10-30
---
## Silver
### [1149][def]

```c++

```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 

</div>
</details>

<br>

## Gold
### [9252][def2]

```c++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

void tracking(vector<vector<int>>& dpTable, int row, int col, string s1, string s2) {
    cout << dpTable[row][col] << '\n';
    stack<char> stack;
    while(row > 0 && col > 0) {
        // 일치
        if(s1[col-1] == s2[row-1]) {
            stack.push(s1[col-1]);  // == stack.push(s2[row-1]);
            row--; col--;
            continue;
        }
        if (dpTable[row-1][col] < dpTable[row][col-1]) {
            col--;
        } 
        else {
            row--;
        }
    }
    while(!stack.empty()) {
        cout << stack.top();
        stack.pop();
    }
}

void lcs (string s1, string s2){
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
    tracking(dpTable, s2.size(), s1.size(), s1, s2);
}


int main() {
    string s1;
    string s2;
    cin >> s1 >> s2;
    lcs(s1, s2);
}

```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍 - LCS(Longest Common Subsequence) 문제.

- 기존 길이를 구하는 문제에서 역추적이 추가되었다.  

</div>
</details>

### [11054][def3]

```c++
#include <iostream>
#include <vector>
using namespace std;
// 오름차순 정렬
// 현재 벡터에서 key보다 크거나 같은 값 중 가장 작은 값의 인덱스(가장 작은 인덱스) 반환
int binarySearchG(vector<int>& v, int key) {
    int left = 0;
    int right = v.size()-1;
    int result = INT32_MAX;
    while(left <= right) {
        int mid = (left + right) / 2;
        if(v[mid] >= key) {
            result = min(result, mid);
            right = mid - 1;
            continue;
        }
        left = mid + 1;
    }
    return result;
}
// 내림차순 정렬
// 현재 벡터에서 key보다 작거나 같은 값 중 가장 큰 값의 인덱스(가장 작은 인덱스) 반환
int binarySearchL(vector<int>& v, int key) {
    int left = 0;
    int right = v.size()-1;
    int result = INT32_MAX;
    while(left <= right) {
        int mid = (left + right) / 2;
        if(v[mid] <= key) {
            result = min(result, mid);
            right = mid - 1;
            continue;
        }
        left = mid + 1;
    }
    return result;
}

int increasing(vector<int>& list, int start, int end) {
    vector<int> dpTable;
    dpTable.push_back(list[start]);
    for(int i = start+1 ; i <= end ; i++) {
        int index = binarySearchG(dpTable, list[i]);
        if(index == INT32_MAX) dpTable.push_back(list[i]);
        else dpTable[index] = list[i];
    }

    return dpTable.size();
}
int decreasing(vector<int>& list, int start, int end) {
    vector<int> dpTable;
    dpTable.push_back(list[start]);
    for(int i = start+1 ; i <= end ; i++) {
        int index = binarySearchL(dpTable, list[i]);
        if(index == INT32_MAX) dpTable.push_back(list[i]);
        else dpTable[index] = list[i];
    }
    
    return dpTable.size();
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> list;
    int input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        list.push_back(input);
    }
    int max = 0;
    for(int split = 0 ; split < n ; split++) {
        int lcs_inc = increasing(list, 0, split);
        int lcs_dec = decreasing(list, split, n-1);
        int bitonic = lcs_inc + lcs_dec - 1;
        max = std::max(max, bitonic);
    }
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍 - 가장 긴 바이토닉 부분 수열 문제.

- 가장 긴 바이토닉 부분 수열은,  
특정 구분점을 기준으로 좌측의 가장 긴 증가하는 부분 수열 +  
우측의 가장 긴 감소하는 부분 수열을 합쳐서 만든다.  

- 이 과정을 모든 구분점에 대하여 브루트포스 하면 된다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1149
[def2]: https://www.acmicpc.net/problem/9252
[def3]: https://www.acmicpc.net/problem/11054