
import './FormVote.css';
import {useState} from "react";
import {Login} from "../Login/Login";

export const FormVote = () =>
{
    const [showLoginModal, setShowModal] = useState(false);

    return(
        <>
        {
            !showLoginModal ?
                <form>
                    <input type="radio" name="Choice" id="Messi"/>
                    <label htmlFor="Messi" className="LabelMessi">L.Messi</label>
                    <input type="radio" name="Choice" id="CR7"/>
                    <label htmlFor="CR7" className="LabelCR7">C.Ronaldo</label>
                    <button className="BVote" >Vote</button>
                </form>

                    : <Login />
        }
        </>
    )
}

