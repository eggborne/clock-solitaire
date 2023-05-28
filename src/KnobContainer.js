import styled from 'styled-components';
import Knob from './Knob';

const StyledKnobContainer = styled.div`
  padding-top: calc(var(--padding-width) / 2);
  position: absolute;
  height: var(--game-board-size);
  width: var(--knob-size);
  display: flex;
  flex-direction: column;
  // outline: 1px solid white;

  & > div:nth-child(1) {
    translate: 0 15%;
    z-index: 3;
    scale: 0.975;
  }
  & > div:nth-child(2) {
    translate: 0 30%;
    z-index: 2;
    scale: 0.95;
  }
  & > div:nth-child(3) {
    translate: 0 45%;
    z-index: 1;
    scale: 0.925;
  }

  &.center {
    padding-top: 0;

    & > div {
      position: absolute;
      top: 47.5%;
      transform: translateY(-50%);
    }
  }
`;

function KnobContainer(props) {
  return (
    <StyledKnobContainer
      key={props.id}
      className={props.className}
      style={{
        rotate: props.rotation + 'deg',
      }}>
      {props.knobs.map(knobData => 
        // knobComponent
        <Knob 
          selected={props.selectedKnob === knobData.id}
          key={knobData.id} 
          id={knobData.id} 
          value={knobData.value} 
          rotation={knobData.rotation}
        />
      )}
    </StyledKnobContainer>
  );
}

export default KnobContainer;
