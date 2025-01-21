import { feeds } from "@/service/apiUrls"
import { useEffect, useState } from "react"

export const UserFeeds = () => {
    const [feedData, setFeedData] = useState<any>([])
    useEffect(() => {
        feeds().then((res) => {
            setFeedData(res?.data)
        }).catch((err) => {
            console.log('err----', err.data)
        })
    },[])

    return (
        <div style={{display:"flex",justifyContent:'space-around',gap:"10px",padding:"10px"}}>
        {feedData?.map((feed:any)=>(
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                <div style={{borderRadius:"50%",overflow: "hidden",width: "60px", height: "60px"}}>
                <img src={feed.profile} height="60px" width="60px"/>
                </div>
                <div>
                <p>{feed?.firstName}</p>
                <p>{feed?.gender}</p>
                <p>{feed?.age}</p>
                </div>
                
            </div>
        ))}
        </div>

    )
}