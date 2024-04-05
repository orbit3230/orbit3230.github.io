---
layout: post
title: "[데일리 백준] 2108"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-05
last_modified_at: 2024-04-05
---
## Silver
### [2108][def]

```c++
#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    int count[8001] = {0};    // 최빈값을 구하기 위한 출현 빈도 배열(인덱스 : 정수값+4000)
    int nums[n];        // 입력값 배열

    double sum = 0;        // 총합
    int mean;
    int mode;           // 최빈값
    int mode_count = 0; // 최빈값의 출현 빈도
    bool mode_second = false;  // 최빈값이 여러 개일 때 두 번째로 작은 값인지 확인
    int median;         // 중앙값
    int range;          // 범위

    int next;           // 입력값
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        sum += next;
        nums[i] = next;
    }

    // 평균 계산
    mean = round(sum / n);
    
    // 정렬
    sort(nums, nums+n);

    // 최빈값 계산
    for(int i = 0 ; i < n ; i++) {
        count[nums[i]+4000]++;
        if(count[nums[i]+4000] > mode_count) {
            mode = nums[i];
            mode_count = count[nums[i]+4000];
            mode_second = false;
        }
        else if(count[nums[i]+4000] == mode_count && !mode_second) {
            mode = nums[i];
            mode_second = true;
        }
    }

    // 중앙값 계산
    median = nums[n/2];

    // 범위 계산
    range = nums[n-1] - nums[0];
    
    // 결과 출력
    cout << mean << '\n'; // 산술평균
    cout << median << '\n'; // 중앙값
    cout << mode << '\n';   // 최빈값
    cout << range << '\n';  // 범위
}
```

[def]: https://www.acmicpc.net/problem/2108