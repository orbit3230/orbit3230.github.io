---
layout: post
title: "[데일리 백준] 17219, 3613"
excerpt: "2 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-16
last_modified_at: 2024-06-16
---
## Silver
### [17219][def]

```c++
#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    int n, m;
    cin >> n >> m;

    unordered_map<string, string> pw;
    string site;
    string password;
    for(int i = 0 ; i < n ; i++) {
        cin >> site >> password;
        pair<string, string> pair = {site, password};
        pw.insert(pair);
    }

    for(int i = 0 ; i < m ; i++) {
        cin >> site;
        cout << pw.find(site)->second << '\n';
    }
}
```

### [3613][def2]

```c++
#include <iostream>
using namespace std;

string cppToJava(string variable) {
    string result = "";
    bool underTrigger = false;
    for(int i = 0 ; i < variable.length() ; i++) {
        if(variable[i] >= 'A' && variable[i] <= 'Z') {
            return "Error!";  // 반례 처리 (혼종)
        }
        if(variable[i] == '_') {
            // 연속 두 개 or 맨 앞 or 맨 뒤
            if(underTrigger || i == 0 || i == variable.length() - 1) {  // 반례 처리
                return "Error!";
            }
            underTrigger = true;
            continue;
        }
        if(underTrigger) {
            underTrigger = false;
            result += variable[i] - 32;
        }
        else
            result += variable[i];
    }
    return result;
}

string javaToCpp(string variable) {
    string result = "";
    for(int i = 0 ; i < variable.length() ; i++) {
        if(variable[i] == '_') {
            return "Error!";  // 반례 처리 (혼종)
        }
        if(variable[i] >= 'A' && variable[i] <= 'Z') {
            // 맨 앞
            if(i == 0)  // 반례 처리
                return "Error!";
            result += '_';
            result += variable[i] + 32;
        }
        else
            result += variable[i];
    }
    return result;
}

int main() {
    string variable;
    cin >> variable;

    bool isCpp = false;
    bool isJava = false;

    for(int i = 0 ; i < variable.length() ; i++) {
        if(variable[i] == '_') {
            isCpp = true;
            break;
        }
        if(variable[i] >= 'A' && variable[i] <= 'Z'){
            isJava = true;
            break;
        }
    }

    if(!isCpp && !isJava) {
        cout << variable << '\n';
    }
    if(isCpp) {
        cout << cppToJava(variable);
    }
    if(isJava) {
        cout << javaToCpp(variable);
    }
}
```

[def]: https://www.acmicpc.net/problem/17219
[def2]: https://www.acmicpc.net/problem/3613