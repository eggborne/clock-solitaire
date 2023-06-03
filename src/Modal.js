import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  background-color: var(--alt-bg-color);
  width: calc(var(--game-board-size) / 1.5);
  height: calc(var(--game-board-size) / 2);
  border-radius: calc(var(--game-board-size) * 0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  box-shadow: 0 0 1rem black;
  opacity: 0;
  pointer-events: none;
  scale: 0.5;
  transition: all 500ms ease-in-out;
  z-index: 4;
  border: 0.1rem solid #00000044;

  & > h1 {
    font-size: calc(var(--header-height) / 2.5);
  }

  &.revealed {
    opacity: 1;
    scale: 1;
    pointer-events: all;
  }

  & > .button-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

function Modal(props) {
  return (
    <StyledModal className={props.revealed ? 'revealed' : ''}>
      {props.revealed &&
      <>
        <div><h1>{props.headline}</h1></div>
        {props.type === 'lose' && <div>Cards left: {props.getUnflippedCardAmount()}</div>}
        <div className='button-area'>
          <button onClick={props.onClickOk}>{props.okButtonText}</button>
        </div>
      </>
      }
    </StyledModal>
  );
}

export default Modal;
