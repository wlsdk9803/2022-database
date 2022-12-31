const slider = document.getElementById("js-range");
const output = document.getElementById("maxValue");

output.innerHTML = slider.value; //초기값 설정
//slide input 값이 바뀔 때마다 실행
const selectRange = () => {
  const maxNum = slider.value; //slide input의 value값을 maxNum에 저장
  output.innerHTML = maxNum; //maxNum을 html에서 id가 maxValue인 span 태그에 출력
};

const myNum = document.getElementById("myNum");
const display = document.getElementById("js-result");
const onPlay = (e) => {
  e.preventDefault();
  const randomNumber = Math.floor(Math.random() * slider.value); //범위 내 난수 생성
  //console.log(randomNumber);

  const MyNumber = myNum.value; //user가 입력하는 수
  const isWin = MyNumber == randomNumber ? "win" : "lose";

  const diplaySpan = display.querySelector("span");
  diplaySpan.innerHTML = `
    You choose: ${MyNumber}, the machine choose: ${randomNumber}.<br/>
    <b>You ${isWin}!<b/>
    `;
};
btn.addEventListener("click", onPlay);
