import React, {useContext} from 'react'
import {AiFillPlayCircle} from 'react-icons/ai'
import {SiE, SiEthereum} from 'react-icons/si'
import {BsInfoCircle} from 'react-icons/bs'
import {Loader} from './'
import { TransactionContext } from '../context/TransactionContext'

const commonStyles="min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-yellow-50"

const Input=({placeholder, name, type,value, handleChange})=>{
  return(
    <input
     placeholder={placeholder}
     type={type}
     step="0.0001"
     value={value}
     onChange={(e)=>handleChange(e,name)}
     className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-yellow-50 border-none text-sm white-glassmorphism"></input>
  )
}
const Welcome = () => {
  const {connectWallet, currentAccount}=useContext(TransactionContext);
  console.log(currentAccount);
  
  const handleSubmit=()=>{

  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between md:padding-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-yellow-50 text-gradient py-1">
            Send Crypto <br/> across the world!
          </h1>
          <p className="text-left mt-5 text-yellow-50 font-light md:w-9/12 w-11/12 text-base">
            Explore the world of Crypto. Buy and sell cryptocurrencies easily on Krypt.
          </p>

          <button
           type="button"
           onClick={connectWallet}
           className="flex flex-row justify-center items-center my-5 bg-indigo-500 p-3 rounded-full cursor-pointer hover:bg-indigo-600 duration-200 transform transition-all hover:scale-110">
            <p className="text-white text-base font-semibold">Connect Wallet</p>
           </button>

           <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={commonStyles}>Security</div>
            <div className={`${commonStyles} rounded-tr-2xl`}>Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>Web3.0</div>
            <div className={commonStyles}>Low fees</div>
            <div className={`${commonStyles} rounded-br-2xl`}>Blockchain</div>
           </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
          <div className="p-3 flex flex-col justify-end items-start rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full ">
              <div className="flex justify-between items-start">
                <div className="w-11 h-11 rounded-full border-4 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#374151"></SiEthereum>
                </div>
                <BsInfoCircle fontSize={17} color="#fff"></BsInfoCircle>
              </div>
              <div>
                <p className="text-[#374151] font-light text-sm">
                  Address
                </p>
                <p className="text-[#2d3643] font-medium text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={()=>{}}/>
            <Input placeholder="Amount" name="amount" type="number" handleChange={()=>{}}/>
            <Input placeholder="Keyword(GIF)" name="keyword" type="text" handleChange={()=>{}}/>
            <Input placeholder="Enter message" name="message" type="text" handleChange={()=>{}}/>

            <div className="h-[1px] w-full bg-gray-400 my-2"></div>

            {true?(
              <Loader/>
            ):(
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white mt-2 w-full border-[1px] rounded-lg p-2 border-[#3d4f7c] cursor-pointer font-medium ">
                  Send Now
                </button>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome