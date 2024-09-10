---
layout: post
title: "[데일리 백준] 2018, 1940, 12891, 1253, 15961"
excerpt: "3 Silver, 2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-10
last_modified_at: 2024-09-10
---
## Silver
### [2018][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    int count = 1;
    for(int dividor = 2 ; dividor < n ; dividor++) {
        if(dividor % 2 == 0) {
            if((n / dividor + 1) - dividor/2 < 1) break;
            if(n % dividor == dividor/2) {  // 나눴을 때 중간 값이 .5        
                count++;
            }
        }
        else {
            if(n / dividor - dividor/2 < 1) break;
            if(n % dividor == 0) {  // 나눴을 때 중간 값이 정수
                count++;
            }
        }
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 이 문제는 본래 투 포인터가 핵심인 문제이나,  
투 포인터 기법을 사용하지 않고 수학적으로 문제를 재해석 해 풀어보았다.  

- 연속된 수로 배열하기 위해 중간값을 찾는 형태의 풀이이다.

</div>
</details>

### [1940][def2]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    int m;
    cin >> m;

    vector<int> materials(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> materials[i];
    }
    sort(materials.begin(), materials.end());
    int left = 0;
    int right = materials.size() - 1;
    int sum;
    int count = 0;
    while(right > left) {
        sum = materials[left] + materials[right];
        if(sum < m) {
            left++;
            continue;
        }
        if(sum == m) count++;
        right--;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 전형적인 간단한 투 포인터 문제.

</div>
</details>

### [12891][def4]

```c++
#include <iostream>
#include <vector>
using namespace std;

int mapping(char c) {
    if(c == 'A') return 0;
    if(c == 'C') return 1;
    if(c == 'G') return 2;
    if(c == 'T') return 3;
    return -1;
}

bool checking(vector<int>& ACGT, vector<int>& makingACGT) {
    for(int i = 0 ; i < 4 ; i++) {
        if(ACGT[i] > makingACGT[i]) return false;
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int s, p;
    cin >> s >> p;
    string input;
    cin >> input;
    vector<char> DNA(s);
    for(int i = 0 ; i < s ; i++) {
        DNA[i] = input[i];
    }
    vector<int> ACGT(4);
    cin >> ACGT[0] >> ACGT[1] >> ACGT[2] >> ACGT[3];

    int from = 0;
    int to = from + p - 1;
    vector<int> makingACGT(4, 0);  // 내가 잘라낸 비밀번호 내 ACGT 개수
    int count = 0;
    // initialize
    for(int i = from ; i <= to ; i++) {
        makingACGT[mapping(DNA[i])]++;
    }
    while(true) {
        if(checking(ACGT, makingACGT)) {
            count++;
        }
        from++; to++;
        makingACGT[mapping(DNA[from - 1])]--;
        if(to < s) makingACGT[mapping(DNA[to])]++;
        else break;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 전형적인 간단한 슬라이딩 윈도우 문제.  

- 슬라이딩 윈도우 개념을 적용하는 것 보다.  
문자열 데이터 처리 구현이 더 까다로웠던 것 같다.  

</div>
</details>

<br>

## Gold
### [1253][def3]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> list[i];
    }
    sort(list.begin(), list.end());

    int count = 0;
    for(int i = 0 ; i < n ; i++) {
        int next = list[i];
        int left = 0;
        int right = list.size() - 1;
        int sum;
        while(left < right) {
            if(left == i) { left++; continue; }
            if(right == i) { right--; continue; }
            sum = list[left] + list[right];
            if(sum < next) {
                left++;
                continue;
            }
            if(sum == next) {
                count++;
                break;
            }
            right--;
        }
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 또 다시 전형적인 투 포인터 문제.  

- 투 포인터 알고리즘을 n회 돌리면 된다.  
`n <= 2000` 이라서 충분히 시간 내에 해결 가능하다.  

</div>
</details>  

### [15961][def5]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, d, k, c;
    cin >> n >> d >> k >> c;
    vector<int> sushi(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> sushi[i];
    }
    int start = 0;
    int end = start + k - 1;
    int count = 0;
    int maxCount = 0;
    vector<int> selected(d+1, 0);  // 1-based index
    for(int i = start ; i <= end ; i++) {
        selected[sushi[i]]++;
        if(selected[sushi[i]] == 1) {  // newly added
            count++;
        }
    }
    maxCount = count;

    for(int i = 0 ; i < n ; i++) {
        selected[sushi[start%n]]--;
        if(selected[sushi[start%n]] == 0) count--;  // newly deleted
        start++;
        end++;
        selected[sushi[end%n]]++;
        if(selected[sushi[end%n]] == 1) count++;  // newly added
        // using coupon
        if(selected[c] == 0) {
            count++;
        }
        if(count > maxCount) maxCount = count;
        // used coupon(rewind)
        if(selected[c] == 0) {
            count--;
        }
    }
    cout << maxCount;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 슬라이딩 윈도우 문제.  

- 그러나 배열이 원형이라서 모듈러 연산을 활용해야 한다는 점이 실수하기 쉬웠다.  
(easy to occur IndexError)

</div>
</details> 

[def]: https://www.acmicpc.net/problem/2018
[def2]: https://www.acmicpc.net/problem/1940
[def3]: https://www.acmicpc.net/problem/1253
[def4]: https://www.acmicpc.net/problem/12891
[def5]: https://www.acmicpc.net/problem/15961