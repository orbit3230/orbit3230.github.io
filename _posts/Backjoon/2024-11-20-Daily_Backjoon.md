---
layout: post
title: "[데일리 백준] 5052, 1744"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-20
last_modified_at: 2024-11-20
---
## Gold
### [5052][def]

```c++
#include <iostream>
#include <vector>
using namespace std;
// memory allocation test
typedef struct Number {
    vector<Number*> children;
    bool isEnd;
    Number () {
        isEnd = false;
        children.resize(10, nullptr);
    }
} Number;

bool makeTrie(Number* node, string& input, size_t size, int index) {
    if(node->isEnd) return false;
    if(index == size) {
        node->isEnd = true;
        for(Number* child : node->children) {
            if(child != nullptr) return false;
        }
        return true;
    }
    int num = input[index] - '0';
    if(node->children[num] == nullptr) {
        Number* child = new Number();
        node->children[num] = child;
    }
    return makeTrie(node->children[num], input, size, index+1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int n;
        cin >> n;
        Number* root = new Number();
        string input;
        bool isValid = true;
        for(int i = 0 ; i < n ; i++) {
            cin >> input;
            if(!isValid) continue;
            if(!makeTrie(root, input, input.size(), 0)) isValid = false;
        }
        cout << (isValid ? "YES\n" : "NO\n");
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 트라이 활용 문제. 

- 트라이 노드 구조체를 직접 만들어서 연결해 나가는 방식으로 직접 구현했는데,  
성능이 많이 떨어졌다. (공간적으로도, 시간적으로도)

- 아래는 해시셋을 이용한 두 번째 풀이이고, 해당 풀이가 훨씬 성능 면에서 훌륭하다.  

```c++
#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

bool findPrefix(vector<string>& list, unordered_set<string>& set) {
    for(string num : list) {
        string checking = "";
        for(size_t i = 0 ; i < num.size()-1 ; i++) {  // size-1 : because of same number
            checking += num[i];
            if(set.find(checking) != set.end()) return false;
        }
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int n;
        cin >> n;
        string input;
        vector<string> list;
        unordered_set<string> set;
        for(int i = 0 ; i < n ; i++) {
            cin >> input;
            list.push_back(input);
            set.insert(input);
        }
        cout << (findPrefix(list, set) ? "YES\n" : "NO\n");
    }
}
```

</div>
</details>

### [1744][def2]

```c++
#include <iostream>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    priority_queue<short> positiveQueue;
    priority_queue<short, vector<short>, greater<short>> negativeQueue;
    short input;
    bool zeroExist = false;
    while(n--) {
        cin >> input;
        if(input > 0) {
            positiveQueue.push(input);
            continue;
        }
        if(input < 0) {
            negativeQueue.push(input);
            continue;
        }
        zeroExist = true;
    }
    int sum = 0;
    short a, b;
    while(!positiveQueue.empty()) {
        a = positiveQueue.top();
        positiveQueue.pop();
        if(positiveQueue.empty()) {
            sum += a;
            continue;
        }
        b = positiveQueue.top();
        positiveQueue.pop();
        if(a*b <= a+b) {
            sum += a+b;
            continue;
        }
        sum += a*b;
    }
    while(!negativeQueue.empty()) {
        a = negativeQueue.top();
        negativeQueue.pop();
        if(negativeQueue.empty()) {
            sum += (zeroExist ? 0 : a);
            continue;
        }
        b = negativeQueue.top();
        negativeQueue.pop();
        sum += a*b;
    }
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그리디 알고리즘.

- 조건 분기가 많은 문제이다.  
  - 양수는 곱한 것이 더한 것 보다 크면 곱한다.  
  - 음수는 반드시 곱하되, 마지막에 하나만 남게 되는 경우 0과 곱할 수 있다면 곱한다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/5052
[def2]: https://www.acmicpc.net/problem/1744