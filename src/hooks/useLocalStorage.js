import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key)
      if (savedValue === null) return initialValue

      const parsedValue = JSON.parse(savedValue)
      if (Array.isArray(initialValue) && !Array.isArray(parsedValue)) return initialValue
      return parsedValue ?? initialValue
    } catch {
      return initialValue
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
