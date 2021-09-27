import { useParams } from "react-router-dom";

function Profile() {
    const { username } = useParams();
    //Route path에 :[변수명]으로 되어있는 값을 변수명:데이터로 가져올 수 있음
    return "Profile";
}

export default Profile;