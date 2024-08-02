---
layout: post
title: "[Unreal Engine] Section 2 - Obstacle Assult"
excerpt: "C++ Functions, Variables, and Branches, Creating a C++ Actor, C++ Code Structure, C++ Compilation and Live Coding, Linking Blueprint to C++, Setting our own custom character class"

tags:
  - [언리얼 엔진, Unreal, CPP]

toc: true

date: 2024-07-27
last_modified_at: 2024-07-28
---
## 프로젝트 설정
- 일부 에셋은 기존 프로젝트에 추가하는게 아니라, 새로운 프로젝트의 생성과 함께 적용해야하는 것도 존재한다.  
이번 섹션에서 사용할 `Unreal Learning Kit`이 대표적으로 그러하다.  
프로젝트의 베이스가 될 에셋이기 때문이다.  

### 1. 아바타 불러오기
- 아바타를 제공하는 에셋들은, 기본적으로 마네킹처럼 생긴 민무니의 삼인칭 캐릭터 블루프린트 클래스를 가진다.  
해당 아바타는 드래그 & 드롭으로 현재 레벨에 가져올 수 있다.  

- 하지만 기본 마네킹 형태의 아바타를 곧바로 사용하기엔 많이 부족하다.  
이 아바타를 커스터마이징 해보자.  

<br>

### 2. 아바타 커스터마이징
- 기본 아바타 블루프린트를 직접 수정하는건 원본을 훼손하는 행위이므로 별로 좋지 않을 것 같다.  
따라서 하위 블루프린트 클래스를 생성한 후, 이 곳에서 작업하도록 하자.  

- 우선 해당 아바타를 게임 플레이 시작 시 기본 캐릭터로 지정하기 위하여,  
기존 `PlayerStart` 아이템을 삭제해주고, 기본 시작 캐릭터로 설정할 블루프린트 클래스 내에서  
`플레이어 자동 빙의` 설정을 `Disabled` -> `Player 0`으로 지정해주자.  

- 커스터마이징은 컴포넌트 패널의 메시 컴포넌트를 활용하면 된다.  
`스켈레톤 메시 에셋` 속성에서 원하는 에셋을 선택하여 적용시켜주면 된다.  

<br>


<br>
<br>
<br>
<br>
<details>
<summary>주의사항</summary>
<div markdown="1">

이 포스팅은 Udemy에서 제공한  
*Unreal Engine 5 C++ 개발자: C++ 학습하고 비디오 게임 제작하기*  
강좌를 바탕으로 작성되었습니다.  

</div>
</details> 