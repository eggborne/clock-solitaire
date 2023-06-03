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
    }
  }

  & select, option {
    padding: 0.5rem;
    font-size: inherit;
    font-family: inherit;
    font-weight: bold;
  }

  & input[type='checkbox'] {
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

  console.log('endmodal?', props.loseModalShowing);

  const extraKnobs = [14, 15, 16, 17, 18, 19, 20];

  let limitOptions = [
    10, props.knobAppearance === 'cards' ? 'J' : 11, 
    props.knobAppearance === 'cards' ? 'Q' : 12, 
    props.knobAppearance === 'cards' ? 'K' : 13,
  ];

  if (props.knobAppearance === 'knobs') {
    limitOptions = [...limitOptions, ...extraKnobs];
  }
  return (
    <>
      <Modal type={'lose'} revealed={props.loseModalShowing} headline={'YOU LOSE :('} okButtonText={'Try Again'} onClickOk={props.handleClickTryAgain} getUnflippedCardAmount={props.getUnflippedCardAmount} />
      <Modal type={'win'} revealed={props.winModalShowing} headline={'YOU WIN! :)'} okButtonText={'Play Again'} onClickOk={props.handleClickTryAgain} />
      <ScreenVeil revealed={props.loseModalShowing} />
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
              <select defaultValue={props.cardColor} id='color-select' name='color-select' className='color-select' onChange={props.onChangeCardColor}>
                <option name='red'>Red</option>
                <option name='blue'>Blue</option>
              </select>
            </div>}
            <div className='option-row'>
              <label htmlFor='limit-select'>Limit</label>
              <select id='limit-select' name='limit-select' className='limit-select' onChange={props.onChangeLimit}>
                {limitOptions.map(limit => 
                  <option>{limit}</option>
                )}
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
