---
layout: post
title: "[데일리 백준] 28125"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-29
last_modified_at: 2024-05-29
---
## Silver
### [28125][def]

```c++
#include <iostream>
#include <string>
using namespace std;

typedef struct Dictionary {
    string encrypted;
    char decrypted;
} Dictionary;

void decode(string origin, int length, Dictionary *d) {
    string next;
    int count = 0;
    for(int i = 0 ; i < length ; i++) {
        next = origin[i];
        for(int j = 0 ; j < 7 ; j++) {
            if(next == d[j].encrypted) {
                origin[i] = d[j].decrypted;
                count++;
            }
        }
        // \' 체크
        next = origin.substr(i, 2);
        if(next == d[7].encrypted) {
            origin[i] = d[7].decrypted;
            count++;
            // 문자들 한칸씩 당기기
            for(int k = i+1 ; k < length ; k++) {
                origin[k] = origin[k+1];
            }
            length--;
        }
        // \\' 체크
        next = origin.substr(i, 3);
        if(next == d[8].encrypted) {
            origin[i] = d[8].decrypted;
            count++;
            // 문자들 두칸씩 당기기
            for(int k = i+1 ; k < length ; k++) {
                origin[k] = origin[k+2];
            }
            length-=2;
        }
        if(count >= length/2.0) {
            cout << "I don't understand" << '\n';
            return;
        }
    }
    cout << origin.substr(0, length) << '\n';
}

int main() {
    int n;
    cin >> n;

    string origin[n];
    for(int i = 0 ; i < n ; i++) {
        cin >> origin[i];
    }

    Dictionary d[9];
    d[0] = {"@", 'a'};
    d[1] = {"[", 'c'};
    d[2] = {"!", 'i'};
    d[3] = {";", 'j'};
    d[4] = {"^", 'n'};
    d[5] = {"0", 'o'};
    d[6] = {"7", 't'};
    d[7] = {"\\\'", 'v'};
    d[8] = {"\\\\\'", 'w'};

    for(int i = 0 ; i < n ; i++)
        decode(origin[i], origin[i].length(), d);
}
```

[def]: https://www.acmicpc.net/problem/28125