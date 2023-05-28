import styled from 'styled-components';

function KnobContainer(props) {
  const StyledKnobContainer = styled.div`
    padding-top: calc(var(--padding-width) / 2);
    position: absolute;
    height: var(--game-board-size);

    &.center {
      padding-top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  `;
  return (
    <StyledKnobContainer
      className={props.className}
      style={{
        rotate: props.rotation + 'deg',
      }}>
      {props.knobs}
    </StyledKnobContainer>
  );
}

export default KnobContainer;
