


import "./VoteBar.css";
import GoatIcon from "../Images/GoatIcon.png";
import {useEffect, useState} from "react";

export const VoteBar = ({MessiVotes, RonaldoVotes, Total}) =>
{
    const [WidthMessiBar, setWidthMessiBar] = useState(10);
    const [WidthRonaldoBar, setWidthRonaldoBar] = useState(10);
    const [currentGoat, setCurrentGoat] = useState(null);
    const [FlipMessi, setFlipMessi] = useState(false);
    const [FlipRonaldo, setFlipRonaldo] = useState(false);

    useEffect(() =>
    {
        setWidthMessiBar(((MessiVotes / Total) * 100).toFixed(2));
        setWidthRonaldoBar(((RonaldoVotes / Total) * 100).toFixed(2));

        setCurrentGoat("Messi");
        if(RonaldoVotes > MessiVotes)
            setCurrentGoat("Ronaldo");

        flipIconGoat();
    });

    const flipIconGoat = () =>
    {
        if(currentGoat === "Messi")
        {
            setFlipMessi(true);
            setFlipRonaldo(false);
        }
        if (currentGoat === "Ronaldo")
        {
            setFlipMessi(false);
            setFlipRonaldo(true);
        }

    }



    return(

    <div className="VoteBar">
        <img src={GoatIcon} className={`GoatIcon ${FlipMessi && !FlipRonaldo ? "FlipMessi" : 
            !FlipMessi && FlipRonaldo ? "FlipRonaldo" : ""}`} />


        <div className="VoteBar__Item VoteBar__Item--CR7" style={{
            width : WidthRonaldoBar+"%"
        }}>
            <div className="NumberAndPourcent NumberAndPourcent--Left">
                <span className="PlayerNumber">7</span>
                <span className="Pourcent">({Number(((RonaldoVotes / Total) * 100).toFixed(2)) }%)</span>
            </div>
        </div>

        <div className="VoteBar__Item VoteBar__Item--Messi" style={{
            width : WidthMessiBar+"%"
        }}>
            <div className="NumberAndPourcent NumberAndPourcent--Right">
                <span className="Pourcent">({Number(((MessiVotes / Total) * 100).toFixed(2))}%)</span>
                <span className="PlayerNumber">10</span>
            </div>
        </div>

    </div>
    )
}

