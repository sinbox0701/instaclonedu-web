import { gql, useMutation } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faPaperPlane,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
    background-color: white;
   border-radius: 4px;
   border: 1px solid ${(props) => props.theme.borderColor};
   margin-bottom: 60px;
   max-width: 615px;
`;
const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
    margin-left: 15px;
`;

const PhotoFile = styled.img`
    min-width: 100%;
    max-width: 100%;
`;

const PhotoData = styled.div`
    padding: 12px 15px;
`;

const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }
    svg {
        font-size: 20px;
    }
`;

const PhotoAction = styled.div`
    margin-right: 10px;
    cursor: pointer;
`;

const Likes = styled(FatText)`
    margin-top: 15px;
    display: block;
`;

function Photo({ id, user, file, isLiked, likes }) {
    const updateToggleLike = (cache, result) => {
        //cache --> apollo cache //result --> backend data 순서 중요
        const {
            data:{
                toggleLike: {ok}
            }
        } = result;
        if(ok){
            const fragmentId = `Photo:${id}`;
            const fragment = gql`
                fragment changeLike on Photo {
                    isLiked
                    likes
                }
            `;
            const result = cache.readFragment({
                id:fragmentId,
                fragment,
            });
            //cache.readFragment --> cache에 존재하는 Object의 일부분을 읽기
            //읽을 cache object의 id
            //읽을 것(fragment) fragment [원하는 이름] on [타입(여기선 Photo)] { 필드 }
            if("isLiked" in result && "likes" in result){
                const {isLiked: cacheIsLiked, likes: cacheLikes} = result;
                cache.writeFragment({
                    id:fragmentId,
                    fragment,
                    data: {
                        isLiked: !cacheIsLiked,
                        likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1 
                    }
                });
                //cache.writeFragment --> cache에 존재하는 Object의 일부분을 수정
                //변경할 cache object의 id
                //변경할 것(fragment) fragment [원하는 이름] on [변경할 타입(여기선 Photo)] { 변경할 필드 }
                //변경 내용(data) fragment에 작성한 필드의 변경시킬 내용 입력
            }
        }
    };
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id,
        },
        update: updateToggleLike
    });
    //update --> 백엔드에서 받은 데이터를 apollo cache에 직접 연결해줌
    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Avatar lg url={user.avatar} />
                <Username>{user.username}</Username>
            </PhotoHeader>
            <PhotoFile src={file} />
            <PhotoData>
                <PhotoActions>
                    <div>
                        <PhotoAction onClick={toggleLikeMutation}>
                            <FontAwesomeIcon style={{ color: isLiked ? "tomato" : "inherit" }} icon={isLiked ? SolidHeart : faHeart} />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon icon={faComment} />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </PhotoAction>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faBookmark} />
                    </div>
                </PhotoActions>
                <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
            </PhotoData>
         </PhotoContainer>
    );
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
};
//propTypes --> parameter의 data형식을 지정하여 지정한 형식 의외의 값을 받지 못하게함 --> 코드 안전성 

export default Photo;