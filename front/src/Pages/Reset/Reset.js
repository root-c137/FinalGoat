


import "./Reset.css";
import {useState} from "react";
import {EasyFetch} from "../../Utils/EasyFetch";
import {Notice} from "../../Components/Notice/Notice";
import {CodeResetVerification} from "../../Components/CodeResetVerification/CodeResetVerification";
import {ResetPass} from "../../Components/ResetPass/ResetPass";
export const Reset = () =>
{
    const [showFormCode, setShowFormCode] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [showEmail, setShowEmail] = useState(true);
    const [Email, setEmail] = useState("");
    const [Code, setCode] = useState("");
    const [NoticeMsg, setNoticeMsg] = useState(null);


    const getCode = () =>
    {
        const URL = "reset/code";
        const Method = "POST";
        const Data = {Email : Email};

        if(Email.length > 0)
        {
            EasyFetch(URL, Data, Method).then(res =>
            {
                if (res.message === "Ok")
                {
                    setCode(res.data);
                    setShowEmail(false);
                    setShowFormCode(true);
                }
                else
                {
                    setNoticeMsg(res.message);
                }
            });
        }
        else
            setNoticeMsg("Enter your e-mail adress.")
    }


    const resetPassword = () => {
        setShowFormCode(false);
        setShowReset(true);
    }

    return (
        <div className="Reset">
            {
                showFormCode ? <CodeResetVerification Email={Email} showReset={resetPassword} /> :
                    showReset ? <ResetPass Email={Email} /> :

            <>
                    <h3>Redefine your password</h3>
                    <Notice notice={NoticeMsg}  />

                    <p>Enter your email address to receive a link to change your password.</p>
                    <input type="text" name="Email" id="Email"
                           onChange={e => setEmail(e.target.value)} />
                    <button className="BReset" onClick={getCode}>Confirm</button>
            </>
            }

        </div>

    );
}
