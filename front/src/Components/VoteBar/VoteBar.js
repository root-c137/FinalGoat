


import "./VoteBar.css";
import GoatIcon from "../Images/GoatIcon.png";
import {useEffect, useState} from "react";

export const VoteBar = ({MessiVotes, RonaldoVotes, Total}) =>
{
    const [WidthMessiBar, setWidthMessiBar] = useState(10);
    const [WidthRonaldoBar, setWidthRonaldoBar] = useState(10);

    useEffect(() =>
    {
        setWidthMessiBar(((MessiVotes / Total) * 100).toFixed(2));
        setWidthRonaldoBar(((RonaldoVotes / Total) * 100).toFixed(2));

    })


    return(

    <div className="VoteBar">
        <img src={GoatIcon} className="GoatIcon"/>


        <div className="VoteBar__Item VoteBar__Item--CR7" style={{
            width : WidthRonaldoBar+"%"
        }}>
            <div className="NumberAndPourcent NumberAndPourcent--Left">
                <span className="PlayerNumber">7</span>
                <span className="Pourcent">({((RonaldoVotes / Total) * 100).toFixed(2)}%)</span>
            </div>
        </div>

        <div className="VoteBar__Item VoteBar__Item--Messi" style={{
            width : WidthMessiBar+"%"
        }}>
            <div className="NumberAndPourcent NumberAndPourcent--Right">
                <span className="Pourcent">({((MessiVotes / Total) * 100).toFixed(2)}%)</span>
                <span className="PlayerNumber">10</span>
            </div>
        </div>

    </div>
    )
}

