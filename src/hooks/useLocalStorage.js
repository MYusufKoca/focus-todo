import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue, normalize = (value) => value) {
  const [storedValue, setStoredValue] = useState(() => {
    const fallbackValue = typeof initialValue === 'function' ? initialValue() : initialValue
    try {
      const savedValue = window.localStorage.getItem(key)
      if (savedValue === null) return fallbackValue

      const parsedValue = JSON.parse(savedValue)
      return normalize(parsedValue, fallbackValue) ?? fallbackValue
    } catch {
      return fallbackValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // Depolama kullanılamıyorsa uygulama geçici state ile çalışmaya devam eder.
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
