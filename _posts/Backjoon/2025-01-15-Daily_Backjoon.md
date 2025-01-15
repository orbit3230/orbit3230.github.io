---
layout: post
title: "[데일리 백준] 17214"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-15
last_modified_at: 2025-01-15
---
## Gold
### [17214][def]

```c++
#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    string input;
    cin >> input;
    vector<string> tokens;
    string token = "";
    for(char& c : input) {
        if(c == '+' || c == '-') {
            if(token != "") tokens.push_back(token);
            token = "";
        }
        token += c;
    }
    if(token != "") tokens.push_back(token);

    // exception
    if(tokens[0] == "0") {
        cout << "W";
        return 0;
    }
    string result = "";
    int coefficient;
    int degree;
    int index;
    bool isFirst = true;
    for(string& token : tokens) {
        coefficient = 0;
        degree = 0;
        index = 0;
        // sign level
        if(token[index] == '-') {
            result += '-';
            index++;
        }
        else if(!isFirst) {
            result += '+';
            index++;
        }
        isFirst = false;
        // coefficient level
        if(token[index] == 'x') coefficient = 1;
        else {
            string temp = "";
            while(token[index] != 'x') temp += token[index++];
            coefficient = stoi(temp);
        }
        // degree level
        for( ; index < token.size() ; index++) {
            if(token[index] == 'x') {
                degree++;
                break;
            }
        }
        // result push
        if(!degree) {  // constant
            if(coefficient != 1) result += to_string(coefficient);
            result += "x";
            continue;
        }
        if(coefficient/(degree+1) != 1) result += to_string(coefficient/(degree+1));
        for(int i = 0 ; i < degree+1 ; i++) result += "x";
    }
    result += (isFirst ? "W" : "+W");
    cout << result;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 재밌는 적분 구현 문제

- 사실 재미없음;; (날먹 실패 / 조건분기가 너무 많아서 빡침)

</div>
</details>

[def]: https://www.acmicpc.net/problem/17214