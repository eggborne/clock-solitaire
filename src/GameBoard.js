import styled from 'styled-components';
import Knob from './Knob';
import KnobContainer from './KnobContainer';

const StyledGameBoard = styled.div`
  position: relative;
  align-self: center;
  background-color: var(--alt-bg-color);
  height: var(--game-board-size);
  width: var(--game-board-size);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  & > .options-area {
    width: var(--game-board-size);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;

    & > .option-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      & * {
        width: 7rem;
      }
    }
  }

  & select {
    padding: 0.5rem;
    font-size: inherit;
    font-family: inherit;
    font-weight: bold;
  }

  & > .knob-container {
    padding-top: calc(var(--padding-width) / 2);
    position: absolute;
    height: var(--game-board-size);
  }
`;

function GameBoard(props) {

  return (
    <StyledGameBoard>
      {props.gameStarted ? 
        props.currentDeal.map(knobContainerData => 
          <KnobContainer 
            key={knobContainerData.id}
            selectedKnob={props.selectedKnob}
            className={knobContainerData.className}
            rotation={knobContainerData.rotation}
            knobs={knobContainerData.knobs}
          /> 
        )
        :
        <div className='options-area'>
        <div className='option-row'>
          <label htmlFor='type-select'>Knobs / Cards</label>
          <select name='type-select' className='type-select' onChange={props.onChangeType}>
            <option>Knobs</option>
            <option>Cards</option>
          </select>
        </div>
        <div className='option-row'>
          <label htmlFor='limit-select'>Limit</label>
          <select name='limit-select' className='limit-select' onChange={props.onChangeLimit}>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
          </select>
        </div>
        </div>
      }
    </StyledGameBoard>
  );
}

export default GameBoard;
