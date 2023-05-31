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

  & > div:not(.under):nth-of-type(1) {
    translate: 0 10%;
    z-index: 3;
    transition-delay: 600ms;
  }
  & > div:not(.under):nth-of-type(2) {
    translate: 0 20%;
    z-index: 2;
    transition-delay: 400ms;
  }
  & > div:not(.under):nth-of-type(3) {
    translate: 0 30%;
    z-index: 1;
    transition-delay: 200ms;
  }
  & > div:not(.under):nth-of-type(4) {
    translate: 0 0;
    z-index: 4;
    transition-delay: 800ms;
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
            // flipped={true}
            flipped={knobData.flipped}
            selected={props.selectedKnob.id === knobData.id}
            animations={props.animations}
            key={knobData.id} 
            id={knobData.id} 
            value={knobData.value} 
            suit={knobData.suit}
            rotation={knobData.rotation}
            knobAppearance={props.knobAppearance}
          />
        )}
        {props.knobs.filter(knob => knob.flipped).map(knobData => 
          <Knob 
            cardColor={props.cardColor}
            flipped={knobData.flipped}
            selected={props.selectedKnob.id === knobData.id}
            animations={props.animations}
            key={knobData.id} 
            id={knobData.id} 
            value={knobData.value} 
            suit={knobData.suit}
            rotation={knobData.rotation}
            knobAppearance={props.knobAppearance}
          />
        )}
        {props.underKnobs.map(knobData => 
          <Knob 
            cardColor={props.cardColor}
            flipped={false}
            under={true}
            selected={false}
            animations={props.animations}
            key={knobData.id} 
            id={knobData.id} 
            value={knobData.value} 
            suit={knobData.suit}
            rotation={knobData.rotation}
            knobAppearance={props.knobAppearance}
          />
        )}
      </StyledKnobContainer>
  );
}

export default KnobContainer;
