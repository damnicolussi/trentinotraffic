import "./Profile.scss";

interface ProfileProps {
  src: string;
  name: string;
  role: string;
  link: string;
}

const Profile = (props: ProfileProps) => {
  return (
    <a
      href={`https://github.com/${props.link}`}
      target="_blank"
      className="profile_link"
    >
      <div className="profile__cnt">
        <div className="img_cnt">
          <img src={props.src} alt={props.name} />
        </div>
        <div className="data_cnt">
          <h4>{props.name}</h4>
          <p>{props.role}</p>
        </div>
      </div>
    </a>
  );
};

export default Profile;
