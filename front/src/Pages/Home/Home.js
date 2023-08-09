

import './Home.css';
import {VoteBar} from "../../Components/VoteBar/VoteBar";
import {FormVote} from "../../Components/FormVote/FormVote";
import {useEffect, useState} from "react";
import {EasyFetch} from "../../Utils/EasyFetch";

export const Home = () =>
{
    const [VotesTotal, setVotesTotal] = useState();
    const [MessiVotes, setMessiVotes] = useState(0);
    const [RonaldoVotes, setRonaldoVotes] = useState(0);

    useEffect(() => {
       getVotes();
       getVotesPlayers();
    });

    const getVotes = () =>
    {
        const URL = "votes";
        const Method = "GET";

        EasyFetch(URL, null, Method).then(res => {
            console.log(res.data);
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

    const refresh = () => {
        getVotes();
        getVotesPlayers();
    }

    return(
        <main className="Home">
            <p className="Votes">{VotesTotal} {VotesTotal > 1 ? "votes" : "vote"}</p>
            <VoteBar MessiVotes={MessiVotes} RonaldoVotes={RonaldoVotes} Total={VotesTotal}/>
            <FormVote refresh={refresh} />
        </main>
    )
}
