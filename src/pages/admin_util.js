function drawCards(deck, n) {
  let totalCards = deck.reduce((sum, count) => sum + count, 0);
  let drawnCards = [];

  for (let i = 0; i < n; i++) {
    if (totalCards <= 0) {
      console.log('No cards left to draw!');
      break;
    }

    let randomIndex = Math.floor(Math.random() * totalCards);
    let chosenCardIndex = -1;
    let cumulativeSum = 0;

    // 선택된 카드 타입 결정
    for (let j = 0; j < deck.length; j++) {
      cumulativeSum += deck[j];
      if (randomIndex < cumulativeSum) {
        chosenCardIndex = j;
        break;
      }
    }

    // 카드 뽑기 및 업데이트
    if (chosenCardIndex !== -1 && deck[chosenCardIndex] > 0) {
      drawnCards.push(chosenCardIndex);
      deck[chosenCardIndex]--;
      totalCards--;
    } else {
      i--; // 실패 시 다시 시도
    }
  }

  return { deck, drawnCards };
}

export default drawCards;
