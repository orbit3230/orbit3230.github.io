---
layout: post
title: "[데일리 백준] 15686, 1991"
excerpt: "1 Gold, 1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-10
last_modified_at: 2024-07-10
---
## Gold
### [15686][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Position {
    int x;
    int y;
} Position;

void selectChickensHelper(vector<Position>& chickens, int m, int start, vector<Position>& selected, vector<vector<Position>>& results) {
    if (selected.size() == m) {
        results.push_back(selected);
        return;
    }
    for (int i = start; i < chickens.size(); i++) {
        selected.push_back(chickens[i]);
        selectChickensHelper(chickens, m, i + 1, selected, results);
        selected.pop_back();
    }
}
// 총 치킨집 중에서 m개를 선택하는 경우의 수들을 구하는 함수 (백트래킹)
vector<vector<Position>> selectChickens(vector<Position>& chickens, int m, int nth) {
    vector<vector<Position>> results;
    vector<Position> selected;
    selectChickensHelper(chickens, m, 0, selected, results);

    return results;
}

// 각 집마다 존재하는 모든 치킨집과의 거리를 계산하여 최소 거리의 합을 구하는 함수
int calculateDistance(const vector<vector<int>>& town, const vector<Position>& homes, vector<Position>& selectedChicken) {
    int distanceSum = 0;
    for(Position home : homes) {
        int minDistance = 10000;
        for(Position chicken : selectedChicken) {
            int distance = abs(home.x - chicken.x) + abs(home.y - chicken.y);
            if(distance < minDistance) {
                minDistance = distance;
            }
        }
        distanceSum += minDistance;
    }
    return distanceSum;
}

int main() {
    int n, m;
    cin >> n >> m;
    
    vector<vector<int>> town(n, vector<int>(n));
    vector<Position> homes;
    vector<Position> chickhens;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> town[i][j];
            if(town[i][j] == 1) {
                homes.push_back({i, j});
            }
            if(town[i][j] == 2) {
                chickhens.push_back({i, j});
            }
        }
    }

    // 총 치킨집 중에서 m개를 선택하는 경우의 수들이 순서대로 저장됨
    // 배열에는 m개의 치킨집의 좌표들이 저장되어있으므로, 바로 꺼내 쓰면됨.
    vector<vector<Position>> selectedChickens = selectChickens(chickhens, m, 0);
    int minSum = 10000;
    for(int nth = 0 ; nth < selectedChickens.size() ; nth++) {
        vector<Position> selectedChicken = selectedChickens[nth];
        int distanceSum = calculateDistance(town, homes, selectedChicken);
        if(distanceSum < minSum) {
            minSum = distanceSum;
        }
    }
    cout << minSum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

-  n개 중에서 m개를 선택하는 조합을 구하는 백트래킹 기법.  
두고두고 써먹을 일이 많을 것 같다. 꼭 기억해두기.

- 거리 계산 문제라고해서 항상 그래프탐색이라고 막연하게 생각하지 말자.  
간단한 좌표계산이었다 !

</div>
</details> 

## Silver
### [1991][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Node {
    char name;
    Node* left;
    Node* right;
} Node;

void preorder(Node* node) {
    if(node == nullptr) return;
    cout << node->name;
    preorder(node->left);
    preorder(node->right);
}

void inorder(Node* node) {
    if(node == nullptr) return;
    inorder(node->left);
    cout << node->name;
    inorder(node->right);
}

void postorder(Node* node) {
    if(node == nullptr) return;
    postorder(node->left);
    postorder(node->right);
    cout << node->name;
}

int main() {
    int n;
    cin >> n;

    // 알파벳 순서대로 26개의 노드 우선 생성
    vector<Node*> nodes;
    for(int i = 0 ; i < 26 ; i++) {
        Node* node = new Node;
        node->name = 'A' + i;
        node->left = nullptr;
        node->right = nullptr;
        nodes.push_back(node);
    }

    char self;
    char left;
    char right;
    Node* root = nodes[0];   // should be 'A'
    for(int i = 0 ; i < n ; i++) {
        cin >> self >> left >> right;
        Node* node = nodes[self - 'A'];
        node->left = (left == '.') ? nullptr : nodes[left - 'A'];
        node->right = (right == '.') ? nullptr : nodes[right - 'A'];
    }

    preorder(root);     // 전위 순회
    cout << '\n';
    inorder(root);        // 중위 순회
    cout << '\n';
    postorder(root);   // 후위 순회
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

-  메모리 할당을 잘 하자 !

</div>
</details> 

[def]: https://www.acmicpc.net/problem/1991
[def2]: https://www.acmicpc.net/problem/15686