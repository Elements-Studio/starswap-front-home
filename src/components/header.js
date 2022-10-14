import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useMediaQuery } from '@react-hook/media-query'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Menu from './menu'

import Uni from '../images/uni.inline.svg'
import MenuIcon from '../images/menu.inline.svg'
import CloseIcon from '../images/x.inline.svg'

import { Sun, Moon } from 'react-feather'
import { useDarkMode } from '../contexts/Application'

import useDocumentScrollThrottled from '../utils/useDocumentScrollThrottled'

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem 1.25rem;
  width: 100%;
  z-index: 3;
  position: sticky;
  top: -1px;
  background: ${({ theme, open, showBG }) => (showBG && !open ? theme.backgroundColor : 'none')};
  border-bottom: 1px solid ${({ theme, open, showBG }) => (showBG && !open ? theme.concreteGray : 'none')};
  transition: background-color 0.25s ease;
  @media (max-width: 960px) {
    padding: 1rem 1.25rem;
    height: ${({ open }) => (open ? '100vh' : '100%')};
  }
`

const StyledNav = styled.nav`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  transition: right 0.25s ease;
  @media (max-width: 960px) {
    position: fixed;
    top: 0px;
    right: ${({ open }) => (open ? '0px' : '-100%')};
    align-items: flex-start;
    flex-wrap: wrap;
    -webkit-overflow-scrolling: touch;
    background-color: ${({ theme }) => theme.colors.grey1};
    width: 100%;
    height: 100%;
    z-index: 999;
    padding: 2rem;
    overflow: auto;
    box-shadow: ${({ theme }) => theme.shadows.huge};
  }

  > * + * {
    margin-left: 24px;
  }

  @media (max-width: 960px) {
    > * + * {
      margin-left: 0;
    }
  }
`

const StyledNavTitleWrapper = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
`

const StyledTradeLink = styled.a`
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  color: ${({ theme }) => theme.invertedTextColor};
  border-radius: 12px;
  display: inline-block;
  font-weight: 500;
  width: 100%;
  width: min-content;
  white-space: nowrap;
  margin-left: 1rem;
  border: 1px solid transparent;
  box-shadow: ${({ theme }) => theme.shadows.small};

  :hover,
  :focus {
    border: 1px solid white;
  }
`

const StyledButton = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  color: ${({ theme }) => theme.textColor};
  :focus {
    outline: none;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`

const StyledHomeLink = styled(Link)`
  max-height: 48px;
  display: flex;
  align-items: center;
`

const MenuToggle = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.grey9};
  display: none;
  z-index: 9999;
  width: 24px;
  height: 24px;
  padding: 0px;

  :focus {
    outline: none;
  }
  @media (max-width: 960px) {
    display: initial;
    position: ${({ open }) => (open ? 'fixed' : 'relative')};
    right: ${({ open }) => (open ? '1.5rem' : 'initial')};
    top: ${({ open }) => (open ? '1.5rem' : 'initial')};
  }
`

const StyledUni = styled(Uni)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  margin: 0;
  width: 32px;
  height: 32px;
  margin-right: 0.35rem;
  margin-top: -4px;
  transform: rotate(0deg);
  transition: transform 0.2s linear;
  :hover {
    transform: rotate(-10deg);
  }
`

const StyledCloseIcon = styled(CloseIcon)`
  path {
    stroke: ${({ theme }) => theme.textColor};
  }
`

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.textColor};
  }
`

const HideSmall = styled.span`
  @media (max-width: 960px) {
    display: none;
  }
`

const Header = props => {
  const matches = useMediaQuery('only screen and (max-width: 1024px)')
  const node = useRef()
  const button = useRef()
  const [isMenuOpen, updateIsMenuOpen] = useState(false)
  const [darkMode, toggleDarkMode] = useDarkMode()

  const [headerBG, setHeaderBG] = useState(false)

  useDocumentScrollThrottled(callbackData => {
    const { currentScrollTop } = callbackData
    // const isScrolledDown = previousScrollTop < currentScrollTop
    // const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL

    setHeaderBG(currentScrollTop > 2)

    // setTimeout(() => {
    //   setSidebarBG(isScrolledDown && isMinimumScrolled)
    // }, TIMEOUT_DELAY)
  })

  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          menulinks {
            name
            sublinks {
              name
              link
            }
          }
          title
        }
      }
    }
  `)

  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow
    // Prevent scrolling on mount
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.maxHeight = '-webkit-fill-available'
    }
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle)
  }, [isMenuOpen]) // Empty array ensures effect is only run on mount and unmount

  useEffect(() => {
    const handleClickOutside = e => {
      if (node.current.contains(e.target) || button.current.contains(e.target)) {
        return
      }
      updateIsMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, updateIsMenuOpen, matches])

  return (
    <StyledHeader open={isMenuOpen} showBG={headerBG}>
      <StyledNavTitleWrapper>
        <StyledHomeLink
          to="/"
          style={{
            textDecoration: `none`
          }}
        >
          <img style={{height: '32px', marginBottom: '0'}} src="data:image/png;base64,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" />
        </StyledHomeLink>
      </StyledNavTitleWrapper>
      <MenuToggle ref={button} open={isMenuOpen} onClick={() => updateIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <StyledCloseIcon /> : <StyledMenuIcon />}
      </MenuToggle>
      <StyledNav ref={node} open={isMenuOpen}>
        {data.site.siteMetadata.menulinks.map(item => {
          return <Menu key={item.name} data={item} />
        })}

        <HideSmall>
          <StyledButton type="button" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </StyledButton>
        </HideSmall>
        {props.path !== undefined && (
          <StyledTradeLink
            style={{
              background: `linear-gradient(128.17deg, #BD00FF -14.78%, #FF1F8A 110.05%)`,
              color: 'white'
            }}
            target="_blank"
            href="https://starswap.xyz/"
          >
            Launch App
          </StyledTradeLink>
        )}
      </StyledNav>
    </StyledHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
