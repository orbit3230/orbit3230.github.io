---
layout: post
title: "[데일리 백준] 5341, 23375, 17949, 17576, 9388"
excerpt: "5 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-11
last_modified_at: 2024-06-11
---
## Solved.ac 랜덤 마라톤
## Bronze
### [5341][def]

```c++
#include <iostream>
using namespace std;

int pyramid(int n) {
    if(n == 1)
        return 1;
    return n + pyramid(n-1);
}

int main() {
    int n;
    while(true) {
        cin >> n;
        if(n == 0)
            break;
        cout << pyramid(n) << '\n';
    }
}
```

### [23375][def2]

```c++
#include <iostream>
using namespace std;

int main() {
    int x, y;
    cin >> x >> y;
    int r;
    cin >> r;

    cout << x - r << " " <<  y + r << '\n';
    cout << x + r << " " <<  y + r << '\n';
    cout << x + r << " " <<  y - r << '\n';
    cout << x - r << " " <<  y - r;
}
```

### [17949][def3]

```c++
#include <iostream>
#include <stdlib.h>
using namespace std;

long long* hexToDec(string *passwords, int n) {
    long long *decrypted = new long long[n];
    for(int i = 0 ; i < n ; i++) {
        decrypted[i] = std::stoll(passwords[i], nullptr, 16);
    }
    return decrypted;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    string input;
    cin >> input;

    int n;
    cin >> n;

    string type;
    string passwords[n];
    int start = 0;
    for(int i = 0 ; i < n ; i++) {
        cin >> type;
        if(type == "char") {
            passwords[i] = input.substr(start, 2);
            start += 2;
        }
        else if(type == "int") {
            passwords[i] = input.substr(start, 8);
            start += 8;
        }
        else {
            passwords[i] = input.substr(start, 16);
            start += 16;
        }
    }

    long long *decrypted = hexToDec(passwords, n);
    for(int i = 0 ; i < n ; i++) {
        cout << decrypted[i] << " ";
    }
}
```

### [17576][def4]

```c++
#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    string line;
    cin >> line;
    int n;
    cin >> n;

    int from, to;
    cin >> from >> to;
    int final_from = from;
    for(int i = 1 ; i < n ; i++) {
        cin >> from >> to;
        final_from += from;
    }
    cout << line.substr(final_from, to);
}
```

### [9388][def5]

```c++
#include <iostream>
using namespace std;

string toUpper(string str) {
    string upper = "";
    for(int i = 0 ; i < str.length() ; i++) {
        if(str[i] >= 'a' && str[i] <= 'z') {
            upper += str[i] - 32;
        }
        else if(str[i] >= 'A' && str[i] <= 'Z') {
            upper += str[i] + 32;
        }
        else {
            upper += str[i];
        }
    }
    return upper;
}

string noNums(string str) {
    string noNum = "";
    for(int i = 0 ; i < str.length() ; i++) {
        if(!(str[i] >= '0' && str[i] <= '9')) {
            noNum += str[i];
        }
    }
    return noNum;
}

int main() {
    int n;
    cin >> n;

    string password;
    string input;
    for(int i = 1 ; i <= n ; i++) {
        cin >> password >> input;
        string ifCapsLockPassWord = toUpper(password);
        string ifNumLockPassWord = noNums(password);
        string ifCapsLockAndNumLockPassWord = noNums(ifCapsLockPassWord);

        cout << "Case " << i << ": ";
        if(password == input) {
            cout << "Login successful.\n";
        }
        else if(ifCapsLockPassWord == input) {
            cout << "Wrong password. Please, check your caps lock key.\n";
        }
        else if(ifCapsLockAndNumLockPassWord == input) {
            cout << "Wrong password. Please, check your caps lock and num lock keys.\n";
        }
        else if(ifNumLockPassWord == input) {
            cout << "Wrong password. Please, check your num lock key.\n";
        }
        else {
            cout << "Wrong password.\n";
        }
    }
}
```

[def]: https://www.acmicpc.net/problem/5341
[def2]: https://www.acmicpc.net/problem/23375
[def3]: https://www.acmicpc.net/problem/17949
[def4]: https://www.acmicpc.net/problem/17576
[def5]: https://www.acmicpc.net/problem/9388