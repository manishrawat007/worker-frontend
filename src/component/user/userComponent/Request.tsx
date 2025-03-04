import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Card, Grid2, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { AcceptRejectRequest, pendingRequest } from "@/service/apiUrls";
import { useRouter } from "next/router";
import { Accept, ButtonContainer, Container, CustomListItem, Heading, ProfileCard, Reject, RequestContainer, RequestText } from "../styles/Request.styled";
import { Error } from "../styles/Connections.styled";
import Loader from "@/custom/loader/Loader";

interface Requests {
  fromUserId: {
    _id: string,
    firstName: string,
    profile: string,
    lastName: string
  }
}

const IncomingRequests = () => {
  const [requests, setRequests] = useState<Requests[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    handlePendingRequest()
  }, [])

  const handlePendingRequest = () => {
    pendingRequest().then((res) => {
      setRequests(res?.data?.users)
    }).catch((err) => {
      console.log('err-------', err.message)
    }).finally(() => {
      setLoading(false)
    })
  }

  const handleAcceptDecline = (status: string, id: string) => {
    AcceptRejectRequest(status, id).then(() => {
      setRequests((prev) => prev.filter(({ fromUserId }) => fromUserId._id.toString() != id.toString()))
    }).catch((err) => {
      console.log('err.message', err.message)
    })
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Container>
      <List>
        <Heading variant="h5">Requests</Heading>
        <ProfileCard>
          <Grid2 container spacing={2}>
            {requests.length > 0 ? requests?.map((request) => (
              <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6 }} onClick={() => { router.push(`/user/${request.fromUserId._id}`) }}>
                <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                  <CustomListItem
                    key={request.fromUserId._id}
                  >
                    <RequestContainer>
                      <ListItemAvatar>
                        <Avatar src={request.fromUserId.profile} alt={request.fromUserId.firstName} />
                      </ListItemAvatar>
                      <RequestText primary={request.fromUserId.firstName + ' ' + request.fromUserId.lastName} />
                    </RequestContainer>

                    <ButtonContainer>
                      <Accept
                        variant="contained"
                        size="small"
                        onClick={(e) => { e.stopPropagation(), handleAcceptDecline("accepted", request.fromUserId._id) }}
                      >
                        Accept
                      </Accept>
                      <Reject
                        variant="outlined"
                        size="small"
                        onClick={(e) => { e.stopPropagation(), handleAcceptDecline("rejected", request.fromUserId._id) }}
                      >
                        Decline
                      </Reject>
                    </ButtonContainer>
                  </CustomListItem>
                </Card>
              </Grid2>
            )) : (
              <Grid2 size={{ xs: 12 }}>
                <Error>No User Found</Error>
              </Grid2>
            )}
          </Grid2>
        </ProfileCard>
      </List>
    </Container>
  );
};

export default IncomingRequests;
