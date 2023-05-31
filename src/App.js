import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import GameBoard from './GameBoard';
import Button from './Button';
import { useEffect, useState } from 'react';
import { pause, randomInt } from './util';
import { v4 } from 'uuid';

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
  const [knobAppearance, setKnobAppearance] = useState('cards');
  const [cardColor, setCardColor] = useState('red');
  const [deck, setDeck] = useState([]);
  const [currentDeal, setCurrentDeal] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedKnob, setSelectedKnob] = useState(undefined);

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
          suit: j,
          id: crypto.randomUUID ? crypto.randomUUID() : v4(),
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

  function getKnobDataById(id, arr) {
    return arr.filter(knob => knob.id === id)[0];
  }

  function handleClickStartGame() {
    setGameStarted(true);
    dealGame();
  }

  function handleChangeKnobAppearance(e) {
    console.warn('knobAppearance at handler is', knobAppearance);
    const newAppearance = e.target.value.toLowerCase();
    document.documentElement.style.setProperty('--knob-size', newAppearance === 'cards' ? 'calc(var(--game-board-size) / 7)' : 'calc(var(--game-board-size) / 6)');
    console.log('changed appearance', newAppearance);
    setKnobAppearance(newAppearance);
  }

  function handleChangeCardColor(e) {
    setCardColor(e.target.value.toLowerCase());
  }

  function handleClickMove() {

    // splices the wrong one

    console.log('clicked Move!', selectedKnob);
    const nextCurrentDeal = [ ...currentDeal];
    console.log('movingKnobContainer lane is', selectedKnob.lane)
    const movingKnobContainer = nextCurrentDeal[selectedKnob.lane];
    console.log('movingKnobContainer', movingKnobContainer);
    const movingKnob = movingKnobContainer.knobs.splice(movingKnobContainer.knobs.indexOf(selectedKnob), 1)[0];
    console.log('moving knob', movingKnob);
    const newLaneIndex = selectedKnob.value - 1;
    const newLane =  nextCurrentDeal[selectedKnob.value - 1];
    console.log('sending to newLaneIndex', newLaneIndex)
    newLane.underKnobs.push(movingKnob);
    const newSelectedKnob = newLane.knobs[newLane.knobs.length - 1];
    if (!newSelectedKnob) {
      alert('You lose?');
      return;
    }
    newSelectedKnob.flipped = true;
    setSelectedKnob({...newSelectedKnob, lane: selectedKnob.value - 1});
    setCurrentDeal(nextCurrentDeal);
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
        knobCollection.push({ selectedKnob: selectedKnob, key: randomDraw.id, id: randomDraw.id, value: randomDraw.value, suit: randomDraw.suit, rotation: containerRotation });
      }
      const newKnobContainer = {
        id: i,
        key: i,
        className: `knob-container-${i}`,
        rotation: containerRotation,
        knobs: knobCollection,
        underKnobs: [],
      };
      knobArray.push(newKnobContainer);
    }

    const centerKnobCollection = [];
    let initialSelectedKnob;

    for (let i=0; i < 4; i++) {
      const randomDraw = drawRandomKnob(drawnIds);
      drawnIds.push(randomDraw.id);
      centerKnobCollection.push({ flipped: i===3, selectedKnob: selectedKnob, key: randomDraw.id, id: randomDraw.id, value: randomDraw.value, suit: randomDraw.suit, rotation: '0' });
      if (i===3) {
        initialSelectedKnob = randomDraw;
        console.log('setting initialSelectedKnob to', randomDraw.id);
      }
    }

    const centerKnobContainer = {
      id: knobAmount,
      key: knobAmount,
      className: `knob-container-${knobAmount} center`,
      rotation: '0',
      knobs: centerKnobCollection,
      underKnobs: [],
    };
    knobArray.push(centerKnobContainer);

    setCurrentDeal(knobArray);
    setSelectedKnob({...initialSelectedKnob, lane: knobAmount-1});
    console.log('set selectedKnob to', initialSelectedKnob);
  }

  console.log('selectedKnob', selectedKnob);

  return (
    <StyledApp>
      <Header />
      <div className='game-area'>
        <GameBoard 
          knobAppearance={knobAppearance} 
          cardColor={cardColor} 
          selectedKnob={selectedKnob} 
          gameStarted={gameStarted} 
          currentDeal={currentDeal} 
          onChangeLimit={handleChangeLimit} 
          onChangeAppearance={handleChangeKnobAppearance}
          onChangeCardColor={handleChangeCardColor}
        />
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
