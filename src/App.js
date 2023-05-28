import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import GameBoard from './GameBoard';
import Button from './Button';
import { useEffect, useState } from 'react';
import { pause, randomInt } from './util';
import Knob from './Knob';

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

function App() {

  const [knobAmount, setKnobAmount] = useState(10);
  const [deck, setDeck] = useState([]);
  const [currentDeal, setCurrentDeal] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedKnob, setSelectedKnob] = useState('');

  useEffect(() => {
    setDeck(createDeck(knobAmount));
  }, [])

  function handleChangeLimit(e) {
    const newLimit = e.target.value;
    console.log('newLimit', newLimit);
    setKnobAmount(newLimit);
    setDeck(createDeck(newLimit));
  }

  function createDeck(newLimit) {
    const newDeck = [];
    for (let i = 0; i < newLimit; i++) {
      for (let j = 0; j < 4; j++) {
        newDeck.push({
          value: (i + 1),
          id: crypto.randomUUID(),
        });
      }
    }
    console.log('made deck', newDeck);
    return newDeck;
  }

  function drawRandomKnob(drawnIds) {
    const nextDeck = [...deck].filter(knob => !drawnIds.includes(knob.id));
    const randomIndex = randomInt(0, nextDeck.length - 1);
    const randomCard = nextDeck.splice(randomIndex, 1)[0];
    setDeck(nextDeck);
    return randomCard;
  }

  function handleClickStartGame() {
    setGameStarted(true);
    dealGame();
  }

  function handleClickMove() {
    console.log('clicked Move!', selectedKnob);
    const nextCurrentDeal = [ ...currentDeal];
    
  }

  async function dealGame() {
    const knobArray = [];
    const drawnIds = [];
    for (let i = 0; i < (knobAmount - 1); i++) {
      const containerRotation = (360 / (knobAmount - 1)) * i;
      const knobCollection = [];
      for (let j=0; j < 4; j++) {
        const randomDraw = drawRandomKnob(drawnIds);
        drawnIds.push(randomDraw.id);
        knobCollection.push({ selectedKnob: selectedKnob, key: randomDraw.id, id: randomDraw.id, value: randomDraw.value, rotation: containerRotation });
      }
      const newKnobContainer = {
        id: i,
        key: i,
        className: `knob-container-${i}`,
        rotation: containerRotation,
        knobs: knobCollection,
      };
      knobArray.push(newKnobContainer);
    }

    const centerKnobCollection = [];
    let initialSelectedKnob;

    for (let i=0; i < 4; i++) {
      const randomDraw = drawRandomKnob(drawnIds);
      drawnIds.push(randomDraw.id);
      centerKnobCollection.push({ selectedKnob: selectedKnob, key: randomDraw.id, id: randomDraw.id, value: randomDraw.value, rotation: '0' });
      if (i===3) {
        initialSelectedKnob = randomDraw.id;
        console.log('setting initialSelectedKnob to', randomDraw.id);
      }
    }

    const centerKnobContainer = {
      id: knobAmount,
      key: knobAmount,
      className: `knob-container-${knobAmount} center`,
      rotation: '0',
      knobs: centerKnobCollection,
    };
    knobArray.push(centerKnobContainer);

    setCurrentDeal(knobArray);
    setSelectedKnob(initialSelectedKnob);
    console.log('set selectedKnob to', initialSelectedKnob);
  }

  return (
    <StyledApp>
      <Header />
      <div className='game-area'>
        <GameBoard selectedKnob={selectedKnob} gameStarted={gameStarted} currentDeal={currentDeal} onChangeLimit={handleChangeLimit} />
      </div>
      <div className='control-area'>
        {gameStarted ? 
          <Button onClick={handleClickMove} label='Move' />
          :
          <Button onClick={handleClickStartGame} label='Start' />
        }
      </div>
      <Footer />
    </StyledApp>
  );
}

export default App;
