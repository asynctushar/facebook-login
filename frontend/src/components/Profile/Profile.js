import './Profile.css';

const Profile = ({ user }) => {
    console.log(user)
    return (
        <div className="profile">
            <div className="profile-img-container">
                <img className='profile-img' src={user.photos[0].value} alt="profile picture" />
            </div>
            <h2>Name: {user.displayName}</h2>
            <h2>Email: {user.emails[0].value}</h2>
        </div>
    );
}

export default Profile;