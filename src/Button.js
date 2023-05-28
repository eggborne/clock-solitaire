import styled from 'styled-components';

function Button(props) {
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
  return (
    <StyledButton>
      {props.label}
    </StyledButton>
  );
}

export default Button;
