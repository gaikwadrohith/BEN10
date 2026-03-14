import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('ben10-theme') !== 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.body.classList.toggle('light-mode', !dark)
    localStorage.setItem('ben10-theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggle = () => {
    // Flash effect on toggle
    document.body.classList.add('theme-flash')
    setTimeout(() => document.body.classList.remove('theme-flash'), 300)
    setDark(d => !d)
  }

  return [dark, toggle]
}
