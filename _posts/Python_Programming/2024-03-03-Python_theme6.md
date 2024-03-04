---
layout: post
title: "[파이썬 프로그래밍] theme 6 - 반복문"
excerpt: "for 문, while 문"

tags:
  - [파이썬 프로그래밍, python]

toc: true

date: 2024-03-03
last_modified_at: 2024-03-03
---
## `for` 문
### 1. 일반적인 `for` 문
- `for` 문의 기본 형식은 이러하다.  

```python
# 1 2 3 4 5 6 7 8 9
for i in range(1, 10) :
    print(i, end = " ")

# 1 3 5 7 9
for i in range(1, 10, 2) :
    print(i, end = " ")
```

- 위처럼 Loop Control 변수 `i`를 지정해주고,  
`for 변수 in range(시작값, 끝값+1, 증가값)` 의 형태로 작성한다.  
`시작값`은 생략 가능하고, default는 `0` 이다.  
`증가값`은 생략 가능하고, default는 `1` 이다.  
<br>

- 그런데 변수 `i`는 반복문을 돌리는 데 외에는 아무런 의미가 없을 때도 있다.  
따라서, 단순히 횟수를 반복하는 반복문을 작성할 때에는  
아무런 의미를 가지지 않는 언더스코어(`_`) - 익명변수(Anonymous Variable)를 사용할 수도 있다.  

```python
sum = 0
for _ in range(10) :
    sum += 10  # 만약 sum을 선언할 때 초기값을 설정하지 않았다면, Error.
print(sum)
# output : 100
```

<br>

### 2. 표현식을 가지는 `for` 문
- 파이썬에서는 리스트 식 안에 `for`문 이 포함되는 식을 작성할 수도 있다.

```python
a = [x*x for x in range(1, 10)]
print(a, end = " ")
# output : 1 4 9 16 25 36 49 64 81
```

<br>

### 3. 파이썬의 `for-each` 문
- 파이썬은 `for-each` 라는 이름의 작성식은 없지만,  
`range()` 함수 대신 리스트를 넣어, 같은 기능의 식을 작성할 수 있다. 

```python
a = [1, 2, 3]
for i in a :
    print(i, end = " ")  # 1 2 3
```

<br>

## `while` 문
- 파이썬에서 `while` 문의 기본 형식은 이러하다.

```python
a = 0
while a < 100 :
    a += 1
    if a % 2 == 0 :
        continue
    else :
        print(a, end = " ")
    if a == 50 :
        break
## output : 1 3 5 ... 49
```

<sub> EOF(End Of File) - 강제 interrupt로 프로그램 종료 : ctrl + c

<br>
<br>
<br>
<br>
<details>
<summary>주의사항</summary>
<div markdown="1">

이 포스팅은 강원대학교 이헌길 교수님의 파이썬 프로그래밍 수업을 들으며 내용을 정리 한 것입니다.  
수업 내용에 대한 저작권은 교수님께 있으니,  
다른 곳으로의 무분별한 내용 복사를 자제해 주세요.

</div>
</details> 