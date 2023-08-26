import { getJobById } from './../../jobs/get/getJobById';
import { getUserById } from './../../users/get/getUserById';
import { query, or, where, onSnapshot } from "firebase/firestore";
import { ChatRoomT } from "../../../../types/chatRoom.type";
import { chatRoomsCollection } from "../chatRooms.collection";
import { getMessageById } from '../../messages/getMessageById';

export const getRealTimeChatRooms = (userId:string) => {
    try{
        const q = query(chatRoomsCollection,or(where('worker','==',userId),where('jobCreator','==',userId)));
        let chatRooms:any[] = [];
        onSnapshot(q,async (snapshot) => {
            const docs = snapshot.docs;
            chatRooms = docs.map(doc => doc.data());
            const jobCreatorsQ = chatRooms.map(async (chatRoom) => await getUserById(chatRoom.jobCreator));
            const workersQ = chatRooms.map(async (chatRoom) => await getUserById(chatRoom.worker));
            const jobsQ = chatRooms.map(async (chatRoom) => await getJobById(chatRoom.job));
            const lastMessagesQ = chatRooms.map(async (chatRoom) => {
                await getMessageById(chatRoom.lastMessage);
            });

            const jobCreators = await Promise.all(jobCreatorsQ);
            const workers = await Promise.all(workersQ);
            const lastMessages = await Promise.all(lastMessagesQ);
            const jobs = await Promise.all(jobsQ);
            chatRooms.forEach((chatRoom,i) => {
                chatRoom.id = docs[i].id;
                chatRoom.jobCreator = jobCreators[i];
                chatRoom.worker = workers[i];
                chatRoom.lastMessage = lastMessages[i];
                chatRoom.job = jobs[i];
            });
        });
        return chatRooms as ChatRoomT[];
    }catch(err){
        console.error(err);
    }
}