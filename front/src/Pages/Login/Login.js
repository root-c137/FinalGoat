
import './Login.css';
import {Link} from "react-router-dom";
import {EasyFetch} from "../../Utils/EasyFetch";
import {useState} from "react";
import {Notice} from "../../Components/Notice/Notice";
import { useNavigate } from "react-router-dom";


export const Login = () =>
{
    const [Username, setUsername] = useState("");
    const [Pass, setPass] = useState("");
    const [notice, setNotice] = useState("");
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();

        const URL = "api/login_check";
        const Method = "POST";
        const Data = {
            "username" : Username,
            "password" : Pass
        };

        if(Username.length === 0 || Pass.length === 0)
            setNotice("Enter a username and password to log in.");
        else {
            EasyFetch(URL, Data, Method).then(res => {

                if (res.message === "Invalid credentials.")
                    setNotice("The username and/or password are incorrect.");
                else if(res.message.split(',')[0] === "Too many failed login attempts")
                    setNotice(res.message);
                else
                {
                    localStorage.setItem("token", res.token);
                    fetchUser(res);
                }
            });
        }

    }

    const fetchUser = (res) =>
    {
        const Url = "api/user";
        const method = "GET";

        console.log(res);
        EasyFetch(Url, null, method, res.token).then(res => {
            console.log(res);
            localStorage.setItem("Username", res['data'].Username);
            localStorage.setItem("Email", res['data'].Email);
            localStorage.setItem("Cv", res['data'].Vote);
            navigate('/');
        });
    }

    return(
        <div className="RegisterAndLogin">
            <h3>Log in</h3>
            <Notice notice={notice} />

            <form className="Form">
                <div className="FormGroup">
                    <label className="FormLabel" htmlFor="Username">Username</label>
                    <input className="FormInput" type="text" name="Username" id="Username"
                    onChange={e => setUsername(e.target.value) } />
                </div>
                <div className="FormGroup">
                    <label className="FormLabel" htmlFor="Pass">Password</label>
                    <input className="FormInput" type="password" name="Pass" id="Pass"
                    onChange={e => setPass(e.target.value) } />
                </div>

                <button className="BLogin Button" onClick={handleClick}>Login</button>
            </form>
            <Link className="MpResetLink" to="/reset">Forgot your password ?</Link>

            <Link to="/register" className="BRegister">or register</Link>
        </div>
    )
}