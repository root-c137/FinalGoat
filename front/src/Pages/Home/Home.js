

import './Home.css';
import {VoteBar} from "../../Components/VoteBar/VoteBar";
import {FormVote} from "../../Components/FormVote/FormVote";

export const Home = () =>
{
    return(
        <main className="Home">
            <p className="Votes">100000 votes</p>
            <VoteBar />
            <FormVote />
        </main>
    )
}
