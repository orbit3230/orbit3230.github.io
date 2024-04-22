---
layout: post
title: "[데일리 백준] 11399"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-22
last_modified_at: 2024-04-22
---
## Silver
### [11399][def]

```c++
#include <iostream>
using namespace std;

void sort(int* people, int length) {
    for(int i = 0 ; i < length ; i++) {
        int j = i;
        while(j > 0) {
            if(people[j-1] > people[j]) {
                int tmp = people[j-1];
                people[j-1] = people[j];
                people[j] = tmp;
            }
            else
                break;
            j--;
        }
    }
}

int main() {
    int n;
    cin >> n;
    int* people = new int[n];
    for(int i = 0 ; i < n ; i++) {
        cin >> people[i];
    }
    sort(people, n);

    int waiting = 0;
    int timeSum = 0;
    for(int i = 0 ; i < n ; i++) {
        timeSum += waiting + people[i];
        waiting += people[i];
    }

    cout << timeSum;
}
```

[def]: https://www.acmicpc.net/problem/11399