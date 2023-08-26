import { onSnapshot, or, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { chatRoomsCollection } from "../firebase/db/chatRooms/chatRooms.collection";
import { ChatRoomT } from "../types/chatRoom.type"
import { useAppSelector } from "./redux";
import { getJobById } from '../firebase/db/jobs/get/getJobById';
import { getMessageById } from '../firebase/db/messages/getMessageById';
import { getUserById } from '../firebase/db/users/get/getUserById';

export const useChatRooms = () => {
    const [chatRooms,setChatRooms] = useState<ChatRoomT[]>([])
    const [chatRoomsLoading,setChatRoomsLoading] = useState<boolean>(true);
    const userId = useAppSelector(state => state.user.id);

    const fetch = () => {
        const q = query(chatRoomsCollection,or(where('worker','==',userId),where('jobCreator','==',userId)));
        onSnapshot(q,async (snapshot) => {
            let _chatRooms:any[] = [];
            const docs = snapshot.docs;
            _chatRooms = docs.map(doc => doc.data());
            const jobCreatorsQ = _chatRooms.map(async (chatRoom) => await getUserById(chatRoom.jobCreator));
            const workersQ = _chatRooms.map(async (chatRoom) => await getUserById(chatRoom.worker));
            const jobsQ = _chatRooms.map(async (chatRoom) => await getJobById(chatRoom.job));
            const lastMessagesQ = _chatRooms.map(async (chatRoom) => await getMessageById(chatRoom.lastMessage));

            const jobCreators = await Promise.all(jobCreatorsQ);
            const workers = await Promise.all(workersQ);
            const lastMessages = await Promise.all(lastMessagesQ);
            const jobs = await Promise.all(jobsQ);
            _chatRooms.forEach((chatRoom,i) => {
                chatRoom.id = docs[i].id;
                chatRoom.jobCreator = jobCreators[i];
                chatRoom.worker = workers[i];
                chatRoom.lastMessage = lastMessages[i];

                chatRoom.job = jobs[i];
            });

            setChatRooms(_chatRooms);
            setChatRoomsLoading(false);
        });
    }
    useEffect(() => {
        if(!userId) return;
        fetch();
        
    },[userId])
    
    return {chatRooms,chatRoomsLoading,userId};
}