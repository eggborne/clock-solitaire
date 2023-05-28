import styled from 'styled-components';

function Knob(props) {
  const StyledKnob = styled.div`
    background-image: radial-gradient(var(--knob-color), #00000055);
    width: var(--knob-size);
    height: var(--knob-size);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: calc(var(--knob-size) / 2);
    line-height: 100%;

    transition: all 300ms ease;
  `;
  return (
    <StyledKnob>
      {props.value}
    </StyledKnob>
  );
}

export default Knob;
