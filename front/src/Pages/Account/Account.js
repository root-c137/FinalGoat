

import "./Account.css";
import {FormUser} from "../../Components/FormUser/FormUser";
import {useEffect, useState} from "react";
import {EasyFetch} from "../../Utils/EasyFetch";

export const Account = () =>
{
    const [showUsernameInput, setShowUsernameInput] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [showPassInput, setShowPassInput] = useState(false);


    return(
        <div className="Account">
            <h3>Account</h3>
            <h4>Your vote : {localStorage.getItem('Cv') !== 'null' ? localStorage.getItem('Cv') : 'you did not vote'}</h4>

            <table className="InfosAndForm">
                <tbody>
                    <tr className="InfosG">
                        <td className="Label">Username</td>
                        <td>{localStorage.getItem("Username")}</td>
                    </tr>
                    <tr className="InfosG">
                        <td className="Label">Email</td>
                        <td>{localStorage.getItem("Email")}</td>
                    </tr>
                    <tr className="InfosG">
                        <td className="Label">Password</td>
                        <td>******</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}
