---
layout: post
title: "[데일리 백준] 28702, 30802, 1021"
excerpt: "2 Bronze(for Solve.ac - class 2), 1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-05
last_modified_at: 2024-06-05
---
## Bronze
### [28702][def2]

```c++
#include <iostream>
using namespace std;

int main() {
    int change;
    int i;
    for(i = 0 ; i < 3 ; i++) {
        string s;
        cin >> s;
        // 입력받은 것이 숫자인지 체크
        if(s[0] - '0' > 0 && s[0] - '0' < 10) {
            change = stoi(s);
            break;  // 숫자를 발견
        }
    }
    change += (3 - i);

    if(change % 3 == 0 && change % 5 == 0)
        cout << "FizzBuzz";
    else if(change % 3 == 0)
        cout << "Fizz";
    else if(change % 5 == 0)
        cout << "Buzz";
    else
        cout << change;
}
```

### [30802][def3]

```c++
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;
    int S, M, L, XL, XXL, XXXL;
    cin >> S >> M >> L >> XL >> XXL >> XXXL;
    double t;
    int p;
    cin >> t >> p;

    int t_shirt = 0;
    t_shirt += ceil((double)S / t);
    t_shirt += ceil((double)M / t);
    t_shirt += ceil((double)L / t);
    t_shirt += ceil((double)XL / t);
    t_shirt += ceil((double)XXL / t);
    t_shirt += ceil((double)XXXL / t);

    cout << t_shirt << '\n' << n / p << " " << n % p;
}
```

<br>

## Silver
### [1021][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> q;
    for(int i = 1 ; i <= n ; i++) {
        q.push_back(i);
    }
    int sum = 0;
    for(int i = 0 ; i < m ; i++) {
        int find;
        cin >> find;
        int count = 0;
        while(true) {
            vector<int>::iterator it = q.begin();
            int point = *it;
            if(find == point) {
                q.erase(it);
                break;
            }
            // 일단은 무지성으로 왼쪽으로 돌리고,
            // 만약 오른쪽방향이 효율적이었는지는 후에 판단
            else {
                q.erase(it);
                q.push_back(point);
                count++;
            }
        }
        // 오른쪽으로 돌리는게 더 효율적이다면..
        if(count > (q.size()+1) / 2)
            count = (q.size()+1) - count;

        sum += count;
    }

    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- `erase(iterator)` 함수는 element 삭제 후  
iterator가 더 이상 유효하지 않은 데이터를 가리키게 되기 때문에,  
삭제한 다음의 데이터를 가리키는 iterator를 새로 return해준다.  

- `push` 함수가 실행된 후에는 iterator가 더 이상 유효하지 않게 될 수 있기 때문에,  
새로운 iterator 할당이 필요하다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1021
[def2]: https://www.acmicpc.net/problem/28702
[def3]: https://www.acmicpc.net/problem/30802