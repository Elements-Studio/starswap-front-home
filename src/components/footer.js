import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Twitter from '../images/twitter.inline.svg'
import Github from '../images/github.inline.svg'
import Discord from '../images/discord.inline.svg'
import Telegram from '../images/telegram.png'

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  position: relative;
  padding: 2rem;

  @media (max-width: 1155px) {
    display: block;
  }

  @media (max-width: 960px) {
    padding: 1rem;
  }
`

const StyledFooterLinkSection = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  line-height: 1;
`

const StyledFooterLink = styled(Link)`
  margin-right: 50px;
  color: ${({ theme }) => theme.textColor};
`

const StyledToLink = styled.a`
  margin-right: 50px;
  color: ${({ theme }) => theme.textColor};
`

const StyledTwitter = styled(Twitter)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  width: 16px;
  height: 16px;
  margin-right: 50px;
`

const StyledDiscord = styled(Discord)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  width: 16px;
  height: 16px;
`

const StyledGithub = styled(Github)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  width: 16px;
  height: 16px;
  margin-right: 50px;
`

const Footer = () => {
  return (
    <StyledFooter>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Starswap</p>
      <StyledFooterLinkSection>
        <StyledFooterLink to="/about">About</StyledFooterLink>
        <StyledToLink href="https://starswap.xyz" rel="noopener noreferrer" target="_blank">App</StyledToLink>
        <StyledFooterLink to="/faq">FAQ</StyledFooterLink>
        <a href="http://t.me/StarswapEN" rel="noopener noreferrer" target="_blank">
          <img src={Telegram} style={{width: '16px', height: '16px', marginBottom: '0', marginRight: '50px'}} />
        </a>
        <a href="https://twitter.com/StarswapEN" rel="noopener noreferrer" target="_blank">
          <StyledTwitter />
        </a>
        <a href="https://github.com/Elements-Studio" rel="noopener noreferrer" target="_blank">
          <StyledGithub />
        </a>
        <a href="https://discord.com/invite/96tKt5exaE" rel="noopener noreferrer" target="_blank">
          <StyledDiscord />
        </a>
      </StyledFooterLinkSection>
    </StyledFooter>
  )
}
export default Footer
