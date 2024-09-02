---
layout: post
title: "[연구실] Virtual Box - Ubuntu에서 터미널 안 열릴 때 해결방법"
excerpt: "터미널 안 열릴 때, sudo 권한 부여"

tags:
  - [연구실, Ubuntu]

toc: true

date: 2024-03-11
last_modified_at: 2024-03-11
---
## 문제 발견
- 리눅스 프로그래밍 수업 실습을 위해 Virtual Box와 Ubuntu를 설치하였다.  

- 리눅스 환경을 가상머신을 통해 띄우는 데에 성공했으나,  
문제가 두 가지 발생했다.  

  - (1) 터미널이 열리지 않음
  - (2) `sudo`를 사용한 명령 시 에러  
  (`사용자명 is not in the sudoers file ~~` 에러메세지)  

### 1. 터미널이 열리지 않을 때
[해당 페이지를 참고했다.][def]

- 문제는 내가 가상머신을 생성할 때 특정 체크박스를 체크하지 않아 발생했다고 추정된다.  
(Skip Unattended Installation)

- ***해결 방법***
  - `Setting`에 들어가서 **언어를 아무 언어로나 바꿔준 후**(한국어 있음),  
  **재로그인**하면 터미널이 정상적으로 실행된다.  

  <br>

### 2. sudo 권한 없을 때
[해당 페이지를 참고했다.][def2]
- Ubuntu에서 `sudo`를 활용한 명령어를 입력한 경우,  
(윈도우의 관리자 권한으로 실행 느낌인 듯)  
`사용자명 is not in the sudoers file. This incident will be reported.` 에러 메세지와 함께 명령이 수행되지 않는다.  

- 이는 `sudo` 권한이 사용자에게 없는 것으로,  
터미널에 다음과 같은 명령어를 입력하여 권한을 부여할 수 있다.  

  - (1) root 계정으로 변환
  `su -`
  - (2) 사용자에게 `sudo` 권한 부여(그룹에 참가)
  `usermod -aG sudo 사용자명`
  - (3) 다시 기존 사용자 계정으로 복귀
  `su - 사용자명`  

- 해당 절차를 완료하고 나면, `sudo` 명령이 가능하다.  


[def]: https://siloam72761.tistory.com/entry/VirtualBox-Ubuntu%EC%97%90%EC%84%9C-%ED%84%B0%EB%AF%B8%EB%84%90-%EC%95%88-%EC%97%B4%EB%A6%B4-%EB%95%8C-%ED%95%B4%EA%B2%B0%EB%B0%A9%EB%B2%95
[def2]: https://bskyvision.com/entry/%EC%9A%B0%EB%B6%84%ED%88%AC-%EC%82%AC%EC%9A%A9%EC%9E%90%EB%AA%85-is-not-in-the-sudoers-file-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95