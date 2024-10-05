---
layout: post
title: "[데일리 백준] 1822, 16401"
excerpt: "2 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-05
last_modified_at: 2024-10-05
---
## Silver
### [1822][def]

```c++
#include <iostream>
#include <set>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n_a;
    int n_b;
    cin >> n_a >> n_b;
    set<int> a;
    int input;
    for(int i = 0 ; i < n_a ; i++) {
        cin >> input;
        a.insert(input);
    }
    int remove;
    for(int i = 0 ; i < n_b ; i++) {
        cin >> remove;
        a.erase(remove);
    }
    cout << a.size() << '\n';
    for(int e : a) cout << e << ' ';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬/탐색

</div>
</details>

### [16401][def2]

```c++
#include <iostream>
#include <set>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n_a;
    int n_b;
    cin >> n_a >> n_b;
    set<int> a;
    int input;
    for(int i = 0 ; i < n_a ; i++) {
        cin >> input;
        a.insert(input);
    }
    int remove;
    for(int i = 0 ; i < n_b ; i++) {
        cin >> remove;
        a.erase(remove);
    }
    cout << a.size() << '\n';
    for(int e : a) cout << e << ' ';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Parametric Search + Binary Search

</div>
</details>

[def]: https://www.acmicpc.net/problem/1822
[def2]: https://www.acmicpc.net/problem/16401