import './LogIn.css';

const LogIn = () => {
    const facebook = () => {

    };

    return (
        <div className="login">
            <button className="btn">
                <a href="https://localhost:5000/api/auth/facebook/callback">
                    Log In
                </a>
            </button>
        </div>
    );
}

export default LogIn;