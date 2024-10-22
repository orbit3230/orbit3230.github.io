---
layout: post
title: "[데일리 백준] "
excerpt: ""

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-22
last_modified_at: 2024-10-22
---
## Silver
### [1780][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void split(const vector<vector<short>>& paper, int startRow, int startCol, int size, vector<int>& result) {
    int flag = paper[startRow][startCol];
    if(size == 1) {
        result[flag+1]++;
        return;
    }
    int endRow = startRow+size;
    int endCol = startCol+size;
    int splitSize = size/3;
    for(int i = startRow ; i < endRow ; i++) {
        for(int j = startCol ; j < endCol ; j++) {
            if(paper[i][j] != flag) {  // 에욱 쓰레기코드야 !
                split(paper, startRow, startCol, splitSize, result);
                split(paper, startRow, startCol+splitSize, splitSize, result);
                split(paper, startRow, startCol+splitSize*2, splitSize, result);
                split(paper, startRow+splitSize, startCol, splitSize, result);
                split(paper, startRow+splitSize, startCol+splitSize, splitSize, result);
                split(paper, startRow+splitSize, startCol+splitSize*2, splitSize, result);
                split(paper, startRow+splitSize*2, startCol, splitSize, result);
                split(paper, startRow+splitSize*2, startCol+splitSize, splitSize, result);
                split(paper, startRow+splitSize*2, startCol+splitSize*2, splitSize, result);
                return;
            }
        }
    }
    result[flag+1]++;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<vector<short>> paper(n, vector<short>(n));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> paper[i][j];
        }
    }
    vector<int> result(3, 0);
    split(paper, 0, 0, n, result);
    cout << result[0] << '\n' << result[1] << '\n' << result[2];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 재귀/분할정복 문제.  

- 예~전에 풀었던 [색종이 만들기][def2] 문제와 유사하다.  

- 코드 오타때문에 쓸데없이 오래걸렸다 ! 매우 화남.  

- 메모리를 굉장히 적게 썼다. 백준 맞힌사람 랭킹 기준 탑급인듯

</div>
</details>

### [1992][def3]

```c++
#include <iostream>
#include <vector>
using namespace std;

void compress(const vector<vector<bool>>& image, int startRow, int startCol, int size) {
    bool flag = image[startRow][startCol];
    if(size == 1) {
        cout << (flag ? 1 : 0);
        return;
    }
    int endRow = startRow + size;
    int endCol = startCol + size;
    int splitSize = size/2;
    for(int i = startRow ; i < endRow ; i++) {
        for(int j = startCol ; j < endCol ; j++) {
            if(image[i][j] != flag) {
                cout << '(';
                compress(image, startRow, startCol, splitSize);
                compress(image, startRow, startCol+splitSize, splitSize);
                compress(image, startRow+splitSize, startCol, splitSize);
                compress(image, startRow+splitSize, startCol+splitSize, splitSize);
                cout << ')';
                return;
            }
        }
    }
    cout << (flag ? 1 : 0);
    return;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    string input;
    vector<vector<bool>> image(n, vector<bool>(n));
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        for(int j = 0 ; j < n ; j++) {
            image[i][j] = input[j] - '0';
        }
    }
    compress(image, 0, 0, n);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 재귀/분할정복 문제.

- 위 문제와 유사하다.  

- 재귀 함수 call stack을 파악하기에 괜찮은 문제.  

</div>
</details>

<br>

## Gold
### []()

```c++
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 

</div>
</details>

[def]: https://www.acmicpc.net/problem/1780
[def2]: https://www.acmicpc.net/problem/2630
[def3]: https://www.acmicpc.net/problem/1992