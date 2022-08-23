import LogOut from "../LogOut/LogOut";
import Profile from "../Profile/Profile";
import './Home.css';

const Home = ({ user }) => {
    return (
        <div className="home">
            <Profile user={user} />
            <LogOut />
        </div>
    );
}

export default Home;