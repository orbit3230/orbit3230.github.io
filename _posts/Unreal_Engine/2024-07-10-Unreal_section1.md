---
layout: post
title: "[Unreal Engine] Section 1 - Warehouse Wreckage"
excerpt: "Playing with Physics, Spawning projectiles, Aiming the projectile, BXP Level Build, Asset, Game mechanism, Reloading Levels"

tags:
  - [언리얼 엔진, Unreal, CPP]

toc: true

date: 2024-07-10
last_modified_at: 2024-07-10
---
## 프로젝트 설정
### 1. 컨텐츠 드로어
- 컨텐츠 드로어 : 좌측 하단에 위치. 폴더와 파일들을 열 수 있는 창을 띄운다.  

  - `Content` -> `StarterContent` -> `Maps` : 맵이란, 이 게임에 존재하는 **레벨**이다.  
  해당 폴더 내 노란색 표시된 파일들을 클릭하여 레벨을 로드할 수 있다.

<br>

### 2. 블루프린트 에디터
- 좌측 상단의 액터 생성 버튼 바로 오른쪽 아이콘을 클릭하면, 블루프린트 관련 메뉴들이 있다.  

  - 여기서 `레벨 블루프린트 열기` 를 클릭하여 블루프린트 에디터를 열 수 있다.

- 블루프린트 에디터의 정중앙에 있는 것은 `Event Graph` 라고 하며,  
여기에서 블루프린트 작성을 할 수 있다.  

  - 이벤트 그래프를 우클릭해보면, 어마어마하게 많은 기능들이 있음을 알 수 있다.  

<br>

## 블루프린트 에디터
### 1. 문자열 출력
- 블루프린트 에디터에서 우클릭을 하면 기능 리스트가 나열되었다.  

  - 이 중 어느 하나를 클릭해보자. 클릭하여 생성되는 오브젝트를 `Node(노드)` 라고 한다.  

- `Print String` 노드와 `Event BeginPlay` 노드를 Output Pin - Input Pin 끼리 연결해보자.  
이제 게임을 시작할 때(`Event BeginPlay`) 지정한 문자열이 출력(`Print String`)되는 기능을 추가한 것이다.

- 추가적으로 하나의 `Print String`을 더 만들어보고, 첫 번째 출력 노드와 연결해보자.  

  - 참고로 Output Pin에서 Connection을 끌어다가 빈 공간에 위치시키면, 해당 Connection을 Input으로 받을 새로운 노드 생성 창을 자동으로 띄운다.  

- 이렇게 두 번째 출력 노드를 생성하고 시작해보면, 아주 빠르게 두 이벤트가 연달아 발생한 것을 볼 수 있다.  
추가적으로 먼저 생성한 출력 노드 이벤트가 아래로 간 것도 확인할 수 있다.


<br>

## Playing with Physics
- 기본적으로 모든 물체는 물리 법칙의 영향을 받지 않는다.  
예를들어 물체를 공중에 띄운 후 시작을 하여도 물체는 떨어지지 않고 공중에 매달려있게 된다.  

  - 이는 CPU가 물리법칙을 적용하는데 부담을 가지기 때문에,  
  기본적으로는 씬 안의 오브젝트에 물리법칙을 Default로 적용하지는 않는 것이다.  

### 1. Applying Physics to Object
- 물체에 물리 법칙을 적용해보자.  

- 어떠한 물체를 선택하면, 오른쪽 탭에는 해당 물체에 대한 다양한 정보들이 표시된다.   

  - 이 중에서 위쪽은 아이템 리스트들이 표시되며, 아래쪽의 디테일 탭이 해당 물체에 대한 Property이다.  

  - 아래쪽에 `일반`, `액터`, `LOD`, ... 등의 필터들이 있는데, 우린 이 중에서 `피직스` 탭에 주목할 것이다.  

- `피직스` 탭에서, `피직스 시뮬레이트` 체크박스에 체크를 하게되면, 해당 물체에 물리 법칙이 적용된다.  

  - 이는 사용자가 직접 새로 추가한 오브젝트에도 적용된다.  

<br>

### 2. Antigravity
- 동일하게 물체의 `피직스` 탭에서, `중력 활성화` 체크박스에 체크를 해제 하게되면,  
해당 물체는 중력의 영향을 전혀 받지 않는 것 처럼 속성이 바뀐다.  

<br>

### 3. Mass
- 기본적으로는 `질량` 속성에 체크박스가 비활성화되어 해당 물체에 Default 질량 값이 적용되어 있지만,  
해당 체크박스를 활성화 하게되면 직접 질량값을 지정해 줄 수 있다.  

  - 이를 이용하여 물리 법칙에 영향이 가도록 변경할 수 있다.  

## Projectile
### 1. Spawning Projectiles

### 2. Aiming the Projectile

## BXP Level Build

## Asset

## Game mechanism

## Reloading Levels