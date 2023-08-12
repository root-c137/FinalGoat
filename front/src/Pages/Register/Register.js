
import {useState} from "react";
import {EasyFetch} from "../../Utils/EasyFetch";
import {Notice} from "../../Components/Notice/Notice";

import "./Register.css";
import {Link, useNavigate} from "react-router-dom";
export const Register = () => {

    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const [notice, setNotice] = useState(null);
    const [UsernameError, setUsernameError] = useState(false);
    const [EmailError, setEmailError] = useState(false);
    const [PassError, setPassError] = useState(false);
    const Navigate = useNavigate();

    const handleClick = (e) =>
    {
        e.preventDefault();
        clearCurrentError();

        setNotice("");
        if(Username !== null && Email !== null && Pass !== null)
        {
            const Data = {
                Username: Username,
                Email: Email,
                Pass: Pass
            };


            const URL = "register";
            EasyFetch(URL, Data,  "POST").then((res) => {
                setNotice(res.message);
                switch(res.message)
                {
                    case "An account already exists with this email address." :
                    {
                        setEmailError(true);
                    }break;
                    case "This username is already taken." :
                    {
                        setUsernameError(true);
                    }break;
                    case "Username must contain at least 4 characters without special character." :
                    {
                        setUsernameError(true);
                    }break;
                }

                if(res.message === "Registration was successful !")
                {
                    console.log(res);
                    clearInput();
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("Username", Username);
                    localStorage.setItem("Email", Email);
                    localStorage.setItem("Cv", null);

                    Navigate("/");
                }
            });

        }
        else
            setNotice("Tous les champs doivent être remplis.");
    }



    const clearCurrentError = () =>
    {
        setUsernameError(false);
        setEmailError(false);
    }

    const clearInput = () =>
    {
        setUsername("");
        setEmail("");
        setPass("");
    }

    return (
        <div className="RegisterAndLogin">
            <h3 className="RegisterAndLogin__Title">Create your account</h3>

            <Notice notice={notice}/>

            <form className="Form">
                <div className="FormGroup">
                    <label htmlFor="Username" className="FormLabel">Username</label>
                    <input className={UsernameError ? "FormInput CurrentError" : "FormInput"}
                           type="text" name="Username" id="Username"
                           onChange={e => {setUsername(e.target.value); e.currentTarget.className = "FormInput"} } value={Username}
                           />
                </div>
                <div className="FormGroup">
                    <label htmlFor="Email" className="FormLabel">Email</label>
                    <input className={EmailError ? "FormInput CurrentError" : "FormInput"} type="text" name="Email" id="Email"
                    onChange={e => {setEmail(e.target.value); e.currentTarget.className = "FormInput"}} value={Email}/>
                </div>
                <div className="FormGroup">
                    <label className="FormLabel" htmlFor="Pass">Password</label>
                    <input className={PassError ? "FormInput CurrentError" : "FormInput"} type="password" name="Pass" id="Pass"
                    onChange={e => { setPass(e.target.value); e.currentTarget.className = "FormInput"}} value={Pass}/>
                </div>

                <div className="h-captcha" data-sitekey="9217bd61-6be8-4e3c-9c71-533f87e98515"></div>
                <button className="Button" onClick={handleClick}>GO</button>
            </form>
            <Link to="/login" className="BRegister">or login</Link>

        </div>
    )
}
