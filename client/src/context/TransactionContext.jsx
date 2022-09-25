import React from "react";
import { useEffect, useState } from "react";
import {ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constants'

export const TransactionContext=React.createContext();

const {ethereum}=window;

const getEthereumContract=()=>{
    const provider=new ethers.providers.Web3Provider(ethereum);
    const signer=provider.getSigner();
    const transactionContract=new ethers.Contract(contractAddress, contractABI,signer);
    
    console.log({
        provider,
        signer,
        transactionContract
    });
}

export const TransactionProvider=({children})=>{

    const [currentAccount, setCurrentAccount] = useState("")
    const [formData, setformData] = useState({addressTo:'', amount:'', keyword:'',message:''})
    const [isLoading, setisLoading] = useState(false)
    const [transactionCount, settransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [transactions, settransactions] = useState([])

    const handleChange=(e,name)=>{
        setformData((prevState)=>({...prevState,[name]:e.target.value}))
    }

    const checkIfWalletIsConnected=async()=>{
        try {
            if(!ethereum){
                return alert("Please install Metamask!")
            }
            const accounts=await ethereum.request({method:'eth_accounts'})
            
            if(accounts.length){
                setCurrentAccount(accounts[0])
                //getalltrasanctions
                console.log(accounts);
            }
            else{
                console.log('No accounts found!')
            }    
        }
        catch (error) {
            console.log(error);
            throw new Error("No Ethereum object!")
        }

    }

    const connectWallet=async()=>{
        try {
            if(!ethereum){
                return alert("Please install Metamask!")
            }
            const accounts=await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object!")
        }
    }

    const sendTransaction=async()=>{
        try {
            if(!ethereum){
                return alert("Please install Metamask!")
            }
            const {addressTo, amount, keyword, message}=formData;
            const transactionContract=getEthereumContract();
            const parsedAmount=ethers.utils.parseEther(amount)

            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from:currentAccount,
                    to:addressTo,
                    gas:'0x4e20', //20k gwei, gewi=sub-unit of ether
                    value:parsedAmount._hex
                }]
            })

            const transactionHash=await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword)
            setisLoading(true);
            console.log('Loading');

            await transactionHash.wait()
            setisLoading(false)
            console.log('Transaction successful');

            const transactionCount=await transactionContract.getTransactionCount()

            settransactionCount(transactionCount.toNumber())

        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object!")
        }
    }

    useEffect(() => {
      checkIfWalletIsConnected();
    },[])
    

    return(
        <TransactionContext.Provider
         value={{
            connectWallet,
            currentAccount,
            formData,
            sendTransaction,
            handleChange}}>

            {children}

        </TransactionContext.Provider>
    )
}