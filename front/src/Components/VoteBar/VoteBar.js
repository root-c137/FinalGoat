


import "./VoteBar.css";
import GoatIcon from "../Images/GoatIcon.png";

export const VoteBar = () =>
{
    return(

    <div className="VoteBar">
        <img src={GoatIcon} className="GoatIcon"/>
        <div className="VoteBar__Item VoteBar__Item--CR7">7</div>
        <div className="VoteBar__Item VoteBar__Item--Messi">10</div>
    </div>
    )
}

