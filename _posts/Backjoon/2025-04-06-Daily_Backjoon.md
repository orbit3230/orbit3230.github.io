---
layout: post
title: "[데일리 백준] 17478"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-06
last_modified_at: 2025-04-06
---
## Gold
### [17478][def]

```c++
#include <iostream>
using namespace std;

void recursive(int n, int depth) {
    string prefix = "";
    for (int i = 0; i < depth; i++) prefix += "____";
    cout << prefix << "\"재귀함수가 뭔가요?\"\n";
    if(depth == n) {
        cout << prefix << "\"재귀함수는 자기 자신을 호출하는 함수라네\"\n";
        cout << prefix << "라고 답변하였지.\n";
        return;
    }
    cout << prefix << "\"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.\n";
    cout << prefix << "마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.\n";
    cout << prefix << "그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어.\"\n";
    recursive(n, depth+1);
    cout << prefix << "라고 답변하였지.\n";
}

int main() {
    ios::sync_with_stdio(false);
    cout.tie(NULL);

    int n;
    cin >> n;
    cout << "어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.\n";
    recursive(n, 0);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 재귀 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/17478