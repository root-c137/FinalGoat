import {useState} from "react";
import {Notice} from "../Notice/Notice";
import {EasyFetch} from "../../Utils/EasyFetch";
import {Link} from "react-router-dom";

import "./ResetPass.css";
export const ResetPass = ({Email}) =>
{
    const [NoticeMsg, setNoticeMsg] = useState(null);
    const [PassOne, setPassOne] = useState(null);
    const [PassTwo, setPassTwo] = useState(null);
    const [isChanged, setIsChanged] = useState(false);

    const ResetPass = (e) => {
        e.preventDefault();

        const PassLengthCheck = PassTwo?.length > 0 && PassOne?.length > 0;
        const PassCheck = PassOne === PassTwo;

        if(PassLengthCheck && PassCheck)
        {
            const URL = "reset/resetpassword";
            const Method = "POST";
            const Data = {"PassOne" : PassOne, "PassTwo" : PassTwo, "Email" : Email};

            EasyFetch(URL, Data, Method).then(res => {
                setIsChanged(true);
            });
        }
        else
        {
            setNoticeMsg("Enter a new password (the 2 fields must be identical).");
        }
    }

    return(
        <div>
            {!isChanged ? <Notice notice={NoticeMsg} /> : ""}

            {isChanged ?
                <div>
                    <p>Your password has been changed !</p>
                    <Link className="BLogin" to="/login">Login</Link>

                </div> :
             <>
                 <p>Reset your password</p>
                 <input className="ResetPass ResetPass1" type="password" name="Pass" id="Pass"
                        onChange={e => setPassOne(e.target.value)} placeholder="new password"/>
                 <input className="ResetPass ResetPass2" type="password" name="Pass2" id="Pass2" placeholder="retape new password"
                        onChange={e => setPassTwo(e.target.value) }/>

                 <button className="BReset" onClick={ResetPass}>Confirm</button>
             </>
            }
        </div>
    );
}
