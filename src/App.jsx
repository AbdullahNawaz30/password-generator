import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength]         = useState(8)
  const [numberAllowed, setNumbers] = useState(false)
  const [charAllowed, setChars]     = useState(false)
  const [password, setPassword]     = useState('')
  const [copied, setCopied]         = useState(false)

  // useRef lets us select the input text before copying to clipboard
  const passwordRef = useRef(null)

  // Builds password from allowed characters — memoized with useCallback
  const passwordGenerator = useCallback(() => {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '0123456789'
    if (charAllowed)   str += '!@#$%^&*()-+'

    // Pick random character from str, repeat 'length' times
    let pass = Array.from({ length }, () => str[Math.floor(Math.random() * str.length)]).join('')
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  // Auto-regenerate password whenever a setting changes
  useEffect(() => { passwordGenerator() }, [length, numberAllowed, charAllowed, passwordGenerator])

  // Select text in input, then copy to clipboard
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // reset label after 2s
  }, [password])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-full max-w-sm">

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Password Generator</h2>

        {/* Password output + copy button */}
        <div className="flex gap-2 mb-4">
          <input
            ref={passwordRef} type="text" value={password} readOnly
            placeholder="Click Generate"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded bg-gray-50 font-mono text-gray-800 outline-none"
          />
          <button
            onClick={copyToClipboard}
            className={`px-3 py-2 text-sm font-medium rounded border transition-colors ${copied ? 'bg-green-100 text-green-700 border-green-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Length slider */}
        <div className="mb-3">
          <label className="text-sm text-gray-600 mb-1 block">Length: <strong>{length}</strong></label>
          <input
            type="range" min={4} max={20} value={length}
            onChange={e => setLength(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        {/* Checkboxes for numbers and special chars */}
        <div className="flex gap-5 mb-4 text-sm text-gray-600">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={numberAllowed} onChange={() => setNumbers(p => !p)} className="accent-blue-500" />
            Numbers
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={charAllowed} onChange={() => setChars(p => !p)} className="accent-blue-500" />
            Special Chars
          </label>
        </div>

        {/* Generate button */}
        <button
          onClick={passwordGenerator}
          className="w-full py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors"
        >
          Generate
        </button>

      </div>
    </div>
  )
}

export default App