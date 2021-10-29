# CoverLetterGame
## 취업용 자기소개서 에디터 "자소설게임"
```
master branch에서 소스코드 볼 수 있습니다.
```
> 주요기능
> 
> 0. 로그인 및 회원가입
> 1. 자기소개서 버전 생성 및 관리
> 2. 자기소개서 에디터 제공
> 3. 글자수 체크 (공백 포함, 미포함 모두 체크 가능)
> 4. 문법검사 기능  
> #

> 사용한 기술
> 
> 1. React.js, html, css 
> 2. Node.js, MongoDB
> 3. hanspell.js 라이브러리
> 4. git, github, aws
> #

- 로그인 및 회원가입 기능
```
1. JWT를 활용해서 로그인 기능 구현. 토큰 발급 및 회수 기능 개발. 
2. 회원가입 절차를 간소화시킴. (이메일, 아이디, 비밀번호만 입력하면 쉽게 가입 가능)
```
![스크린샷(275)](https://user-images.githubusercontent.com/64837637/139394845-088296a6-5068-4bf7-86cc-fe963478a55c.png)  
#

- 자기소개서 히스토리
```
1. API로 부터 받아온 자기소개서 히스토리 정보를 Card Layout으로 구성. Card 레이아웃은 컴포넌트화해서 App.js 에서 루프문으로 불러온다.
2. 상단의 박스에서 자소서 타이틀과 버튼을 클릭하면 새로운 자기소개서 히스토리가 생성된다.
```
![스크린샷(277)](https://user-images.githubusercontent.com/64837637/139394860-4989e2d3-8402-452a-8fa6-d860fe5a5f82.png)  
#

- 자기소개서 에디터 기능
```
1. 자기소개서 작성 및 글자수 체크가 가능. 공백 포함/미포함 모두 확인 가능.
2. 버젼 생성 버튼을 클릭하면, 서버 측에 현재 텍스트와 타이틀이 전달되고, DB에 저장. 이전 버젼의 텍스트도 볼 수 있음.
```
![스크린샷(278)](https://user-images.githubusercontent.com/64837637/139394872-8eae81ec-8652-46cb-ba83-5e5aa276f2c3.png)  
#

- 문법 검사 기능
```
1. Hanspell.js 라이브러를 활용해서 문법검사기능 추가. 링크 -> https://www.npmjs.com/package/hanspell 
2. 받아온 결과 역시 Card Layout으로 보기 좋게 정리 
```
![스크린샷(279)](https://user-images.githubusercontent.com/64837637/139394881-f08593d2-6ee4-4584-8d5a-eefdcf8d815f.png)
