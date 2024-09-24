---
layout: post
title: "[데일리 백준] 10773"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-15
last_modified_at: 2024-04-15
---
## Silver
### [10773][def]

```c
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int* stack = (int*)malloc(sizeof(int) * n);
    int top = -1;
    int sum = 0;

    int next;
    for(int i = 0 ; i < n ; i++) {
        scanf("%d", &next);
        if(next == 0) {
            sum -= stack[top--];  // 실제로 없애진 않음
        } else {
            stack[++top] = next;
            sum += next;
        }
    }

    printf("%d", sum);
}
```

[def]: https://www.acmicpc.net/problem/10773