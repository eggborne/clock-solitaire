import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import GameBoard from './GameBoard';
import Button from './Button';
import { useState } from 'react';

function createDeck(knobAmount) {
  const deck = [];
  deck.length = 0;
  for (let i = 0; i < knobAmount; i++) {
    for (let j = 0; j < 4; j++) {
      deck.push({
        value: (i + 1),
      })
    }
  }
  return deck;
}

createDeck();

function App() {
  const StyledApp = styled.main`
    background-color: var(--bg-color);
    color: var(--text-color);
    height: var(--actual-height);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;

    & > .game-area, .control-area {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding-top: calc(var(--padding-width) / 2);
    }
  `;

  const [ knobAmount, setKnobAmount] = useState(10);
  const [ deck, setDeck] = useState(createDeck(12));

  return (
    <StyledApp>
      <Header />
      <div className='game-area'>
        <GameBoard knobAmount={knobAmount} />
      </div>
      <div className='control-area'>
        <Button label='Start' />
      </div>
      <Footer />
    </StyledApp>
  );
}

export default App;
