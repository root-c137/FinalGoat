
import './Header.css';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {EasyFetch} from "../../Utils/EasyFetch";
import {clear} from "@testing-library/user-event/dist/clear";

import Kingicon from "../Images/king.png";

function dateDiff(date1, date2){
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;

    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes

    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures

    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;

    return diff;
}

export const Header = () => {
    const YearLimit = 2024;
    const MountLimit = 8;
    const DayLimit = 3;
    const DateLimit = new Date("2024-08-15 00:00:00");
    const [DateDiff, setDateDiff] = useState("" );
    const [Hours, setHours] = useState("");
    const [Minutes, setMinutes] = useState("");
    const [Seconds, setSeconds] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [finalResult, setFinalResult] = useState(null);
    const [Days, setDays] = useState("");
    const Username = localStorage.getItem("Username");
    const Navigate = useNavigate();

    useEffect(() =>
    {
        const updateCountDown = () =>
        {
                const Diff = dateDiff(new Date(), DateLimit);


                if (Diff.day === 0 && Diff.hour === 0 && Diff.min === 0 && Diff.sec === 0)
                {
                    clearInterval(intervalID);
                    getFinalResult();
                }

                setDays(Diff.day.toString());
                setHours(Diff.hour.toString());
                setMinutes(Diff.min.toString());
                setSeconds(Diff.sec.toString());
        };

          updateCountDown();
          const intervalID = setInterval(updateCountDown, 1000);

          return () => {clearInterval(intervalID);}
    }, []);



    const getFinalResult = () =>
    {
        const URL = "result";
        const Method = "GET";

        EasyFetch(URL, null, Method).then(res => {

            if(res.message === "Ok")
            {
                setFinalResult(res.data);
                setShowResult(true);
            }
        });
    }




    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("Username");
        localStorage.removeItem("Email");
        localStorage.removeItem("Vote");
        localStorage.removeItem("Cv");
        Navigate('/');
    }

    return(
        <header>
            <h1 className="Title"><Link to="/">Final goat</Link></h1>
            {Username ?
                <div className="Right">
                    <Link className="Right__Username" to="/account">
                        <span><i className="fa-solid fa-user"></i>{Username}</span>
                    </Link>
                    <button onClick={logOut} className="ButtonLogin Right__LogOut" ><i className="fa-solid fa-right-from-bracket"></i></button>
                </div>
                :
                <Link to="/login" className="ButtonLogin Right" ><i className="fa-solid fa-right-to-bracket"></i></Link>
            }

            {
                showResult ?
                    <div className="FinalResult">
                        <p>Official !</p>
                        <p>THE GOAT IS</p>

                        <p className="GoatName">
                            <img className="KingIcon" src={Kingicon} />
                            Lionel messi{finalResult}
                        </p>
                    </div>

                    :

                    <div className="CountDown">
                        <h2 className="SubTitle">You still have</h2>

                        <table>
                            <tbody>
                            <tr className="CountDown__Table__Tr">
                                <td className="CountDown__Table__Title">days</td>
                                <td className="CountDown__Table__Title">hours</td>
                                <td className="CountDown__Table__Title">minutes</td>
                                <td className="CountDown__Table__Title">seconds</td>
                            </tr>
                            <tr className="CountDown__Table__Tr">
                                <td className="CountDown__Table__Value">{Days}</td>
                                <td className="CountDown__Table__Value">{Hours}</td>
                                <td className="CountDown__Table__Value">{Minutes}</td>
                                <td className="CountDown__Table__Value">{Seconds}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

            }



        </header>
    )
}
