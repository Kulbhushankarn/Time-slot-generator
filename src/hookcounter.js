import React,{useState} from 'react';

export default function HookCounter(){
    
    const personname=useState=("Hello everyone");
    const name=personname[0];
    const setName=personname[1];


    const stateHandler = () =>{
        setName("Hello people")
    }

    return(
        <div>
            {personname}
            <button onClick={stateHandler}>Click here</button>
        </div>
    )
}