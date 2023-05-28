import styled from 'styled-components';
import Knob from './Knob';
import KnobContainer from './KnobContainer';

function GameBoard(props) {
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

    & > .knob-container {
      padding-top: calc(var(--padding-width) / 2);
      position: absolute;
      height: var(--game-board-size);
    }
  `;
  
  const knobArray = [];
  for (let i = 0; i < (props.knobAmount - 1); i++) {
    knobArray.push({
      className: `knob-container-${i}`,
      rotation: (360/(props.knobAmount - 1)) * i,
      value: i+1,
    });
  }
  knobArray.push({
    className: `knob-container-${props.knobAmount} center`,
    rotation: '0',
    value: props.knobAmount,
  });
  return (
    <StyledGameBoard>
      {knobArray.map((knobData, k) => 
        <KnobContainer 
          key={k}
          className={knobData.className}
          rotation={knobData.rotation}
          knobs={
            <Knob value={knobData.value} />
          }
        >
          
        </KnobContainer>
      )}
    </StyledGameBoard>
  );
}

export default GameBoard;
