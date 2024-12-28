---
layout: post
title: "[데일리 백준] 20920"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-28
last_modified_at: 2024-12-28
---
## Silver
### [20920][def]

```c++
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

typedef struct Word {
    int frequency;
    string s;
} Word;

bool compare(const Word& w1, const Word& w2) {
    if(w1.frequency == w2.frequency) {
        size_t l1 = w1.s.size();
        size_t l2 = w2.s.size();
        if(l1 == l2) {
            return w1.s < w2.s;
        }
        return l1 > l2;
    }
    return w1.frequency > w2.frequency;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Word> words;
    unordered_map<string, int> map;
    string s;
    while(n--) {
        cin >> s;
        if(s.size() < m) continue;
        if(map.find(s) == map.end()) {
            map[s] = 1;
            words.push_back({1, s});
        }
        map[s]++;
    }
    for(Word& word : words) {
        word.frequency = map[word.s];
    }
    sort(words.begin(), words.end(), compare);
    for(Word word : words) {
        cout << word.s << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열 + 정렬 + 해시

</div>
</details>

[def]: https://www.acmicpc.net/problem/20920