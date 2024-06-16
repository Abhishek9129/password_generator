import { useState ,useCallback,useEffect, useRef } from 'react'



function App() {
  const [length, setlength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false)
  const [characterallowed, setcharacterallowed] = useState(false)
  const [password,setpassword]=useState("")
 //use ref hook
  const passref=useRef(null);
  const passwordgenerator=useCallback(()=>{
    let pass=""
    let char
    let str=
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed)
    str+="0123456789"
  if(characterallowed)
  str+= "~!@#$%^&*()_+-={}[]|\\:;',.<>?/`"

   for(let i =1 ; i<=length;i++)
   {
    char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char);
   }
   
   setpassword(pass)

  },[length,numberallowed,characterallowed,setpassword])
   const copytocl = useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(password)},[password]);
  useEffect(()=>{
    passwordgenerator()
  },[length,numberallowed,characterallowed,passwordgenerator])
  return (
   <>
   <div className='w-full max-w-md mx-auto shadow-md 
   rounded-lg px-4 my-8 text-blue-500 bg-gray-700'>
    <h1 className='text-center text-white'>Password Generator</h1> 
   <div className='flex shadow rounded-lg overflow-hidden mb-4 mx-3'>
    <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-8'
        placeholder="Password"
        readOnly
        ref={passref}
    />
    <button  onClick={copytocl} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-red-700'>copy</button>
   </div>
   <div className='flex text-sm gap-x-2'>
   <div className='flex item-center gap-x-1'>
    <input type="range"
    min={6}
    max={50}
    value={length}
    // className='cursor-pointer'
    onChange={e => setlength(Number(e.target.value))}
    />
    <label>Length : {length}</label>
   </div>
   <div className='flex item-center gap-x-1'>
    <input
        type="checkbox"
        defaultChecked={numberallowed}
        id="numberInput"
        onChange={()=>{
          setnumberallowed((prev)=>!prev);
        }}
      
    />
    <label htmlFor='numberInput'>Number</label>
   
   </div>

   <div className='flex item-center gap-x-1'>
    <input
        type="checkbox"
        defaultChecked={characterallowed}
        id="characterInput"
        onChange={()=>{
          setcharacterallowed((prev)=>!prev);
        }}
      
    />
    <label htmlFor='characterInput'>Character</label>
   
   </div>
   </div>
   
    </div>
   </>
  )
}

export default App


