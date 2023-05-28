import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { pause } from './util';

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

  opacity: 0;
  scale: 2;

  transition: scale 500ms ease, opacity 1000ms ease;

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

  console.log('knob id is', props.id);
  console.log('selectedKnob id is', props.selectedKnob);

  return (
    <StyledKnob
      className={revealed ? 'revealed' : ''}
      style={{
        rotate: revealed ? `${props.rotation * -1}deg` : '0',
        backgroundImage: props.selected ? 'radial-gradient(green, #000000)' : 'radial-gradient(var(--knob-color), #000000)',
      }}
    >
      {props.value}
    </StyledKnob>
  );
}

export default Knob;
