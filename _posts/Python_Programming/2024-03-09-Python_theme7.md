---
layout: post
title: "[파이썬 프로그래밍] theme 7 - 리스트, 튜플, 딕셔너리"
excerpt: "파이썬의 자료구조 - 리스트, 튜플, 딕셔너리 등, 그리고 메소드 사용 예"

tags:
  - [파이썬 프로그래밍, python]

toc: true

date: 2024-03-09
last_modified_at: 2024-03-09
---
## 리스트
### 1. 리스트의 기본 형태

```python
list = [10, 20, 30, 40]
list[0]  # 10
list[2]  # 30
```

- 파이썬의 리스트는 특이하게도 서로 다른 데이터형들도 하나로 묶어 저장할 수 있다.  

```python
list = [10, 20.3, 'abc', True]
```

<br>

### 2. 리스트 값에 접근
- 리스트 내 원소에 접근하는 방법은 다양하다.

  - (1) 인덱스

  ```python
  list = [10, 20, 30]
  list[0]  # 10
  list[1]  # 20
  list[2]  # 30
  ```

  - (2) 음수 인덱스

  ```python
  list = [10, 20, 30]
  list[-1]  # 30
  list[-2]  # 20
  list[-3]  # 10
  ```

  - (3) 콜론(`:`)을 사용해 범위 지정

  ```python
  # 0 이상 3 미만
  list[0:3]  # [10, 20, 30]
  # 2 이상 3 미만
  list[2:3]  # [30]
  ```

  - (4) 범위 숫자 생략

  ```python
  # 2 이상 ~ 끝
  list[2:]  # [30]
  # 시작 ~ 2 미만
  list[:2]  # [10, 20]
  # All
  list[:]   # [10, 20, 30]
  ```

  - (5) 리스트 항목을 건너뛰며 추출

  ```python
  list = [10, 20, 30, 40, 50, 60, 70]
  list[::2]  # [10, 30, 50, 70]
  list[::-2] # [70, 50, 30, 10]
  list[1::2] # [20, 40, 60]
  ```

  - (6) 리스트 끼리의 연산

  ```python
  aa = [10, 20]
  bb = [30, 40]
  aa + bb # [10, 20, 30, 40]
  aa * bb # [10, 20, 10, 20]
  ```

<br>

### 3. 리스트 값 수정/삭제
- 리스트 값 변경

```python
list = [10, 20, 30, 40]
list[3] = 400
list[1:3] = 200, 300  # []는 이처럼 생략할 수 있다.
print(list)  # [10, 200, 300, 400]
```

- 리스트 값 삭제

```python
# 단일
del(list[0])

# 복수
del(list[0:2])  # 방법 1
list[0:2] = []  # 방법 2
```

- 리스트 자체를 삭제

```python
list = []    # 방법 1
list = None  # 방법 2
del(list)    # 방법 3
```

<br>

### 4. 리스트 메소드 모음

|메소드(함수)|Description|How to use|
|:---:|:---:|:---:|
|`append()`|리스트 맨 뒤에 항목 추가|`list.append(value)`|
|`pop()`|리스트 맨 끝의 항목 제거|`list.pop()`|
|`insert()`|지정된 위치에 값 삽입|`list.insert(index, value)`|
|`del()`|지정된 위치의 값 삭제|`del(list[index])`|
|`remove()`|리스트에서 지정한 값을 삭제<br>여러 개라면 첫 번째만|`list.remove(value)`|
|`clear()`|리스트의 내용을 모두 지움|`list.clear()`|
|`extend()`|리스트 두에 리스트 추가<br>리스트 간 덧셈 연산과 기능 동일|`list.extend(anotherList)`|
|`index()`|리스트에서 지정한 값을 찾아 인덱스(위치)를 반환|`list.index(value)`|
|`count()`|리스트에서 지정한 값의 개수 카운트|`list.count(value)`|
|`len()`|리스트의 길이(원소 개수) 반환|`len(list)`|
|`sort()`|리스트 항목 정렬|`list.sort()`|
|`sorted()`|리스트 항목 정렬하되, 새로운 리스트를 만들어 반환|`newList = sorted(list)`|
|`copy()`|리스트의 내용을 복사|`newList = list.copy()`|
|`reverse()`|리스트 항목의 순서를 역순으로 정렬|`list.reverse()`|

<br>

### 5. 2차원 리스트
- 리스트 of 리스트이다. 리스트를 원소로 갖는 리스트.  
행/열이 존재하므로 행렬로서 볼 수도 있다.  

```python
matrix = [[1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12]]

matrix[0][0]  # 1
matrix[2][3]  # 12
```

<br>

### 6. 리스트의 복사
- 리스트에는 얕은 복사와 깊은 복사가 존재한다. 무슨 뜻일 까?

  - (1) **얕은 복사**(Shallow Copy)

    - 얕은 복사는 **같은 참조**를 가리키도록 하는 것이다.  

    ```python
    list1 = list2
    ```
    
    - 참조를 공유하기 때문에, 둘 중 하나의 **원본을 수정하면 모두에게 영향**이 간다.  

  - (2) **깊은 복사**(Deep Copy)  

    - 깊은 복사는 내용 자체를 복사하여, **각각의 메모리 공간**을 갖는 것이다.  

    ```python
    list1 = list2[:]      ## 방법 1
    list1 = list2.copy()  ## 방법 2
    ```

    - 참조를 공유하지 않기 때문에, 각각은 **독립적**이다.  

## 튜플
### 1. 튜플의 선언 방식과 특징
- 튜플(Tuple)은 리스트와 유사한 것으로, `()`(소괄호)로 표현한다. 소괄호는 생략 가능하다. 단, 원소가 하나일 경우 구분을 위해 뒤에 쉼표(`,`)를 표기한다.  
<br>
다른 특징으로서 **원소를 수정할 수 없다!**

```python
t1 = (1, 2, 3, 4)
t2 = 1, 2, 3
t3 = 1,
t1[1]  # 2
t3[0]  # 1
```

<br>

### 2. 리스트 <-> 튜플 변환
- 튜플 -> 리스트 : `list(tuple)`
- 리스트 -> 튜플 : `tuple(list)`  

<br>

## 딕셔너리
### 1. 딕셔너리의 선언 방식과 특징
- 딕셔너리(Dictionary)란, 키(Key)와 값(Value)이 쌍으로 묶여 저장되는 자료구조이다.  

```python
dic = {1:'호', 2:'날', 3:'두'}
```

- 딕셔너리에는 순서가 없다.  

<br>

### 2. 딕셔너리 원소 컨트롤
- 쌍을 추가하는 방법

```python
dic[5] = "크리스티아노"  # key -> 5, 만약 이미 존재하는 key라면 덮어씌움  
```

- 쌍을 삭제하는 방법

```python
del(dic[5])  # key -> 5
```

- 값에 접근하는 방법

```python
dic[5]      # 만약 key가 없으면 ERROR !
dic.get(5)  # 만약 key가 없으면 JUST 출력 X. 안정적  
```

- Key 유무 확인

```python
1 in dic  # True
4 in dic  # False
```

- 모든 Key/Value 반환
  - (1) 모든 Key 반환

  ```python
  dic.keys()       # dict_keys([1, 2, 3])
  list(dic.keys()) # [1, 2, 3]
  ```

  - (2) 모든 Value 반환

  ```python
  dic.values()        # dict_values(['호', '날', '두'])
  list(dic.values())  # ['호', '날', '두']
  ```

  - (2) Key-Value 쌍으로 모두 반환

  ```python
  dic.items()         # dict_items([(1, '호'), (2, '날'), (3, '두')])
  list(dic.items())   # [(1, '호'), (2, '날'), (3, '두')]
  ```  

- 한 Key에 여러 Value

```python
dic = {1:'호', 2:'날', 3:'두', 4: ['크', '리', '스', '티', '아', '누']}
```

- 위처럼 Key에 대한 Value를 리스트로 줌으로서  
하나의 Key에 여러 Value가 매칭될 수 있다.  
원소를 추가할 수도 있다.  

```python
dic[4].append("CR7")
```

<br>

## 세트
- 세트는 집합이다.  
따라서 집합이기 때문에, 원소의 **중복을 허용하지 않는다**.  

  - 리스트, 튜플, 딕셔너리를 세트로 변경하려면 `set()` 함수를 사용한다.  
  주로 원소의 중복을 없애고 싶을 때 사용한다.  

### 1. 세트의 응용
- 세트는 집합이므로, 집합과 관련된 메소드들이 존재한다. (연산자도 존재함)  

  - (1) 교집합

  ```python
  set & set2
  set1.intersection(set2)
  ```

  - (2) 합집합

  ```python
  set | set2
  set1.union(set2)
  ```

  - (3) 차집합

  ```python
  set - set2
  set1.difference(set2)
  ```

  - (4) 대칭차집합( `(A-B) U (B-A)` )

  ```python
  set ^ set2
  set1.symmetric_difference(set2)
  ```

  <br>

## 스택 / 큐
- 스택(Stack) : 한 쪽 끝이 막혀, Last-In First-Out의 후입선출 방식 자료구조이다.  
- 큐(Queue) : 양 쪽이 뚫린 구조로, First-In First-Out의 선입선출 방식 자료구조이다.  
<br>
- 파이썬에서 스택과 큐를 다루는 타입은 따로 존재하지 않으나,  
리스트로 구현한 후 `append()`, `pop()` 등의 메소드를 잘 사용하여
동일한 기능을 하도록 직접 구현할 수 있다.  

<br>

## 관련 추가적인 기능들
### 1. 컴프리헨션(Comprehension)
- 단어 뜻 그대로, 편리하게 해주는 기능이다.  
반복문을 사용한 리스트 제작을 간편하게 한 줄로 가능하게 해준다.  

```python
list = [i for i in range(10)]  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

list = [i for i in range(10) if i%2 == 0]  # [0, 2, 4, 6, 8]
```

<br>

### 2. `zip()` 함수
- 동시에 여러 리스트에 접근하게 해주는 함수다.

```python
listA = [1, 2, 3]
listB = ['A', 'B', 'C']

zip(listA, listB)  # [(1, 'A'), (2, 'B'), (3, 'C')]
dict(zip(listA, listB))  # 딕셔너리와 형식이 비슷하여, 주로 이렇게 많이 쓴다.  
```

- 만약 두 인자의 길이가 다르다면, 둘 중 짧은 것을 기준으로 하여 가능한 만큼만 맵핑한다.  

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