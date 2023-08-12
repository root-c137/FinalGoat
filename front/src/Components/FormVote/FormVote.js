
import './FormVote.css';
import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import {Login} from "../../Pages/Login/Login";
import {Register} from "../../Pages/Register/Register";
import {EasyFetch} from "../../Utils/EasyFetch";

export const FormVote = ({refresh}) =>
{
    const [currentPlayer, setCurrentPlayer] = useState(localStorage.getItem("Cv") );
    const Navigate = useNavigate();
    const [CurrentVote, setCurrentVote] = useState(localStorage.getItem("Cv") );
    const [disabledButton, setDisabledButton] = useState(true);

    useEffect(() =>
    {
        if(CurrentVote === currentPlayer) {
            setDisabledButton(true)
        }
        else
            setDisabledButton(false);
    });

    const Vote = (e) =>
    {
        e.preventDefault();
        if(!localStorage.getItem("token") )
        {
            Navigate('/login');
        }
        else
        {
            if(localStorage.getItem("Cv") !== currentPlayer)
            {
                const Method = "POST";
                const URL = "api/vote";
                const Data = {"Player": currentPlayer,};

                EasyFetch(URL, Data, Method, localStorage.getItem("token")).then(res => {
                    if (res.message === "Ok") {
                        localStorage.setItem("Cv", currentPlayer);
                        setCurrentVote(localStorage.getItem("Cv"));
                        refresh();
                    }
                })
            }

        }
    }


    return(
        <>
                <form className="FormVote">
                    <input type="radio" name="Choice" id="Messi"/>
                    <label htmlFor="Messi" className={`LabelMessi ${currentPlayer === "Messi" ? "CurrentVote" : ""}`}
                           onClick={() => setCurrentPlayer("Messi") }>10 L.Messi
                        {localStorage.getItem("Cv") === "Messi" && <i className="fa-solid fa-check"></i>}
                    </label>
                    <input type="radio" name="Choice" id="CR7" />
                    <label htmlFor="CR7" className={`LabelRonaldo ${currentPlayer === "Ronaldo" ? "CurrentVote" : ""}`}
                           onClick={() =>setCurrentPlayer("Ronaldo")}>7 C.Ronaldo
                        {localStorage.getItem("Cv") === "Ronaldo" && <i className="fa-solid fa-check"></i>}
                    </label>

                    <button className="BVote" onClick={Vote}  disabled={disabledButton}>Vote</button>
                </form>

        </>
    )
}

