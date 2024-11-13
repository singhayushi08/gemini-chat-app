import { createContext, useState } from "react";
import run from "../Config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState(""); //used to save input
    const [recentPrompt, setRecentPrompt] = useState(""); //saved on send button
    const [previousPrompts, setPreviousPrompts] = useState([]); //used to store history prompts
    const [showResult, setShowResult] = useState(false); //if true, remove dummy cards
    const [loading, setLoading] = useState(false); //if true, display loading animation
    const [resData, setResultData] = useState(""); //to display result

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response = "";
        if(prompt !== undefined) {
            setRecentPrompt(prompt);
            response = await run(prompt);
        } else {
            response = await run(input);
            setRecentPrompt(input);
            setPreviousPrompts(prev=>[...prev,input]);
        }

        console.log("response : ",response);
        /*in response, some words were bold but written as text** so we are correcting that here*/
        let responseArray = response.split("**"); 
        console.log("response array: ",responseArray);

        let newResponse = "";

        for(let i=0; i<responseArray.length; i++) {
            newResponse += responseArray[i];
        }
        let finalResponse = newResponse.split("\n").join("</br>"); //replaced * with break tag for new line

        console.log("final response: ",finalResponse);

        setResultData(finalResponse);
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;