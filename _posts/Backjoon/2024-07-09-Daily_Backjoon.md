---
layout: post
title: "[데일리 백준] 1043"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-09
last_modified_at: 2024-07-09
---
## Gold
### [1043][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Party {
    int people;
    vector<int> partyPeople;
} Party;

void canHeTellLie(vector<bool>& people, vector<Party> parties) {
    int canTellLie;
    for(Party party : parties) {
        canTellLie = true;
        // 파티에 진실을 아는 사람이 있다면 거짓말을 할 수 없음
        for(int person : party.partyPeople) {
            if(people[person])
                canTellLie = false;
        }
        // 만약 거짓말을 할 수 없다면, 해당 파티에 있는 사람들에게 모두 진실을 공유
        if(!canTellLie) {
            for(int person : party.partyPeople)
                people[person] = true;  // 진실을 아는 사람으로 변경
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;

    vector<bool> people(n, false);
    int knowTruths;
    cin >> knowTruths;
    int index;
    for(int i = 0 ; i < knowTruths ; i++) {
        cin >> index;
        index--;
        people[index] = true;  // 진실을 아는 사람은 true
    }

    vector<Party> parties;  // 파티 정보를 저장
    for(int i = 0 ; i < m ; i++) {
        Party newParty;
        cin >> newParty.people;
        for(int j = 0 ; j < newParty.people ; j++) {
            cin >> index;
            index--;
            newParty.partyPeople.push_back(index);
        }
        parties.push_back(newParty);
    }
    // 파티 정보를 바탕으로 거짓말을 해도 되는 사람들을 구분
    for(int i = 0 ; i < parties.size() ; i++) {  // 파티 개수만큼 반복하여 꼼꼼히 탐색
        canHeTellLie(people, parties);
    }

    int count = 0;
    bool canTellLie;
    // 저장해둔 파티 정보로 다시 loop, 거짓말을 해도 되는 파티에서만 거짓말.
    for(Party party : parties) {
        canTellLie = true;
        for(int person : party.partyPeople) {
            if(people[person]) {
                canTellLie = false;
                break;
            }
        }
        if(canTellLie)
            count++;
    }

    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

-  탐색을 여러 번 함으로서 역순의 경우에도 꼼꼼하게 체크할 수 있다 !

</div>
</details> 

[def]: https://www.acmicpc.net/problem/1043