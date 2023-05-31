import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledKnob = styled.div`
  position: absolute;
  border: 1px solid #ffffff55;
  width: var(--knob-size);
  height: var(--knob-size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: calc(var(--knob-size) / 2);
  line-height: 100%;
  z-index: 4;
  color: lightgreen;
  font-size: 2rem;

  opacity: 0;
  transform: translateY(-2rem);
  scale: 1.5;

  transition: scale 300ms ease, opacity 500ms ease;

  box-shadow: 0 0 calc(var(--knob-size) / 18) black;
  text-shadow: 0 0 0.25rem black;

  &.playing-card {
    // background-image: url(../public/bicyclebacks-1506x1052.jpg) !important;
    border-width: 0;
    border-radius: 0.25rem;
    background-repeat: no-repeat;
    background-size: 200% 100%;
    --card-height: calc(var(--knob-size) * (96/71));
    height: var(--card-height);

    &.flipped {
      background-size: 1300% 400%;
    }

    &.blue {
      background-position: center right;
    }

  }

  &.selected {
    outline: 0.25rem solid lightgreen;
    transition-delay: 100ms !important; 
    z-index: 5 !important;
  }

  &.under {
    transform: translate(0, calc(var(--padding-width) * -1)) !important;
    rotate: none !important;
    z-index: 0 !important;
    transition-delay: 0ms !important;
  }

  &.revealed {
    opacity: 1;
    scale: 1;
    transform: none;
  }
`;

function Knob(props) {
  const [ revealed, setRevealed ] = useState(false);

  useEffect(() => {
    if (!revealed) {
      async function reveal() {
        setRevealed(true);
      }
      reveal();
    }
  }, [revealed]);

  let knobClass = `${revealed ? 'revealed' : ''}${props.knobAppearance === 'cards' ? ' playing-card' : ''}`;
  if (props.flipped) {
    knobClass += ' flipped';
  }
  if (props.under) {
    knobClass += ' under';
  }
  if (props.selected) {
    knobClass += ' selected';
  }
  const knobBackgroundImage = props.flipped ? 'radial-gradient(green, #000000)' : 'radial-gradient(var(--knob-color), #000000)';
  const knobBackgroundPosition = props.flipped ? 
    `calc(var(--knob-size) * ${props.value-1} * -1) calc(var(--card-height) * ${props.suit} * -1)`
  :
  props.cardColor === 'red' ? 'left center' : 'right center';

  return (
    <StyledKnob
      className={knobClass}
      style={{
        rotate: revealed ? `${props.rotation * -1}deg` : '0',
        backgroundImage: knobBackgroundImage,
        // borderColor: props.selected ? 'lightgreen' : '#ffffff55',
        backgroundPosition: knobBackgroundPosition,
      }}
    >
    </StyledKnob>
  );
}

export default Knob;
