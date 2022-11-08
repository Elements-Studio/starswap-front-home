import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from './theme'
import { useDarkMode } from '../contexts/Application'

export const StyledThemeProvider = props => {
  const [isDarkMode] = useDarkMode()

  return (
    <ThemeProvider theme={theme(true)}>
      <GlobalStyle isDark={true} />
      {props.children}
    </ThemeProvider>
  )
}
