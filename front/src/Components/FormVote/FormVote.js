
import './FormVote.css';
import './BorderAnimation.css';
import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import {Login} from "../../Pages/Login/Login";
import {Register} from "../../Pages/Register/Register";
import {EasyFetch} from "../../Utils/EasyFetch";

export const FormVote = () =>
{
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const Navigate = useNavigate();
    const [CurrentVote, setCurrentVote] = useState(null);

    useEffect(() =>
    {
        setCurrentVote(localStorage.getItem("Cv") );
    })
    const Vote = (e) =>
    {
        e.preventDefault();
        if(!localStorage.getItem("token") )
        {
            Navigate('/login');
        }
        else
        {
            const Method = "POST";
            const URL = "api/vote";
            const Data = {"Player" : currentPlayer,};

            EasyFetch(URL, Data, Method, localStorage.getItem("token") ).then(res => {
                if(res.message === "Ok"){
                    localStorage.setItem("Cv", currentPlayer);
                    setCurrentVote(localStorage.getItem("Cv") );
                }
            })
        }
    }


    return(
        <>
                <form className="FormVote">
                    <input type="radio" name="Choice" id="Messi"/>
                    <label htmlFor="Messi" className={`LabelMessi gradient-border ${CurrentVote === "Messi" ? "CurrentVote" : ""}`}
                           onClick={() => setCurrentPlayer("Messi")}>L.Messi
                        {localStorage.getItem("Cv") === "Messi" && <i className="fa-solid fa-check"></i>}
                    </label>
                    <input type="radio" name="Choice" id="CR7"/>
                    <label htmlFor="CR7" className={`LabelRonaldo gradient-border ${CurrentVote === "Ronaldo" ? "CurrentVote" : ""}`}
                           onClick={() => setCurrentPlayer("Ronaldo")}>C.Ronaldo
                        {localStorage.getItem("Cv") === "Ronaldo" && <i className="fa-solid fa-check"></i>}
                    </label>
                    <button className="BVote" onClick={Vote}>Vote</button>
                </form>

        </>
    )
}

