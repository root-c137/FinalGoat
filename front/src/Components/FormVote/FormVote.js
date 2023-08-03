
import './FormVote.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";

import {Login} from "../Login/Login";
import {Register} from "../../Pages/Register/Register";

export const FormVote = () =>
{
    const [showLoginModal, setShowModal] = useState(false);



    return(
        <>
        {
            !showLoginModal ?
                <form className="FormVote">
                    <input type="radio" name="Choice" id="Messi"/>
                    <label htmlFor="Messi" className="LabelMessi">L.Messi</label>
                    <input type="radio" name="Choice" id="CR7"/>
                    <label htmlFor="CR7" className="LabelCR7">C.Ronaldo</label>
                    <button className="BVote" onClick={(e) => {e.preventDefault(); setShowModal(true);}}>Vote</button>
                </form>

                    : <Login />
        }
        </>
    )
}

