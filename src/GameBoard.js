import styled from 'styled-components';
import Knob from './Knob';
import KnobContainer from './KnobContainer';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import ScreenVeil from './ScreenVeil';

const StyledGameBoard = styled.div`
  position: relative;
  align-self: center;
  // background-color: var(--alt-bg-color);
  height: var(--game-board-size);
  width: var(--game-board-size);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  & > .options-area {
    
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;

    & > .option-row {
      width: var(--game-board-size);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background-color: #00000055;
      border-radius: 0.5rem;
      padding: 1rem;
      width: min-content;

      & * {
        width: 7rem;
      }

      &:last-child {
        justify-content: space-between;
        width: calc(var(--game-board-size) / 2);
        align-self: center;
      }
    }
  }

  & select, option {
    padding: 0.5rem;
    font-size: inherit;
    font-family: inherit;
    font-weight: bold;
  }

  & input {
    scale: 2;
    margin: 0;
    padding: 0;
  }

  & .knob-area {
    min-width: 100vw;
    min-height: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  & .knob-container {
    padding-top: calc(var(--padding-width) / 2);
    position: absolute;
    height: var(--game-board-size);
  }
`;

function GameBoard(props) {

  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!revealed) {
      setRevealed(true);
    }
  });

  console.log('endmodal?', props.endModalShowing)

  return (
    <>
      <Modal revealed={props.endModalShowing} headline={'YOU LOSE :('} onClickOk={props.handleClickTryAgain} />
      <ScreenVeil revealed={props.endModalShowing} />
      <StyledGameBoard>
        {props.gameStarted ? 
        <div className='knob-area' style={{
          scale: revealed ? '1' : '3',
        }}>
          {props.currentDeal.map(knobContainerData => 
            <KnobContainer 
              key={knobContainerData.id}
              selectedKnob={props.selectedKnob}
              animations={props.animations}
              className={knobContainerData.className}
              rotation={knobContainerData.rotation}
              knobs={knobContainerData.knobs}
              underKnobs={knobContainerData.underKnobs}
              knobAppearance={props.knobAppearance}
              cardColor={props.cardColor}
            /> 
          )}
        </div>
          :
          <div className='options-area'>
            <div className='option-row'>
              <label htmlFor='type-select'>Knobs / Cards</label>
              <select id='type-select' name='type-select' className='type-select' onChange={props.onChangeAppearance}>
                <option selected={props.knobAppearance === 'knobs'}>Knobs</option>
                <option selected={props.knobAppearance === 'cards'}>Cards</option>
              </select>
            </div>
            {props.knobAppearance === 'cards' && <div className='option-row'>
              <label htmlFor='color-select'>Card color</label>
              <select id='color-select' name='color-select' className='color-select' onChange={props.onChangeCardColor}>
                <option selected={props.cardColor === 'red'}>Red</option>
                <option selected={props.cardColor === 'blue'}>Blue</option>
              </select>
            </div>}
            <div className='option-row'>
              <label htmlFor='limit-select'>Limit</label>
              <select id='limit-select' name='limit-select' className='limit-select' onChange={props.onChangeLimit}>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
              </select>
            </div>
            <div className='option-row'>
              <label htmlFor='animation-toggle'>Animations</label>
              <input defaultChecked type='checkbox'id='animation-toggle' name='animation-toggle' className='animation-toggle' onChange={props.onToggleAnimations} />
            </div>
          </div>
        }
      </StyledGameBoard>
    </>
  );
}

export default GameBoard;
