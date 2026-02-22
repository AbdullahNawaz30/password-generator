import { useState ,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  //useref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = '';
    let str ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(numberAllowed){
      str += '0123456789';
    }
    if(charAllowed){
      str += '!@#$%^&*()-+';
    }
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,password]);
  useEffect(()=>{passwordGenerator},[length,numberAllowed,charAllowed,password]);

   const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current.select();
   window.navigator.clipboard.writeText(password);
  },[password])
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8'>
        <h1 className='text-2xl font-bold text-center mb-4'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick = {copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={0} max={20} value={length} className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)} />
            <label>length: {length}</label>
          </div>
        </div>

        <div className='flex items-center gap-x-2 mt-4'>
          <input type="checkbox" id="number" defaultchecked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} />
          <label htmlFor="number">Numbers</label>
          <input type="checkbox" id="char" defaultchecked={charAllowed} onChange={() => setCharAllowed((prev) => !prev)} />
          <label htmlFor="char">Special Characters</label>
        </div>

        <div className='flex justify-end mt-4'>
          <button className='outline-none bg-green-700 text-white px-3 py-1' onClick={passwordGenerator}>Generate</button>
        </div>
      </div>
    </>
  )
}

export default App
