---
layout: post
title: "[데일리 백준] 18110"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-10
last_modified_at: 2024-04-10
---
## Silver
### [18110][def]

```c++
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef int element;

typedef struct StackNode {
    element data;
    struct StackNode* link;
} StackNode;

typedef struct LinkedStackType {
    StackNode* top;
} LinkedStackType;

void init(LinkedStackType* s) {
    s->top = NULL;
}
int is_empty(LinkedStackType* s) {
    return (s->top == NULL);
}
void push(LinkedStackType* s, element item) {
    StackNode* temp = (StackNode*)malloc(sizeof(StackNode));
    temp->data = item;
    temp->link = s->top;
    s->top = temp;
}
element pop(LinkedStackType* s) {
    if(is_empty(s)) {
        exit(1);
    }
    else {
        element data = s->top->data;
        StackNode* temp = s->top;
        s->top = s->top->link;
        free(temp);
        return data;
    }
}
int check_matching(char* input) {
    LinkedStackType s;
    init(&s);
    for(int i = 0; i < strlen(input); i++) {
        char ch = input[i];
        switch(ch) {
            case '(':
            case '{':
            case '[':
                push(&s, ch);
                break;
            case ')':
                if(is_empty(&s) || pop(&s) != '(') return 0;
                break;
            case '}':
                if(is_empty(&s) || pop(&s) != '{') return 0;
                break;
            case ']':
                if(is_empty(&s) || pop(&s) != '[') return 0;
                break;
        }
    }
    if(!is_empty(&s)) return 0;
    return 1;  // 모두 통과하면 정상 괄호
}

int main() {
    char* end = ".";
    while(1) {
        char* str = (char*)malloc(sizeof(char) * 100);
        fgets(str, 102, stdin);
        char* newline = strchr(str, '\n');
        if(newline) *newline = '\0';
        if(strcmp(str, end) == 0) {
            free(str);
            break;
        
        }
        if(check_matching(str)) printf("yes\n");
        else printf("no\n");
        free(str);
    }
    
    return 0;
}
```

- 자료구조 수업 코드 재활용

[def]: https://www.acmicpc.net/problem/18110