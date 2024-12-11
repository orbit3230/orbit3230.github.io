---
layout: post
title: "[데일리 백준] 17387, 2162"
excerpt: "1 Gold, 1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-11
last_modified_at: 2024-12-11
---
## Gold
### [17387][def]

```c++
#include <iostream>
using namespace std;

typedef struct Point {
    int x;
    int y;
} Point;
typedef struct Line {
    Point a;
    Point b;
} Line;

int ccw(long long x1, long long y1, long long x2, long long y2, long long x3, long long y3) {
    long long ccw = 0;
    ccw += (x1*y2) + (x2*y3) + (x3*y1);
    ccw -= (x2*y1) + (x3*y2) + (x1*y3);
    return (ccw < 0) ? -1 : (ccw > 0);
}

int main() {
    Line l1, l2;
    cin >> l1.a.x >> l1.a.y >> l1.b.x >> l1.b.y;
    cin >> l2.a.x >> l2.a.y >> l2.b.x >> l2.b.y;

    // l1 -> l2 CCWs
    int ccw1 = ccw(l1.a.x, l1.a.y, l1.b.x, l1.b.y, l2.a.x, l2.a.y);
    int ccw2 = ccw(l1.a.x, l1.a.y, l1.b.x, l1.b.y, l2.b.x, l2.b.y);
    // l2 -> l1 CCWs
    int ccw3 = ccw(l2.a.x, l2.a.y, l2.b.x, l2.b.y, l1.a.x, l1.a.y);
    int ccw4 = ccw(l2.a.x, l2.a.y, l2.b.x, l2.b.y, l1.b.x, l1.b.y);

    int l1_l2 = ccw1*ccw2;
    int l2_l1 = ccw3*ccw4;
    if(l1_l2 <= 0 && l2_l1 <= 0) {
        if(!(l1_l2) || !(l2_l1)) {  // 일직선상
            // 수직인 일직선 (아래에서 위로, 아래 선이 l1)
            if(l1.a.x == l1.b.x) {
                if(l1.a.y > l1.b.y) swap(l1.a, l1.b);
                if(l2.a.y > l2.b.y) swap(l2.a, l2.b);
                if(l1.a.y > l2.a.y) swap(l1, l2);
                cout << (l1.b.y >= l2.a.y);
                return 0;
            }
            // 일반적인 일직선 (왼쪽에서 오른쪽으로, 왼쪽 선이 l1)
            if(l1.a.x > l1.b.x) swap(l1.a, l1.b);
            if(l2.a.x > l2.b.x) swap(l2.a, l2.b);
            if(l1.a.x > l2.a.x) swap(l1, l2);
            cout << (l1.b.x >= l2.a.x);
            return 0;
        }
        cout << 1;
        return 0;
    }
    cout << 0;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- CCW + 선분 교차 문제.

- 도대체 일직선상 인 지를 체크할 때 `!(l1_l2) && !(l2_l1)` 이 아닌 `!(l1_l2) || !(l2_l1)`로 해야하는 이유를 모르겠다!!!!!!!
  - 후자로 하면 수직인 경우 마저 해당 조건문으로 빨려들어가는데, 도대체 왜 이렇게 해야 맞는가.

</div>
</details>

## Platinum
### [2162][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Point {
    int x;
    int y;
} Point;
typedef struct Line {
    Point a;
    Point b;
    int index;
    int parent;
} Line;

int ccw(long long x1, long long y1, long long x2, long long y2, long long x3, long long y3) {
    long long ccw = 0;
    ccw += (x1*y2) + (x2*y3) + (x3*y1);
    ccw -= (x2*y1) + (x3*y2) + (x1*y3);
    return (ccw < 0) ? -1 : (ccw > 0);
}
bool isCross(Line l1, Line l2) {
    // l1 -> l2 CCWs
    int ccw1 = ccw(l1.a.x, l1.a.y, l1.b.x, l1.b.y, l2.a.x, l2.a.y);
    int ccw2 = ccw(l1.a.x, l1.a.y, l1.b.x, l1.b.y, l2.b.x, l2.b.y);
    // l2 -> l1 CCWs
    int ccw3 = ccw(l2.a.x, l2.a.y, l2.b.x, l2.b.y, l1.a.x, l1.a.y);
    int ccw4 = ccw(l2.a.x, l2.a.y, l2.b.x, l2.b.y, l1.b.x, l1.b.y);

    int l1_l2 = ccw1*ccw2;
    int l2_l1 = ccw3*ccw4;
    if(l1_l2 <= 0 && l2_l1 <= 0) {
        if(!(l1_l2) || !(l2_l1)) {  // 일직선상
            // 수직인 일직선 (아래에서 위로, 아래 선이 l1)
            if(l1.a.x == l1.b.x) {
                if(l1.a.y > l1.b.y) swap(l1.a, l1.b);
                if(l2.a.y > l2.b.y) swap(l2.a, l2.b);
                if(l1.a.y > l2.a.y) swap(l1, l2);
                return l1.b.y >= l2.a.y;
            }
            // 일반적인 일직선 (왼쪽에서 오른쪽으로, 왼쪽 선이 l1)
            if(l1.a.x > l1.b.x) swap(l1.a, l1.b);
            if(l2.a.x > l2.b.x) swap(l2.a, l2.b);
            if(l1.a.x > l2.a.x) swap(l1, l2);
            return l1.b.x >= l2.a.x;
        }
        return true;
    }
    return false;
}

int find(vector<Line>& lines, Line& line) {
    if(line.index == line.parent) return line.index;
    return line.parent = find(lines, lines[line.parent]);
}

void unionFind(vector<Line>& lines, int i, int j) {
    Line& a = lines[i];
    Line& b = lines[j];
    int rootA = find(lines, a);
    int rootB = find(lines, b);
    lines[rootB].parent = rootA;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<Line> lines(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> lines[i].a.x >> lines[i].a.y >> lines[i].b.x >> lines[i].b.y;
        lines[i].index = i;
        lines[i].parent = i;
    }
    for(int i = 1 ; i < n ; i++) {
        for(int j = 0 ; j < i ; j++) {
            if(isCross(lines[i], lines[j])) {
                unionFind(lines, i, j);
            }
        }
    }
    // 마무리 경로 압축
    for(int i = 0 ; i < n ; i++) find(lines, lines[i]);
    vector<int> groups(n, 0);
    for(int i = 0 ; i < n ; i++) groups[lines[i].parent]++;

    int groupNumber = 0;
    int groupMax = 0;
    for(int group : groups) {
        if(!group) continue;
        groupNumber++;
        groupMax = max(groupMax, group);
    }
    cout << groupNumber << '\n' << groupMax;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- CCW + 선분 교차 + 유니온 파인드 문제.

- 위 문제에서 유니온 파인드를 결합한 문제이다.  

- 마지막에 경로 압축을 한 번 더 함으로서 그룹 개수와 최대 크기 그룹을 구하는 것이 포인트.

</div>
</details>

[def]: https://www.acmicpc.net/problem/17387
[def2]: https://www.acmicpc.net/problem/2162