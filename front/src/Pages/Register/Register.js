
import './Register.css';


export const Register = () => {
    return (
        <div className="Register">
            <form className="RegisterForm">
                <div className="FormGroup">
                    <label htmlFor="Username">Username</label>
                    <input type="text" name="Username" id="Username"/>
                </div>
                <div className="FormGroup">
                    <label htmlFor="Email">Email</label>
                    <input type="text" name="Email" id="Email"/>
                </div>
                <div className="FormGroup">
                    <label htmlFor="Pass">Password</label>
                    <input type="text" name="Pass" id="Pass"/>
                </div>

                <button className="BRegister">Create account</button>
            </form>
        </div>
    )
}
