import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { AcceptRejectRequest, pendingRequest } from "@/service/apiUrls";

interface Requests {
    fromUserId:{
    _id:string,
    firstName:string,
    profile:string
    }
}

const IncomingRequests = () => {
  const [requests,setRequests]=useState<Requests[]>([])
  const [loading,setLoading]=useState<boolean>(true)

  useEffect(()=>{
    handlePendingRequest()
  },[])

  const handlePendingRequest=()=>{
    pendingRequest().then((res)=>{
        setRequests(res?.data?.users)
    }).catch((err)=>{
        console.log('err-------',err.message)
    })
  }

  const handleAcceptDecline=(status:string,id:string)=>{
    AcceptRejectRequest(status,id).then(()=>{
        setRequests((prev)=>prev.filter(({fromUserId})=>fromUserId._id.toString() != id.toString()))
    }).catch((err)=>{
        console.log('err.message',err.message)
    }).finally(()=>{
        setLoading(false)
    })
  }

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "20px auto",
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
        Incoming Requests
      </Typography>
      <List>
        {requests?.map((request) => (
          <ListItem
            key={request.fromUserId._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
              padding: "8px 0",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListItemAvatar>
                <Avatar src={request.fromUserId.profile} alt={request.fromUserId.firstName} />
              </ListItemAvatar>
              <ListItemText primary={request.fromUserId.firstName} />
            </Box>

            {/* Action Buttons */}
            <Box>
              <Button
                variant="contained"
                size="small"
                sx={{ marginRight: 1, backgroundColor: "#4caf50", color: "#fff" }}
                onClick={()=>handleAcceptDecline("accepted",request.fromUserId._id)}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ borderColor: "#f44336", color: "#f44336" }}
                onClick={()=>handleAcceptDecline("rejected",request.fromUserId._id)}
              >
                Decline
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default IncomingRequests;
