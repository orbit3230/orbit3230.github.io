---
layout: post
title: "[파이썬 프로그래밍] theme 5 - 조건문"
excerpt: "if문, if~else문, if~elif~else문, 삼항연산자, 그리고 리스트 맛보기"

tags:
  - [파이썬 프로그래밍, python]

toc: true

date: 2024-03-03
last_modified_at: 2024-03-03
---
## 조건문
### 1. `if` 문
- 파이썬에서 `if`문의 기본 형식은 이러하다.  

```python
if age >= 23 :
    print("아저씨네요")
```

- 중첩 `if`문도 물론 가능하다.

<br>

### 2. `if` ~ `else` 문
- 파이썬에서 `if` ~ `else` 문의 기본 형식은 이러하다.  

```python
if age >= 23 : 
    print("아저씨네요")

else :
    print("어리시네요")
```

<br>

### 3. `if` ~ `elif` ~ `else` 문
- 파이썬에서 `if` ~ `else if` ~ `else` 문의 기본 형식은 이러하다.  

```python
if age >= 23 : 
    print("아저씨네요")

elif age <= 15 :
    print("잼민이네요")

else :
    print("어리시네요")
```

<br>

### 4. 삼항 연산자(Ternary Operators)
- 다른 언어들도 그렇듯, 파이썬에도 삼항 연산자를 활용한 조건식이 가능하다.  

  - 다음의 `if` ~ `else` 문을 삼항연산자로 한 줄에 압축해보자.  

  ```python
  print("메시" if ballondor >= 8 else "호날두")
  ```

  - 위처럼 `TRUE-EXPRESSION if CONDITION else FALSE-EXPRESSION` 형태로 작성한다.  

<br>

## 리스트 (기본)
- theme 7에서 배우게 될 리스트에 대해 짧게 기본만 미리 알아보자.  

- 리스트란, **데이터 여러 개**를 **한 곳**에 **담아 둘 수 있는 변수**라고 보면 된다.  
(Like - `java`의 `배열`)  
<br>

  - 리스트의 선언 형식은 이러하다.

  ```python
  fruit = ['사과', '배', '딸기', '포도']
  ```

  - 리스트에 원소를 추가하려면 `append(항목)` 함수를 사용한다.  

  ```python
  fruit.append('귤')  // 리스트에 귤 항목이 추가된다.
  ```

  - 리스트 안에 특정 원소가 들어있는지 확인하려면,  
  조금 특이한 형태의 `if` 문을 사용하여 가능하다.  

  ```python
  if '딸기' in fruit :
    print("딸기가 있었어요 !")
  
  else :
    print("딸기가 없네요 ..")
  ```

  - 리스트 내 특정 인덱스에 들어있는 원소를 읽을 수 있다.  

  ```python
  print(fruit[0])  # output : 사과
  ```  

  <br>

## 부가적인 요소들
### 1. `eval()`
- `eval(계산식)` 함수는, 인자로 받은 계산식을 계산한 후, 결과값을 리턴한다.  

```python
a = eval(1 + 10 + 100)
print(a)  # 111

l = eval(len([1, 2, 3, 4]))
print(l)  # 4
```

<br>

### 2. `print()`의 `end` 옵션
- `print()` 문에 두 번째 인자로서 `end` 옵션을 줄 수 있다.  
`end` 옵션이란, `print()`문이 출력한 문장을 끝낼 때 추가로 출력할 문자열을 뜻한다.  

```python
print("I love", end = " Ronaldo")
```

- 앞에서 배운 삼항연산자를 활용하면,  
`end`옵션을 조건에 따라서 발동시킬 수 있다.  

```python
print("I love", end = " Ronaldo" if HoBrother == True else " Messi")
```

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