---
layout: post
title: "[데일리 백준] 1966"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-21
last_modified_at: 2024-04-21
---
## Silver
### [1966][def]

```c++
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int priority;
    struct Node* next;
} Node;

typedef struct {
    Node *head;
    Node *tail;
    Node *target;
} ListNode;

int main() {
    int t;
    scanf("%d", &t);
    for(int i = 0 ; i < t ; i++) {
        int n, m;
        scanf("%d %d", &n, &m);

        ListNode* list = (ListNode*)malloc(sizeof(ListNode));
        list->head = NULL;
        list->tail = NULL;
        // 우선적으로 링크드 리스트 제작, 타겟 지정
        for(int j = 0 ; j < n ; j++) {
            int priority;
            scanf("%d", &priority);
            Node* newNode = (Node*)malloc(sizeof(Node));
            newNode->priority = priority;
            newNode->next = NULL;
            if(j == 0) {
                list->head = newNode;
                list->tail = newNode;
            }
            else {
                list->head->next = newNode;
                list->head = newNode;
            }
            if(j == m) {
                list->target = newNode;
            }
        }

        int count = 0;
        while(1) {
            int next = list->tail->priority;
            int isMax = 1;
            Node* nextNode = list->tail->next;
            while(nextNode != list->head->next) {
                if(nextNode->priority > next) {
                    isMax = 0;
                    break;
                }
                nextNode = nextNode->next;
            }
            if(isMax) {
                if(list->tail == list->target) {
                    printf("%d\n", count + 1);
                    break;
                }
                else {
                    Node* temp = list->tail;
                    list->tail = list->tail->next;
                    free(temp);
                    count++;
                }
            }
            else {
                Node* temp = list->tail;
                list->tail = list->tail->next;
                list->head->next = temp;
                list->head = temp;
                list->head->next = NULL;
            }
        }
        free(list);
    }
    return 0;
}
```

[def]: https://www.acmicpc.net/problem/1966