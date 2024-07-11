---
layout: post
title: "[데일리 백준] 5525"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-17
last_modified_at: 2024-05-17
---
## Silver
### [5525][def]

```c++
#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int count = 0;
    int size;
    string s;
    cin >> size >> s;
    int ioiCount = 0;
    for(int i = 0 ; i < size - 2 ; i++) {
        if(s[i] == 'I' && s[i+1] == 'O' && s[i+2] == 'I') {
            ioiCount++;
            if(ioiCount == n) {
                count++;
                ioiCount--;
            }
            // 핵심. ioi를 발견한 경우, 다음은 o부터 시작이 아닌, 그 다음 i부터 시작.
            i++;
        }
        else {
            ioiCount = 0;
        }
    }
    
    cout << to_string(count);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 초기 코드

```c++
#include <iostream>
#include <string>
using namespace std;

int findIndex = 0;
bool beforeFind = false;

bool check(int ioi_size, string s) {
    if(beforeFind) {
        if(s[findIndex] == 'O' && s[findIndex+1] == 'I') {
            findIndex += 2;
            return true;
        }
        if(s[findIndex] == 'O') {
            beforeFind = false;
            findIndex++;
            return false;
        }
        beforeFind = false;
        return false;
    }
    for(int i = 0 ; i < ioi_size ; i++) {
        if(i % 2 == 0) {
            if(s[findIndex] != 'I') {
                findIndex++;
                return false;
            }
            findIndex++;
        }
        else {
            if(s[findIndex] != 'O') {
                return false;
            }
            findIndex++;
        }
    }
    beforeFind = true;
    return true;
}

int main() {
    int n;
    cin >> n;
    
    int count = 0;
    int size;
    string s;
    cin >> size >> s;
    while((findIndex <= size - (2*n+1)) && (!beforeFind) || (findIndex <= size - 2) && (beforeFind)) {
        // debug
        cout << "findIndes: " << findIndex << endl;
        if(check(2*n+1, s))
            count++;
    }
    
    cout << to_string(count);
}
```

</div>
</details>

[def]: https://www.acmicpc.net/problem/5525