---
layout: post
title: "[데일리 백준] 2018"
excerpt: "TODO"

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

[def]: https://www.acmicpc.net/problem/2018
[def2]: https://www.acmicpc.net/problem/1940
[def3]: https://www.acmicpc.net/problem/1253