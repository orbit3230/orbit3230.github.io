---
layout: post
title: "[데일리 백준] 5639"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-14
last_modified_at: 2024-07-14
---
## Gold
### [5639][def]

```c++
#include <iostream>
using namespace std;

typedef struct Node {
    int value;
    Node* parent;
    Node* left;
    Node* right;
} Node;

void postorder(Node* node) {
    if(node == NULL) return;
    postorder(node->left);
    postorder(node->right);
    cout << node->value << '\n';
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    // 첫 번째 입력은 루트 노드로, 부모가 없는 노드로 따로 처리
    Node* root = new Node();
    cin >> root->value;
    root->parent = NULL;
    root->left = NULL;
    root->right = NULL;
    
    int value;
    Node* parent = root;
    while(cin >> value) {
        Node* next = new Node();
        next->value = value;
        next->parent = NULL;
        next->left = NULL;
        next->right = NULL;
        // 다음 노드가 이전 노드보다 작은 경우 왼쪽에 붙인다.
        if(value < parent->value) {
            parent->left = next;
            next->parent = parent;
        }
        // 다음 노드가 이전 노드보다 큰 경우 거슬러 올라간다.
        else {
            while(true) {
                if(parent->parent == NULL) {  // 루트 노드까지 올라가버린 경우, 그만 올리고 오른쪽으로 보내버린다.
                    goto goingRight;
                }
                if(parent->parent->value < value) {  // 한 단계 더 올라가야 하는 경우
                    parent = parent->parent;
                    
                }
                else {  // 현재 단계가 적절한 경우
                    goingRight:
                    if(parent->right == NULL) {  // 오른쪽이 비어있는 경우에는 차지한다.
                        parent->right = next;
                        next->parent = parent;
                        break;
                    }
                    else {  // 더 올라가고 싶지만, 이미 오른쪽이 차있는 경우에는 오른쪽으로 계속 이동한다.
                        parent = parent->right;
                        goto goingRight;
                    }
                }
            }
        }
        // 이전 노드에 대한 기억을 저장
        parent = next;
    }

    postorder(root);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 조건문이 너무 많아질 때는, 필요없는 조건문은 없는 지 확인해보자.  
오히려 잘못된 결과를 낼 수도 있다.  

- `goto` 문을 적절히 사용했더니 매우 유용했다.  

</div>
</details> 

[def]: https://www.acmicpc.net/problem/5639