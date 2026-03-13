import { useState, useEffect } from 'react'
export function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('ben10-theme') !== 'light')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.body.classList.toggle('light-mode', !dark)
    localStorage.setItem('ben10-theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, setDark]
}
