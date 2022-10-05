import Avatar from "../assets/anonAvatar.png";

const ReviewAndRating=({commentData})=>{
    console.log(commentData);
    return <div>
        {commentData?.map((comment,i) =>{
            console.log(comment.commentator.createdAt);
            return <div key={i} className='mb-[24px]'>
                <div className="flex items-center mb-[12px]">
                    <div className="mr-[12px]">
                       <img src={Avatar} className='rounded-[50px] w-[80px] h-[80px]'></img>
                    </div>
                    <div>
                        <p className="text-black font-semibold lg:text-[24px]">{comment?.commentator?.name}</p>
                        <p className="text-darkGrey-tint font-medium lg:text-[20px]">{comment?.createdAt.substring(0,10)}</p>
                    </div>
                </div>
                <div>
                    <p className="text-darkGrey-tint font-medium lg:text-[20px]">{comment?.content}</p>
                </div>
            </div>
        })}
    </div>
}

export default ReviewAndRating;