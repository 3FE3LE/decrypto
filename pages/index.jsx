import { Tooltip } from '@material-ui/core';
import copy from 'copy-to-clipboard';
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {

  const [text, setText] = useState("waiting that you write")

  const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"," "];
  const chars   = ["@",";","'","$","3","_","&","-","8","+","(",")","?","!","/","9","0","1","4","#","5","7",":","2","*","6",'"'," "]

  const ctc = ()=>{
    copy(text)
    console.log("copies to your clipboard ",text)
  }

  const translate = (text) => {
    let newString=''
    if(text !== ""){
      for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        let newChar = char.toLowerCase();
        letters.forEach((char,i) => {
          newString += (newChar == char? chars[i] :"") 
        });
        chars.forEach((char,i) => {
          newString += (newChar == char? letters[i] :"") 
        });
      }
    }
    return newString;
  }

  const handleChange = (e) => {
    let {value} = e.target
    setText(translate(value)|| "...");
  }

  return (
    <div>
      <Head>
        <title>DfK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen bg-gray-700 flex flex-wrap justify-center ">
        <div className="p-2  w-full  xl:w-3/4 bg-black flex flex-wrap justify-center items-center rounded-b-3xl display-flex shadow-2xl z-10">
          <h1 className="text-8xl text-gray-200 font-black text-center" >Paste your text!!</h1>
          <input
            onChange={() => handleChange(event)}
            placeholder="here!"
            className="rounded-xl shadow-sm  p-2 h-10  my-12 text-center "
          />
        </div>
        <div
          className="p-2 w-full  xl:w-3/4 -mt-10 bg-white flex flex-wrap justify-center items-center z-0"
        >
          <Tooltip
            title="copy to clipboard"
            onClick={()=>{ctc()}}
          >
          <p
            className="text-2xl text-center text-gray-700"
          >
            {text}
          </p>
          </Tooltip>
          
        </div>
      </main>
    </div>
  )
}
