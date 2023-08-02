
import './Header.css';
import {useEffect, useState} from "react";


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
    const DateLimit = new Date("2024-08-03 00:00:00");
    const [DateDiff, setDateDiff] = useState("" );

    useEffect(() =>
    {
        const D = new Date();
        setInterval(() => {
            const Diff = dateDiff(new Date(), DateLimit);
            setDateDiff(Diff.day+" days "+Diff.hour+" hours "+Diff.min+" minutes "+Diff.sec+" seconds");
        }, 1000);
    });

    return(
        <header>
            <h1 className="Title">Final goat</h1>
            <h2 className="SubTitle">
                <span>You still have :</span>
                <span className="Timeout">{DateDiff}</span>
            </h2>
        </header>
    )
}
