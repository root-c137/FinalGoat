import {Link} from "react-router-dom";

import "./Footer.css";
export const Footer = () =>
{
    return(
        <footer>

            <p><Link className="Footer__Link" to="/legal-notice">Legal Notice </Link>
                 - created by <a className="Footer__Link" href="https://twitter.com/rootc137" target="_blank">@rootc137
                <i className="fa-brands fa-twitter"></i></a></p>
        </footer>
    );
}
