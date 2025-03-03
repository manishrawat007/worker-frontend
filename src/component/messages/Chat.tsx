import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Typography, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { BottomBox, Container, CustomIcon, HeaderBox, Heading, InnerContainer, InnerItem, MessageBox, MessageItem, Time } from "./styles/Chat.styled";
import { Inputfield } from "../login/Login.styled";
import { useRouter } from "next/router";
import { getUserMessage, sendMessage } from "@/service/apiUrls";
import Loader from "@/custom/loader/Loader";

const Chat = () => {
    const router = useRouter();
    const { recieverId } = router.query;
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [messageData, setMessageData] = useState<{ messages: any[], senderId: any, recieverId: any } | null>(null);
    const [input, setInput] = useState("");

    const fetchMessageDetail = useCallback(async (id: any) => {
        try {
            const res = await getUserMessage(id);
            setMessageData((prev) => {
                if (JSON.stringify(prev) !== JSON.stringify(res?.data?.data)) {
                    return res?.data?.data;
                }
                return prev;
            });
        } catch (err) {
            console.log("err--------", err);
        }
    }, []);

    useEffect(() => {
        if (!recieverId) return;

        if (intervalId.current) {
            clearInterval(intervalId.current);
        }

        fetchMessageDetail(recieverId);

        intervalId.current = setInterval(() => {
            fetchMessageDetail(recieverId);
        }, 5000);

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [recieverId, fetchMessageDetail]);

    const messageList = useMemo(() => {
        if (messageData) {
            return messageData?.messages?.map((mes: any) => ({
                id: mes._id,
                text: mes.message,
                sender: recieverId?.toString() !== mes.id.toString(),
                time: mes.time
            }));
        }
        return []
    }, [messageData?.messages]);

    const user = useMemo(() => {
        return (
            {
                name: recieverId?.toString() == messageData?.senderId._id ? messageData?.senderId.firstName + " " + messageData?.senderId.lastName : messageData?.recieverId.firstName + " " + messageData?.recieverId.lastName,
                profile: recieverId?.toString() == messageData?.senderId._id ? messageData?.senderId.profile : messageData?.recieverId.profile,
            }
        )
    }, [messageData])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList]);

    const handleSend = async () => {
        if (input.trim() === "" || !recieverId) return;

        try {
            const payload = { message: input };
            await sendMessage(recieverId, payload);
            setInput("");
            fetchMessageDetail(recieverId);
        } catch (err) {
            console.log("err-------", err);
        }
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    if (messageData == null) {
        return <Loader />
    }

    return (
        <Container>
            <InnerContainer>
                <HeaderBox>
                    <Avatar
                        src={user.profile}
                        sx={{ width: "50px", height: "50px" }}
                    />
                    <Heading variant="body2">{user.name}</Heading>
                </HeaderBox>
                <MessageBox>
                    {messageList?.length > 0 && messageList?.map((msg) => (
                        <MessageItem key={msg.id} sender={msg.sender}>
                            <InnerItem sender={msg.sender}>
                                <Typography variant="body2" sx={{ color: "#fff" }}>{msg.text}</Typography>
                                <Time>{formatTime(msg.time)}</Time>
                            </InnerItem>
                        </MessageItem>
                    ))}
                    <div ref={messagesEndRef} />
                </MessageBox>
                <BottomBox>
                    <Inputfield
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <CustomIcon color="primary" onClick={handleSend}>
                        <SendIcon />
                    </CustomIcon>
                </BottomBox>
            </InnerContainer>
        </Container>
    );
};

export default Chat;
