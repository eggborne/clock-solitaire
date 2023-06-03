import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--alt-bg-color);
  height: var(--header-height);
  color: inherit;
  font-family: inherit;
  font-weight: bold;
  font-size: calc(var(--header-height) / 2.5);
  padding: 0 4rem;
  border-radius: calc(var(--padding-width) / 3);

  transition: all 500ms ease;

  &.round {
    border-radius: 50%;
    width: calc(var(--header-height) * 2.5);
    height: calc(var(--header-height) * 2.5);
    padding: 0;
  }

  &.special {
    background-color: #004400;
    color: white;
    height: unset;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    margin-top: 1rem;

    :disabled {
      opacity: 0.5;
    }
  }

`;


function Button(props) {
  const buttonClass = props.round && props.label === 'Move' ? 'round' : props.special ? 'special' : '';
  return (
    <StyledButton disabled={props.special} onClick={props.onClick} className={buttonClass}>
      {props.label}
    </StyledButton>
  );
}

export default Button;
