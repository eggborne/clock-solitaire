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
    translate: 0 10%;
    z-index: 3;
  }
  & > div:nth-child(2) {
    translate: 0 20%;
    z-index: 2;
  }
  & > div:nth-child(3) {
    translate: 0 30%;
    z-index: 1;
  }

  &.center {
    padding-top: 0;

    & > div {
      position: absolute;
      top: 46%;
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
        {props.knobs.filter(knob => !(knob.flipped)).map(knobData => 
          <Knob 
            cardColor={props.cardColor}
            flipped={knobData.flipped}
            selected={props.selectedKnob.id === knobData.id}
            key={knobData.id} 
            id={knobData.id} 
            value={knobData.value} 
            rotation={knobData.rotation}
            knobAppearance={props.knobAppearance}
          />
        )}
        {props.knobs.filter(knob => knob.flipped).map(knobData => 
          <Knob 
            cardColor={props.cardColor}
            flipped={knobData.flipped}
            selected={props.selectedKnob === knobData.id}
            key={knobData.id} 
            id={knobData.id} 
            value={knobData.value} 
            rotation={knobData.rotation}
            knobAppearance={props.knobAppearance}
          />
        )}
      </StyledKnobContainer>
  );
}

export default KnobContainer;
