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
  scale: 1.5;

  transition: scale 500ms ease, opacity 1000ms ease;

  box-shadow: 0 0 calc(var(--knob-size) / 18) black;
  text-shadow: 0 0 0.25rem black;

  &.playing-card {
    border-width: 0;
    border-radius: 0.25rem;
    background-repeat: no-repeat;
    background-size: 200% 100%;
    height: calc(var(--knob-size) * (16/10));

    &.blue {
      background-position: center right;
    }

  }

  &.revealed {
    opacity: 1;
    scale: 1;
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

  const knobClass = `${revealed ? 'revealed' : ''}${props.knobAppearance === 'cards' ? ' playing-card' : ''}`;
  console.warn('created knob with class', knobClass)

  return (
    <StyledKnob
      className={knobClass}
      style={{
        rotate: revealed ? `${props.rotation * -1}deg` : '0',
        backgroundImage: props.flipped ? 'radial-gradient(green, #000000)' : 'radial-gradient(var(--knob-color), #000000)',
        borderColor: props.selected ? 'lightgreen' : '#ffffff55',
        backgroundPosition: props.cardColor === 'red' ? 'left center' : 'right center',
      }}
    >
      {props.flipped && props.value}
    </StyledKnob>
  );
}

export default Knob;
