---
layout: post
title: "[데일리 백준] 1967, 1167"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-08
last_modified_at: 2024-07-08
---
## Gold
### [1967][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int theLongest = 0;

typedef struct Node {
    Node* parent;
    vector<Node*> children;
    int distance;  // 부모 노드와의 거리
} Node;

// 간략히 설명하자면, 우선 자기 자신의 여러 노드들 중에서
// 자식들 중 가장 긴 거리 & 두 번째로 긴 거리를 얻어낸다. (with dfs recursion)
// 그리고 그 합이 지금까지 나온 것 중 world record라면 갱신한다.
// 그리고는 부모노드에게 지금까지 나온 가장 긴 거리를 반환하여 부모노드 또한 계산할 수 있도록 해준다.
// 이런 식으로 가장 리프 노드부터 진행된다고 이해하면 된다.
int dfs_search(Node* current, int distance) {
    int max_distance = 0;
    int second_max_distance = 0;
    for(Node* node  : current->children) {
        int child_distance = dfs_search(node, node->distance);
        if(child_distance > second_max_distance) {
            if(child_distance > max_distance) {
                second_max_distance = max_distance;
                max_distance = child_distance;
            }
            else {
                second_max_distance = child_distance;
            }
        }
    }
    if(max_distance + second_max_distance > theLongest) {
        theLongest = max_distance + second_max_distance;
    }
    return max_distance + current->distance;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    int parent;
    int child;
    int distance;
    vector<Node> tree(n);
    for(int i = 0 ; i < n-1 ; i++) {
        cin >> parent >> child >> distance;
        parent--; child--;
        tree[child].parent = &tree[parent];
        tree[child].distance = distance;
        tree[parent].children.push_back(&tree[child]);
    }

    dfs_search(&tree[0], 0);
    cout << theLongest;
}
```

### [1167][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

int theLongest = 0;

typedef struct Node Node;

typedef struct Link {
    Node* dest;
    int distance;
} Link;

typedef struct Node {
    vector<Link*> neighbors;
    bool visited;
} Node;

// P1967에 자세히 설명해둠
int dfs_search(Node* current, int distance) {
    current->visited = true;
    int max_distance = 0;
    int second_max_distance = 0;
    for(Link* link  : current->neighbors) {
        Node* node = link->dest;
        if(node->visited) continue;
        int child_distance = dfs_search(node, link->distance);
        if(child_distance > second_max_distance) {
            if(child_distance > max_distance) {
                second_max_distance = max_distance;
                max_distance = child_distance;
            }
            else {
                second_max_distance = child_distance;
            }
        }
    }
    if(max_distance + second_max_distance > theLongest) {
        theLongest = max_distance + second_max_distance;
    }
    return max_distance + distance;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    int parent;
    int child;
    int distance;
    vector<Node> tree(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> parent;
        parent--;
        while(true) {
            cin >> child;
            if(child == -1) break;
            cin >> distance;
            child--;
            Link* link = new Link;
            link->dest = &tree[child];
            link->distance = distance;
            tree[parent].neighbors.push_back(link);
        }
    }

    dfs_search(&tree[0], 0);
    cout << theLongest;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

-  위 문제와 사실상 동일한 문제인데, 입력 규격이 다소 달라서 코드를 반쯤 엎었다.  

    - 루트 노드가 정해져 있지 않다는 사실이 신기했다.  어디에서 시작하던 같은 답을 낸다.
    - 루트 노드가 없다는 건 부모노드도 없다는 것이다. 모든 Element들이 상하 관계 없이 Neighbor이다.  
    - 입력으로 노드 번호 순서대로 오지도 않는다. 부모노드가 없기 때문에 가능하다.  
    - 따라서 `visited`의 추가가 필요했다.

- 이러한 방식은 코드 재활용을 하려던 나를 곤란하게 만들었던 문제였다.  

</div>
</details> 

[def]: https://www.acmicpc.net/problem/1967
[def2]: https://www.acmicpc.net/problem/1167