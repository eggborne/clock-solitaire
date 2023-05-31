import styled from 'styled-components';

const StyledScreenVeil = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000cc;
  width: 100vw;
  height: var(--actual-height);
  border-radius: calc(var(--game-board-size) * 0.02);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: all 500ms ease-in-out;
  z-index: 3;

  & > h1 {
    font-size: calc(var(--header-height) / 2.5);
  }

  &.revealed {
    opacity: 1;
    pointer-events: all;
  }
`;

function ScreenVeil(props) {
  return (
    <StyledScreenVeil className={props.revealed ? 'revealed' : ''}>
      <h1>{props.headline}</h1>
    </StyledScreenVeil>
  );
}

export default ScreenVeil;
