

import './Home.css';
import {VoteBar} from "../../Components/VoteBar/VoteBar";
import {FormVote} from "../../Components/FormVote/FormVote";
import {useEffect, useState} from "react";
import {EasyFetch} from "../../Utils/EasyFetch";
import {Historic} from "../../Components/Historic/Historic";

export const Home = () =>
{
    const [VotesTotal, setVotesTotal] = useState(0);
    const [MessiVotes, setMessiVotes] = useState(0);
    const [RonaldoVotes, setRonaldoVotes] = useState(0);
    const [historic, setHistoric] = useState(null);
    const [currentGoat, setCurrentGoat] = useState(null);


    useEffect(() => {
       getVotes();
       getVotesPlayers();
       getHistoric();
    }, []);

    const getVotes = () =>
    {
        const URL = "votes";
        const Method = "GET";

        EasyFetch(URL, null, Method).then(res => {
            setVotesTotal(res.data);
        });

    }

    const getVotesPlayers = () => {
        const URL = "players";
        const Method = "GET";

        EasyFetch(URL, null, Method).then(res => {
            if(res.message === "Ok")
            {
                setMessiVotes(res.data[0].Votes);
                setRonaldoVotes(res.data[1].Votes);
            }
        });
    }

    const getHistoric = () =>
    {
        const URL = "lastvotes";
        const Method = "GET";

        EasyFetch(URL, null, Method).then(res => {
            if(res.message === "Ok")
                setHistoric(res.data);
        });
    }

    const refresh = () => {
        getVotes();
        getVotesPlayers();
        getHistoric();
    }

    return(
        <main className="Home">
            <p className="Votes">{VotesTotal} {VotesTotal > 1 ? "votes" : "vote"}</p>
            <VoteBar MessiVotes={MessiVotes !== NaN ? MessiVotes : 0}
                     RonaldoVotes={RonaldoVotes !== NaN ? RonaldoVotes : 0} Total={VotesTotal}/>
            <FormVote refresh={refresh}  />
            <Historic historic={historic}/>

        </main>
    )
}
