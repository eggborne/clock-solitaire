import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--alt-bg-color);
  height: var(--header-height);
  color: inherit;
  font-family: inherit;
  font-weight: bold;
  font-size: calc(var(--header-height) / 2.5);
  padding: 0 2rem;
  border-radius: calc(var(--padding-width) / 3);

`;

function Button(props) {
  return (
    <StyledButton onClick={props.onClick}>
      {props.label}
    </StyledButton>
  );
}

export default Button;
