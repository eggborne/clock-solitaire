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
  background-image: linear-gradient(var(--bg-color), #ffffff33, var(--bg-color));
  color: var(--text-color);
  height: var(--actual-height);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  &.pre-reveal {
    filter: blur(0.5rem);
    scale: 1.1 0.1;
    opacity: 0.1
  }

  & .name-area {
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin: 1rem;

    transition: all 300ms ease;
  }

  & input[type='text'] {
    width: calc(var(--game-board-size) / 1.5);
    font-family: inherit;
    font-size: 1.5rem;
    text-align: center;
    padding: 0.5rem 0;
    font-weight: bold;
  }

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
  const [loaded, setLoaded] = useState(false);
  const [knobAmount, setKnobAmount] = useState(10);
  const [knobAppearance, setKnobAppearance] = useState('cards');
  const [playerName, setPlayerName] = useState('red');
  const [cardColor, setCardColor] = useState('red');
  const [deck, setDeck] = useState([]);
  const [currentDeal, setCurrentDeal] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedKnob, setSelectedKnob] = useState(undefined);
  const [animations, setAnimations] = useState(true);
  const [loseModalShowing, setLoseModalShowing] = useState(false);
  const [winModalShowing, setWinModalShowing] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      setDeck(createDeck(knobAmount));
    }
  }, [loaded])

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

  function handleChangePlayerName(e) {
    setPlayerName(e.target.value);
  }

  function handleChangeCardColor(e) {
    setCardColor(e.target.value.toLowerCase());
  }

  function handleToggleAnimations(e) {
    setAnimations(e.target.checked);
  }

  function getUnflippedCardAmount() {
    let unflipped = 0;
    for (const row of currentDeal) {
      unflipped += row.knobs.length;
    }
    return unflipped;
  }

  function handleClickMove() {
    const nextCurrentDeal = [ ...currentDeal];
    const movingKnobContainer = nextCurrentDeal[selectedKnob.lane];
    const movingKnob = movingKnobContainer.knobs.splice(movingKnobContainer.knobs.indexOf(selectedKnob), 1)[0];
    const newLane =  nextCurrentDeal[selectedKnob.value - 1];
    newLane.underKnobs.push(movingKnob);
    const newSelectedKnob = newLane.knobs[newLane.knobs.length - 1];
    if (!newSelectedKnob) {   
      if (getUnflippedCardAmount() === 0) {
        setWinModalShowing(true);
      } else {
        setLoseModalShowing(true);
      }
      return;
    }
    newSelectedKnob.flipped = true;
    // const newKnobWithLane = {...newSelectedKnob, lane: newSelectedKnob.value - 1};
    const newKnobWithLane = {...newSelectedKnob, lane: selectedKnob.value - 1};
    setSelectedKnob(newKnobWithLane);
    setCurrentDeal(nextCurrentDeal);
    return nextCurrentDeal;
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

  function handleClickTryAgain() {
    setLoseModalShowing(false);
    setWinModalShowing(false);
    setCurrentDeal([]);
    setDeck(createDeck(knobAmount));
    setGameStarted(false);
  }

  async function handleClickAutoPlay() {
    const newDeal = handleClickMove();
    await pause(1000);
    handleClickMove(newDeal);
  }

  return (
    <StyledApp>
      <Header />
      <div className='game-area'>
        <GameBoard 
          knobAppearance={knobAppearance} 
          cardColor={cardColor} 
          animations={animations} 
          selectedKnob={selectedKnob} 
          gameStarted={gameStarted} 
          currentDeal={currentDeal} 
          onChangePlayerName={handleChangePlayerName}
          onChangeLimit={handleChangeLimit} 
          onChangeAppearance={handleChangeKnobAppearance}
          onChangeCardColor={handleChangeCardColor}
          onToggleAnimations={handleToggleAnimations}
          loseModalShowing={loseModalShowing}
          winModalShowing={winModalShowing}
          handleClickTryAgain={handleClickTryAgain}
          getUnflippedCardAmount={getUnflippedCardAmount}
        />
      </div>
      <div style={{ height: gameStarted ? '0' : 'var(--header-height)', opacity: gameStarted ? '0' : '1', pointerEvents: gameStarted ? 'none' : 'all' }} className='name-area'>
        <input placeholder='Enter name' type='text' id='name-input' name='name-input' className='name-input' onChange={handleChangePlayerName} />
      </div>
      <div className='control-area'>
        {gameStarted ? 
          <>
            <Button round={true} onClick={handleClickMove} label='Move' />
            <Button special={true} onClick={handleClickAutoPlay} label='Autoplay ($5)' />
          </>
          :
          <Button round={true} onClick={handleClickStartGame} label='Start' />
        }
      </div>
      <Footer gameStarted={gameStarted} getUnflippedCardAmount={getUnflippedCardAmount} knobAppearance={knobAppearance} />
    </StyledApp>
  );
}

export default App;
