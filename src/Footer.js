import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: var(--alt-bg-color);
  height: var(--header-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #aaaaaa88;

  & > h4 {
    font-size: 0.75rem;

    &:last-of-type {
      margin: 0.25rem;
      & > a {
        color: lightblue;
      }
    }
  }

  & a {
    color: #aaffaa88;
    text-decoration: none;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <h4>made just for fun by <a href='mailto:mike@mikedonovan.dev'>mike@mikedonovan.dev</a></h4>
      <h4><a href='https://github.com/eggborne/clock-solitaire'>View source on GitHub</a></h4>
    </StyledFooter>
  );
}

export default Footer;
