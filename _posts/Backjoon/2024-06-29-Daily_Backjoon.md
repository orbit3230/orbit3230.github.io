---
layout: post
title: "[데일리 백준] 9935, 9742"
excerpt: "1 Gold, 1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-29
last_modified_at: 2024-06-29
---
## Gold
### [9935][def]

```c++
#include <iostream>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    string line;
    cin >> line;
    string bomb;
    cin >> bomb;

    string stack;
    string check;
    int checkSize = bomb.size();
    for(int i = 0 ; i < line.size() ; i++) {
        stack += line[i];
        if(stack.size() >= checkSize) {
            check = stack.substr(stack.size() - checkSize, checkSize);
            if(check == bomb) {
                stack.erase(stack.size() - checkSize, checkSize);
            }
        }
    }
    if(stack == "") {
        cout << "FRULA";
    } else {
        cout << stack;
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- `string`의 `substr()` 메소드와 `erase()` 메소드를 유용하게 아주 잘 썼다.  

</div>
</details> 

<br>

## Silver
### [9742][def2]

```c++
#include <iostream>
using namespace std;

string result;
bool *used;

int factorial(int n) {
    int result = n;
    for(int n_ = n-1 ; n_ >= 1 ; n_--) {
        result *= n_;
    }
    return result;
}

// 순열에서 자신의 위치가 어디인지에 따라(비율) 다음 문자열을 추측하는 재귀함수
void calculate(string s, int size, int n, int fac) {
    int piece = fac / size;
    char next;
    int i = 0;
    while(true) {
        if(used[i]) {
            i++;
            continue;
        }
        next = s[i];
        if(n <= piece) {
            break;
        }
        piece += fac / size;
        i++;
    }
    result += next;
    used[i] = true;
    // 재귀함수 종료 조건
    if(size == 1) {
        return;
    }
    calculate(s, size-1, n - (piece - fac / size), fac / size);
}

int main() {
    string s;
    int n;
    while(cin >> s >> n) {
        cout << s << ' ' << n << " = ";
        int size = s.size();
        int fac = factorial(size);
        if(n > fac) {
            cout << "No permutation\n";
            continue;
        }
        result = "";
        used = new bool[size];
        for(int i = 0 ; i < size ; i++) {
            used[i] = false;
        }
        calculate(s, size, n, fac);

        cout << result << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- `std::cin` 은 아무것도 읽지 못했을 때 `false`를 반환한다.  

</div>
</details> 

[def]: https://www.acmicpc.net/problem/9935
[def2]: https://www.acmicpc.net/problem/9742