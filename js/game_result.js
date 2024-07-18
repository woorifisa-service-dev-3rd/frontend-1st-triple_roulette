/**
 * jackpot 에 해당하는 문자열 list import 받아오기
 * (데이터 분리)
 */
import { jackpotList } from "./jackpot_list_data.js";

export function gameResultCheck() {
  /**
   * 현재 사용자의 결과 가져오기
   */
  const topic = ""; // 추후 topic 정해지면 수정할 부분
  const resultList = document.querySelectorAll(".seven_img");
  const result1 = resultList[0].id;
  const result2 = resultList[1].id;
  const result3 = resultList[2].id;

  /**
   * 게임 결과 알고리즘
   */
  let gameResult = 0; // 최종 게임 결과
  let flag = true;

  if (result1 == result2 && result1 == result3) {
    for (let i = 0; i < jackpotList.length; i++) {
      if (result1 < jackpotList[i]) break; // 코드 효율을 위해 현재 배열의 문자열이 기본 문자열보다 큰 경우 break
      if (jackpotList[i] === result1) {
        gameResult = 1;
        flag = false;
        break; // 현재 img id 가 jackpot 결과인 경우 break
      } // 모두 일치는 하지만 jackpot 은 아닌 경우
    }
  } else gameResult = -1; // 아무것도 아닌 경우

  /**
   * 결과 이후 action
   */
  const resultArea = document.querySelector("#triple_title");

  if (gameResult === 1) {
    // 3가지 일치 and jackpot
    resultArea.textContent = "🤑 jackpot 🤑";
  } else if (gameResult === 0) {
    // 3가지 일치 but not jackpot
    resultArea.textContent = "🤗 Good!";
  } else if (gameResult === -1) {
    // 3가지 불일치
    resultArea.textContent = "😂 Dud..";
  }
}
