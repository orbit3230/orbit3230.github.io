---
layout: post
title: "[데일리 백준] 10026"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-25
last_modified_at: 2024-06-25
---
## Silver
### [10026][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

bool **visited;

typedef struct Position {
    int x;
    int y;
} Position;

// 모두 방문 완료했는지 확인하는 메소드.
// 모두 방문하였다면 그래프의 끝을, 그렇지 않다면 다음 방문할 위치를 알려줄 것이다.  
Position isAllVisited(int n) {
    int i, j;
    for(i = 0 ; i < n ; i++) {
        for(j = 0 ; j < n ; j++) {
            if(!visited[i][j]) return {i, j};
        }
    }
    return {i, j};
}
void initializeVisited(int n) {
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            visited[i][j] = false;
        }
    }
}

// 정상
int colorNormal(char **picture, int n, int x = 0, int y = 0, int area = 1) {
    recursive: // 재귀를 사용하면 메모리 초과가 발생한다.
    char color = picture[x][y];
    queue<Position> q;
    q.push({x, y});
    int x_;
    int y_;
    while(!q.empty()) {
        Position p = q.front();
        q.pop();
        x_ = p.x;
        y_ = p.y;
        visited[x_][y_] = true;
        if((x_ > 0) && (picture[x_ - 1][y_] == color) && (!visited[x_ - 1][y_])) {
            q.push({x_ - 1, y_});
            visited[x_ - 1][y_] = true;
        }  
        if((x_ < n - 1) && (picture[x_ + 1][y_] == color) && (!visited[x_ + 1][y_])) {
            q.push({x_ + 1, y_});
            visited[x_ + 1][y_] = true;
        }
        if((y_ > 0) && (picture[x_][y_ - 1] == color) && (!visited[x_][y_ - 1])) {
            q.push({x_, y_ - 1});
            visited[x_][y_ - 1] = true;
        }
        if((y_ < n - 1) && (picture[x_][y_ + 1] == color) && (!visited[x_][y_ + 1])) {
            q.push({x_, y_ + 1});
            visited[x_][y_ + 1] = true;
        }
    }
    Position p = isAllVisited(n);
    if(p.x == n && p.y == n)
        return area;
    else {
        x = p.x;
        y = p.y;
        area++;
        goto recursive;
    }
}

// 적록색약
int colorWeakness(char **picture, int n, int x = 0, int y = 0, int area = 1) {
    recursive: // 재귀를 사용하면 메모리 초과가 발생한다.
    char color = picture[x][y];
    char colorSimilar = color;
    if(color == 'R') {
        colorSimilar = 'G';
    }
    if(color == 'G') {
        colorSimilar = 'R';
    }
    queue<Position> q;
    q.push({x, y});
    int x_;
    int y_;
    while(!q.empty()) {
        Position p = q.front();
        q.pop();
        x_ = p.x;
        y_ = p.y;
        visited[x_][y_] = true;
        if((x_ > 0) && ((picture[x_ - 1][y_] == color) || (picture[x_ - 1][y_] == colorSimilar)) && (!visited[x_ - 1][y_])) {
            q.push({x_ - 1, y_});
            visited[x_ - 1][y_] = true;
        }
        if((x_ < n - 1) && ((picture[x_ + 1][y_] == color) || (picture[x_ + 1][y_] == colorSimilar)) && (!visited[x_ + 1][y_])) {
            q.push({x_ + 1, y_});
            visited[x_ + 1][y_] = true;
        }
        if((y_ > 0) && ((picture[x_][y_ - 1] == color) || (picture[x_][y_ - 1] == colorSimilar)) && (!visited[x_][y_ - 1])) {
            q.push({x_, y_ - 1});
            visited[x_][y_ - 1] = true;
        }
        if((y_ < n - 1) && ((picture[x_][y_ + 1] == color) || (picture[x_][y_ + 1] == colorSimilar)) && (!visited[x_][y_ + 1])) {
            q.push({x_, y_ + 1});
            visited[x_][y_ + 1] = true;
        }
    }
    Position p = isAllVisited(n);
    if(p.x == n && p.y == n)
        return area;
    else {
        x = p.x;
        y = p.y;
        area++;
        goto recursive;
    }
}

int main() {
    int n;
    cin >> n;
    visited = new bool*[n];
    for(int i = 0 ; i < n ; i++) {
        visited[i] = new bool[n];
        for(int j = 0 ; j < n ; j++) {
            visited[i][j] = false;
        }
    }
    char **picture = new char*[n];
    for(int i = 0 ; i < n ; i++) {
        picture[i] = new char[n];
    }
    string line;
    for(int i = 0 ; i < n ; i++) {
        cin >> line;
        for(int j = 0 ; j < n ; j++) {
            picture[i][j] = line[j];
        }
    }

    int area1 = colorNormal(picture, n);
    initializeVisited(n);
    int area2 = colorWeakness(picture, n);

    cout << area1 << " " << area2;
}
``` 

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS에서는 큐에 다음 노드를 **넣을 때** `visited`를 업데이트 해야한다.  
그래야 중복 탐색이 일어나지 않음.  
매우 중요하다.  

- 많은 메모리를 사용하는 파라미터를 가지는 경우,  
재귀함수의 사용을 자제하자.  
또는 해당 파라미터를 `const`로 선언 가능하다면 그렇게 하자.  

</div>
</details>  

[def]: https://www.acmicpc.net/problem/10026