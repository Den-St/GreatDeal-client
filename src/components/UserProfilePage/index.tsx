import { useUserProfile } from "../../hooks/userProfile.hook";

export const UserProfilePage = () => {
    const {user,userLoading} = useUserProfile();
    return <>
    </>
}