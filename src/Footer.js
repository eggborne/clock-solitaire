import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: var(--alt-bg-color);
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Footer() {
  return (
    <StyledFooter>
      <h4>footer</h4>
    </StyledFooter>
  );
}

export default Footer;
