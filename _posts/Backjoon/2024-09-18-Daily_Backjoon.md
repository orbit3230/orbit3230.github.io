---
layout: post
title: "[데일리 백준] 9466"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-18
last_modified_at: 2024-09-18
---
## Gold
### [9466][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Person {
    int want;
    bool madeTeam;
    bool visited;
    bool searched;  // 이미 탐색한 경로인가?
} Person;

int findCycle(vector<Person>& people, int index, vector<int>& trace) {
    people[index].visited = true;
    trace.push_back(index);
    int next = people[index].want;
    if(people[next].searched) return -1;  // 이미 탐색한 적 있는 경로라면, 더 이상 가능성이 없다.
    if(people[next].visited) return next;
    return findCycle(people, next, trace);
}
void makeTeam(vector<Person>& people, int index) {
    people[index].madeTeam = true;
    int next = people[index].want;
    if(!people[next].madeTeam) makeTeam(people, next);
    return;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    for(int i = 0 ; i < t ; i++) {
        int n;
        cin >> n;
        vector<Person> people(n);
        for(int j = 0 ; j < n ; j++) {
            cin >> people[j].want;
            people[j].want--;  // 0-based index;
            people[j].madeTeam = false;
            people[j].visited = false;
            people[j].searched = false;
        }
        for(int j = 0 ; j < n ; j++) {
            if(!people[j].visited) {
                vector<int> trace;
                int start = findCycle(people, j, trace);
                for(int index : trace) people[index].searched = true;
                if(start != -1) makeTeam(people, start);
            }
        }
        int count = 0;
        for(int j = 0 ; j < n ; j++) {
            if(!people[j].madeTeam) count++;
        }
        cout << count << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 복잡한 DFS 문제.

- 시간이 빡빡하다. 불필요한 탐색을 모두 없애는 것이 관건이었다.  

- `visited`와 `searched`라는 두 개의 방문확인 변수를 두고, `searched`는 느리게 갱신함으로서 다음 DFS 서치부터 사용 가능하도록 한 것이 나의 묘수.

</div>
</details>

[def]: https://www.acmicpc.net/problem/9466