---
layout: post
title: "[데일리 백준] 1316"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-02
last_modified_at: 2024-05-02
---
## Silver
### [1316][def]

```c++
#include <iostream>
using namespace std;

void classFriend(int** graph, int n) {
    int data[n][5];
    for(int i = 0 ; i < n ; i++) {
        for(int grade = 0 ; grade < 5 ; grade++) {
            cin >> data[i][grade];
        }
    }
    for(int grade = 0 ; grade < 5 ; grade++) {
        for(int i = 0 ; i < n-1 ; i++) {
            for(int j = i + 1 ; j < n ; j++) {
                if(data[i][grade] == data[j][grade]) {
                    graph[i][j] = 1;
                    graph[j][i] = 1;
                }
            }
        }
    }
}

// incidence matrix를 ones vector와 product 후, 결과 vector에서 가장 큰 value **index** return
int productWithOnesVector(int** graph, int n) {
    int max = 0;
    int maxIndex = 1;
    int sum = 0;
    for(int i = 0 ; i < n ; i++) {
        sum = 0;
        for(int j = 0 ; j < n ; j++) {
            if(graph[i][j]) {
                sum++;
            }
        }
        if(sum > max) {
            max = sum;
            maxIndex = i + 1;
        }
    }
    return maxIndex;
}

int main() {
    int n;
    cin >> n;
    int** graph = new int*[n];
    for(int i = 0 ; i < n ; i++) {
        graph[i] = new int[n];
        // initialize
        for(int j = 0 ; j < n ; j++) {
            graph[i][j] = 0;
        }
    }
    classFriend(graph, n);
    cout << productWithOnesVector(graph, n);
}
```

[def]: https://www.acmicpc.net/problem/1316