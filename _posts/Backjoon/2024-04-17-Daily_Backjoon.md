---
layout: post
title: "[데일리 백준] 1417"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-17
last_modified_at: 2024-04-17
---
## Silver
### [1417][def]

```c
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int candidate[n];
    for(int i = 0 ; i < n ; i++) {
        scanf("%d", &candidate[i]);
    }

    int stolen = 0;
    int max;
    int maxIndex;
    while(1) {
        max = 0;
        for(int i = 0 ; i < n ; i++) {
            if(candidate[i] >= max) {
                max = candidate[i];
                maxIndex = i;
            }
        }
        if(maxIndex == 0) {
            break;
        }
        candidate[maxIndex]--;
        candidate[0]++;
        stolen++;
    }

    printf("%d\n", stolen);
}
```

[def]: https://www.acmicpc.net/problem/1417