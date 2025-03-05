---
layout: post
title: "[데일리 백준] 9328"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-05
last_modified_at: 2025-03-05
---
## Gold
### [9328][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

typedef struct Door {
    char need;
    int x;
    int y;
} Door;
typedef struct Place {
    int x;
    int y;
    char type;
    bool visited;
} Place;

void bfs(vector<vector<Place>>& map, int x, int y, int h, int w,
vector<Door>& doors, vector<char>& keys, int& found) {
    queue<Place*> q;
    q.push(&map[x][y]);
    map[x][y].visited = true;
    while(!q.empty()) {
        Place* p = q.front();
        q.pop();
        if(p->type == '$') found++;
        if(p->type >= 'a' && p->type <= 'z') {  // key
            keys.push_back(p->type);
            for(Door& door : doors) {
                if(door.need == p->type-32) q.push(&map[door.x][door.y]);
            }
        }
        if(p->type >= 'A' && p->type <= 'Z') {  // door
            if(find(keys.begin(), keys.end(), p->type+32) == keys.end()) {
                doors.push_back({p->type, p->x, p->y});
                continue;
            }
        }
        if(p->x > 0 && !map[p->x-1][p->y].visited) {
            q.push(&map[p->x-1][p->y]);
            map[p->x-1][p->y].visited = true;
        }
        if(p->x < h-1 && !map[p->x+1][p->y].visited) {
            q.push(&map[p->x+1][p->y]);
            map[p->x+1][p->y].visited = true;
        }
        if(p->y > 0 && !map[p->x][p->y-1].visited) {
            q.push(&map[p->x][p->y-1]);
            map[p->x][p->y-1].visited = true;
        }
        if(p->y < w-1 && !map[p->x][p->y+1].visited) {
            q.push(&map[p->x][p->y+1]);
            map[p->x][p->y+1].visited = true;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int h, w;
        cin >> h >> w;
        vector<vector<Place>> map(h, vector<Place>(w));
        vector<Door> doors;
        vector<char> keys;
        int found = 0;
        string input;
        for(int i = 0 ; i < h ; i++) {
            cin >> input;
            for(int j = 0 ; j < w ; j++) {
                char c = input[j];
                map[i][j].x = i; map[i][j].y = j;
                map[i][j].type = c;
                map[i][j].visited = (c == '*');
            }
        }
        string key;
        cin >> key;
        if(key != "0") {
            size_t size = key.size();
            for(size_t i = 0 ; i < size ; i++) {
                keys.push_back(key[i]);
            }
        }
        for(int i = 0 ; i < h ; i++) {
            Place& p1 = map[i][0];
            if(p1.type >= 'A' && p1.type <= 'Z') {  // door
                if(find(keys.begin(), keys.end(), p1.type+32) == keys.end()) {
                    doors.push_back({p1.type, i, 0});
                } else p1.visited = false;
            }
            if(!p1.visited) bfs(map, i, 0, h, w, doors, keys, found);
            Place& p2 = map[i][w-1];
            if(p2.type >= 'A' && p2.type <= 'Z') {  // door
                if(find(keys.begin(), keys.end(), p2.type+32) == keys.end()) {
                    doors.push_back({p2.type, i, w-1});
                } else p2.visited = false;
            }
            if(!p2.visited) bfs(map, i, w-1, h, w, doors, keys, found);
        }
        for(int i = 1 ; i < w-1 ; i++) {
            Place& p1 = map[0][i];
            if(p1.type >= 'A' && p1.type <= 'Z') {  // door
                if(find(keys.begin(), keys.end(), p1.type+32) == keys.end()) {
                    doors.push_back({p1.type, 0, i});
                } else p1.visited = false;
            }
            if(!p1.visited) bfs(map, 0, i, h, w, doors, keys, found);
            Place& p2 = map[h-1][i];
            if(p2.type >= 'A' && p2.type <= 'Z') {  // door
                if(find(keys.begin(), keys.end(), p2.type+32) == keys.end()) {
                    doors.push_back({p2.type, h-1, i});
                } else p2.visited = false;
            }
            if(!p2.visited) bfs(map, h-1, i, h, w, doors, keys, found);
        }
        cout << found << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS (hard version)

- Queue에 객체를 넣을 때는 포인터로 넣어서 메모리 공유하기!  

</div>
</details>

[def]: https://www.acmicpc.net/problem/9328