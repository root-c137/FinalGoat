
import './Login.css';
export const Login = () =>
{
    return(
        <div className="Login">
            <h3>Log in</h3>
            <form className="FormLogin">
                <div className="FormGroup">
                    <label className="FormLabel" htmlFor="Username">Username</label>
                    <input className="FormInput" type="text" name="Username" id="Username"/>
                </div>
                <div className="FormGroup">
                    <label className="FormLabel" htmlFor="Pass">Password</label>
                    <input className="FormInput" type="password" name="Pass" id="Pass"/>
                </div>

                <button className="BLogin">Login</button>
            </form>
        </div>
    )
}