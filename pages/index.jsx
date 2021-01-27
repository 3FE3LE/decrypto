import { Tooltip } from '@material-ui/core';
import copy from 'copy-to-clipboard';
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {

  const [input, setInput] = useState("...")
  const [text, setText] = useState("waiting that you write")
  const [titleText, setTitleText] = useState("Paste your text!!")
  
  const letters =         ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"," "];
  const googleKeyboard  = ["@",";","'","$","3","_","&","-","8","+","(",")","?","!","/","9","0","1","4","#","5","7",":","2","*","6",'"'," "]
  const samsungKeyboard =     ['@',';','"','$','÷','%','^','&','£','*','¿','¡','?',',','!','(',')','+','=','#','/','€',':','×',"'",'_','-'," "]
  
  const [keyboard, setKeyboard] = useState(googleKeyboard)

  const ctc = ()=>{
    copy(text)
    console.log("copied to your clipboard ",text)
    alert(text+" has been copied to your clipboard")
  }

  const translate = () => {
    let newString=''
    if(input !== ""){
      setTitleText("Copy your text!!")
      for (let i = 0; i < input.length; i++) {
        const char = input.charAt(i);
        let newChar = char.toLowerCase();
        letters.forEach((char,i) => {
          newString += (newChar == char? keyboard[i] :"") 
        });
        keyboard.forEach((char,i) => {
          newString += (newChar == char? letters[i] :"") 
        });
        
      }
    }else{
      setTitleText("Paste your text!!")
    }
    return newString;
  }

  useEffect(() => {
    setText(translate())
  }, [keyboard,input])

  const handleChange = (e) => {
    let {value} = e.target
    setInput(value)
  }

  return (
    <div>
      <Head>
        <title>DfK</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <div>Iconos diseñados por <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>
        <a href="https://iconscout.com/icons/samsung" target="_blank">Samsung Icon</a> on <a href="https://iconscout.com">Iconscout</a> */}
      </Head>
      <main className="w-full h-screen bg-gray-700 flex flex-wrap justify-center ">
        <div className="p-2  w-full  xl:w-3/4 bg-black flex flex-wrap justify-center items-center rounded-b-3xl display-flex shadow-2xl z-10">
          <h1 className="bg-black shadow-sm text-sm text-white font-bold rounded-t-2xl py-1 px-2 absolute left-0 bottom-0">byfranklicona</h1>
          <p className="text-8xl w-full text-gray-200 font-black text-center" >{titleText}</p>
          <input
            onChange={() => handleChange(event)}
            placeholder="here!"
            className="rounded-xl shadow-sm sm:text-2xl p-2 h-10 text-center text-white bg-black ring-4 ring-gray-500 "
          />
          <div className="flex flex-wrap w-full justify-center m-0">
            <span className="text-white w-full text-center" >Select your Keyboard</span>
          <img
            src="/google.svg"
            className={`h-10 p-1 mx-4 rounded-lg text-sm ${keyboard===googleKeyboard?'bg-white text-black':''} `}
            onClick={()=>setKeyboard(googleKeyboard)}
          />
          <img
            src="/samsung.svg"
            className={`h-10 p-1  mx-4 rounded-lg bg-white  text-sm ${keyboard===samsungKeyboard?'bg-white text-black':''} `}
            onClick={()=>setKeyboard(samsungKeyboard)}
          />
          </div>
        </div>
        <div
          className="p-2 w-full  xl:w-3/4 -mt-10 bg-white flex flex-wrap justify-center items-center z-0"
        >
          <Tooltip
            title="copy to clipboard"
            onClick={()=>{ctc()}}
          >
          <p
            className="text-2xl sm:text-4xl p-3 rounded-xl hover:shadow-xl  text-center text-gray-700 font-bold"
          >
            {text||"..."}
          </p>
          </Tooltip>
          
        </div>
      </main>
    </div>
  )
}
