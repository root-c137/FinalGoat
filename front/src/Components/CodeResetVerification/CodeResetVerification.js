import {EasyFetch} from "../../Utils/EasyFetch";
import {useState} from "react";
import {Notice} from "../Notice/Notice";


export const CodeResetVerification = ({Email, showReset}) =>
{
    const [NoticeMsg, setNoticeMsg] = useState(null);
    const [Code, setCode] = useState("");

    const verifCode = () => {

        const URL = "reset/codeverif";
        const Method = "POST";
        const Data = {"Code" : Code, "Email" : Email};

        EasyFetch(URL, Data, Method).then(res => {
            if(res.message !== "Ok")
                setNoticeMsg(res.message);
            else
            {
                showReset();
            }
        });
    }

    return(
        <div>
            <Notice notice={NoticeMsg} />
            <p>{Email}</p>
            <p>enter the code received by email</p>
            <input type="text" name="ResetCode" id="ResetCode" onChange={e => setCode(e.target.value) }
                   placeholder="123456"
                   defaultValue=" " />
            <button className="BReset" onClick={verifCode}>Confirm</button>

        </div>
    );
}
