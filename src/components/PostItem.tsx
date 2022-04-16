import React, { useContext } from "react"
import Rating from "react-rating"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../firebase/AuthContext"
import { updatePostRating, changePostRating } from "../firebase/firebase"
import { ILocation} from "../types"
import StarIcon from "./StarIcon"

interface PostItemProps {
    post: ILocation
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    const currentUser = useContext(AuthContext)
    const navigate = useNavigate()

    const handlePostDetailNavigate = () => {
        navigate(`/posts/${post.id}`)
    }

    const userId = currentUser === null ? "" : currentUser.uid

    // To refactor later =>
    // const handleRateClick = userId !== "" ? async (value: number) => {
    //     await updatePostRating(post, {
    //         userId,
    //         value
    //     })
    // } : (value: number) => {}

    // const handleRateChange = userId !== "" ? async (value: number) => {
    //     await changePostRating(post, {
    //         userId,
    //         value
    //     })
    // } : (value: number) => {} 
    
    // const ratingToRender = post.rating.find(rate => rate.userId === currentUser?.uid)?.value || 0
    const allRating = Math.floor(post.cachedRating)

    return (
        <div className="gray-container post-item">
            <div className="post-item-img-container" onClick={handlePostDetailNavigate}>
                <img alt='' className="post-item_img" src={post.images[0]}/>
            </div>
            <div className="white-container last">
                <div className="item-text">
                    <div onClick={handlePostDetailNavigate} className="post-item_title">{post.name}</div>
                    <div className="post-item_rate-section">
                        <Rating initialRating={allRating} fullSymbol={<StarIcon filled />} emptySymbol={<StarIcon filled={false}/>}/>
                        <label>{allRating}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem