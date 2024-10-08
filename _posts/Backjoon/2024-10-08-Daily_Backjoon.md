---
layout: post
title: "[데일리 백준] 2295, 16434"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-08
last_modified_at: 2024-10-08
---
## Gold
### [2295][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// k-z 값을 담은 객체
typedef struct kMz {
    int k;
    int value;
} kMz;

bool compare(const kMz& v1, const kMz& v2) {
    return v1.value < v2.value;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    sort(list.begin(), list.end());
    // (x + y + z) = k  ->  (x + y) = (k - z)
    vector<int> xy;  // x + y array
    vector<kMz> kz;  // k - z array
    for(int i = 0 ; i < n ; i++) {
        for(int j = i ; j < n ; j++) {
            xy.push_back(list[i] + list[j]);
            kz.push_back({list[j], list[j] - list[i]});
        }
    }
    sort(xy.begin(), xy.end());
    sort(kz.begin(), kz.end(), compare);
    int xyIndex = xy.size() - 1;
    int kzIndex = kz.size() - 1;
    int xy_; kMz kz_;
    int result = 0;
    while(xyIndex >= 0 && kzIndex >= 0) {
        xy_ = xy[xyIndex];
        kz_ = kz[kzIndex];
        if(xy_ == kz_.value) {
            result = max(result, kz_.k);
        }
        if(xy_ > kz_.value) {
            xyIndex--;
            continue;
        }
        kzIndex--;
    }
    cout << result;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 투 포인터 + 중간에서 만나기

- [백준 7453 - 합이 0인 네 정수][def2] 문제에서 영감을 얻었다. (유사한 알고리즘)

</div>
</details>

### [16434][def3]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Warrior {
    long long maxHP;
    long long curHP;
    long long atk;
} Warrior;
typedef struct Room {
    int type;
    int atk;
    int health;
} Room;

bool canClear(vector<Room>& dungeon, Warrior warrior) {
    for(Room current : dungeon) {
        if(current.type == 1) {
            long long atkCount = current.health / warrior.atk;
            if(current.health % warrior.atk != 0) atkCount++;  // 딱뎀 안되면 한 대 더 때려야됨
            long long hit = (atkCount-1) * current.atk;
            if(warrior.curHP - hit <= 0) return false;
            warrior.curHP -= hit;
        }
        else {  // type 2
            warrior.atk += current.atk;
            warrior.curHP = std::min(warrior.maxHP, warrior.curHP + current.health);
        }
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    Warrior warrior;
    cin >> n >> warrior.atk;
    vector<Room> dungeon(n);
    long long hit = 0;  // 두들겨 맞는 총 체력 소모량...(첫 공격력 기준)
    for(int i = 0 ; i < n ; i++) {
        cin >> dungeon[i].type >> dungeon[i].atk >> dungeon[i].health;
        if(dungeon[i].type == 1) {
            long long atkCount = dungeon[i].health / warrior.atk;
            if(dungeon[i].health % warrior.atk != 0) atkCount++;  // 딱뎀 안되면 한 대 더 때려야됨
            hit += (atkCount-1) * dungeon[i].atk;
        }
    }
    long long min = 1;
    long long max = hit+1;
    long long result = __LONG_LONG_MAX__;
    while(min <= max) {
        long long mid = (min + max) / 2;
        warrior.maxHP = mid;
        warrior.curHP = mid;
        if(canClear(dungeon, warrior)) {
            result = std::min(result, mid);
            max = mid - 1;
            continue;
        }
        min = mid + 1;
    }
    cout << result;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 시뮬레이션(구현) + 이분 탐색

</div>
</details>

[def]: https://www.acmicpc.net/problem/2295
[def2]: https://www.acmicpc.net/problem/7453
[def3]: https://www.acmicpc.net/problem/16434