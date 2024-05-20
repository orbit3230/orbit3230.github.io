---
layout: post
title: "[데일리 백준] 1384"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-20
last_modified_at: 2024-05-20
---
## Silver
### [1384][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int nth = 1;
    while(true) {
        int n;
        cin >> n;
        if(n == 0)
            break;
        
        bool graph[n][n];
        string names[n];
        for(int i = 0; i < n; i++) {
            cin >> names[i];
            char c;
            for(int j = 0; j < n; j++) {
                if(i == j) {
                    graph[i][j] = true;
                    continue;
                }
                cin >> c;
                if(c == 'N')
                    graph[i][j] = false;
                else
                    graph[i][j] = true;
            }
        }

        cout << "Group " << nth++ << '\n';
        bool nobody = true;
        for(int row = 0 ; row < n ; row++) {
            for(int col = 0 ; col < n ; col++) {
                if(graph[row][col] == false) {
                    int who = row-col;
                    if(col < row) 
                        who -= 1;
                    if(who < 0)
                        who += n;
                    cout << names[who] << " was nasty about " << names[row] << '\n';
                    nobody = false;
                }
            }
        }
        if(nobody)
            cout << "Nobody was nasty\n";

        cout << '\n';
    }
}
```

[def]: https://www.acmicpc.net/problem/1384