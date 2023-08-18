import {Link} from "react-router-dom";

import "./Footer.css";
export const Footer = () =>
{
    return(
        <footer>



            <div className="Footer__Menu">
                <Link className="Footer__Link " to="/legal-notice">Legal Notice </Link>
                <Link className="Footer__Link" to="/privacy-policy">Privacy policy</Link>
            </div>
            <div className="Copyright">
                <p className="Author"> created by<a className="Footer__Link AuthLink" href="https://twitter.com/rootc137" target="_blank">@rootc137
                    <i className="fa-brands fa-twitter"></i></a></p>
                <p>finalgoat © All rights reserved</p>
            </div>

            <p className="LinkIcon8"><a target="_blank" href="https://icons8.com/icon/bY5Oe8wOMXY3/ch%C3%A8vre">Chèvre</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a></p>
        </footer>
    );
}
