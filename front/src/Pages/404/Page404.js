



import "./Page404.css";
import {Link} from "react-router-dom";
export const Page404 = () =>
{
    return(
        <div className="Page404">
            <h3 className="Page404__Title">404</h3>
            <p className="Page404__Txt">Oops there is nothing here</p>
            <Link className="BReturn" to="/">return to home page</Link>
        </div>
    );
}
