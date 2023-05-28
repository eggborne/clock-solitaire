import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: var(--alt-bg-color);
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;

  & > h1 {
    font-size: calc(var(--header-height) / 2.5);
  }
`;

function Header() {
  return (
    <StyledHeader>
      <h1>{'Clock Solitaire :)'}</h1>
    </StyledHeader>
  );
}

export default Header;
