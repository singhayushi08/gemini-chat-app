import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'


const Main = () => {
    
    const {onSent, recentPrompt, showResult, loading, resData, setInput, input} = useContext(Context);

  return (
    <div className='main'>
        <div className="nav">
            <p >Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>

        <div className="main-container">

        {!showResult ? 
        <>
        <div className="greet">
                <p><span>Hello, there!</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div onClick={()=>onSent("Suggest beautiful places for a road trip with family")} className="card">
                    <p>Suggest beautiful places for a road trip with family</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div onClick={()=>onSent("Briefly summarize the concpet of Globalization")} className="card">
                    <p>Briefly summarize the concpet of Globalization</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div onClick={()=>onSent("Brainstorm ideas for team bonding activites")}  className="card">
                    <p>Brainstorm ideas for team bonding activites</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div onClick={()=>onSent("How to add ellipses in Javascript code?")} className="card">
                    <p>How to add ellipses in Javascript code?</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
        </> :
        <div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading ? 
                <div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                </div> : 
                <p dangerouslySetInnerHTML={{__html:resData}}></p> 
                }
            </div>
        </div>
        }    
    
            <div className="main-bottom">
                <div className="search-box">
                    <input 
                    onChange ={(e) => setInput(e.target.value)}
                    onKeyDown = {(e) => {
                        if(e.key === "Enter") {
                            setInput(e.target.value);
                            onSent();
                        }
                    }}
                    value={input} type="text" placeholder='Enter a prompt here'></input>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="" /> : null}
                    </div>
                </div>

                <p className="bottom-info">
                    Gemini may display inaccurate information, so please double-check its responses!
                </p>
            </div>

        </div>
    </div>
  )
}

export default Main