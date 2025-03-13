---
layout: post
title: "[데일리 백준] 11664"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-13
last_modified_at: 2025-03-13
---
## Gold
### [11664][def]

```c++
#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

typedef struct Point {
    int x;
    int y;
    int z;
    bool operator==(const Point& other) const {
        return x == other.x && y == other.y && z == other.z;
    }
} Point;
typedef struct Vector {
    int x;
    int y;
    int z;
} Vector;

Vector subtraction(Point A, Point B) {
    Vector AB;
    AB.x = B.x - A.x;
    AB.y = B.y - A.y;
    AB.z = B.z - A.z;
    return AB;
}
Vector cross_product(Vector A, Vector B) {
    Vector C;
    C.x = A.y * B.z - A.z * B.y;
    C.y = A.z * B.x - A.x * B.z;
    C.z = A.x * B.y - A.y * B.x;
    return C;
}
int dot(Vector A, Vector B) {
    return A.x * B.x + A.y * B.y + A.z * B.z;
}
double length(Vector A) {
    return sqrt((long long)A.x * A.x + (long long)A.y * A.y + (long long)A.z * A.z);
}

int main() {
    Point A, B, C;
    cin >> A.x >> A.y >> A.z >> B.x >> B.y >> B.z >> C.x >> C.y >> C.z;
    if(A == B) {
        cout << fixed << setprecision(10) << length(subtraction(A, C));
        return 0;
    }
    Vector AB = subtraction(A, B);  // B - A
    Vector AC = subtraction(A, C);  // C - A
    Vector BC = subtraction(B, C);  // C - B
    // C에서 AB에 내린 수선의 발은 vector αAB
    // 수선의 발 벡터를 u라고 할때, AC = αAB + u
    // 양 변에 AB를 내적하면, AC · AB = αAB · AB + u · AB = α|AB|²
    // α = (AC · AB) / (|AB|²)
    // α가 0보다 작거나 1보다 크면 수선의 발이 AB의 선분 밖에 있다는 의미이다.  
    double alpha = (double)dot(AC, AB) / (length(AB) * length(AB));
    if(alpha < 0) {
        cout << fixed << setprecision(10) << length(AC);
        return 0;
    }
    if(alpha > 1) {
        cout << fixed << setprecision(10) << length(BC);
        return 0;
    }
    // 수선의 발이 AB의 선분위에 있는 경우
    // height = |AB x AC| / |AB|
    cout << fixed << setprecision(10) << length(cross_product(AB, AC)) / length(AB);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기하학

- vector의 projection과 cross product를 응용해볼 수 있는 아주 좋은 문제였다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/11664