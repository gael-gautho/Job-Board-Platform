import apiService from "@/libs/apiService";
import { getUserInfo } from "@/libs/actions";
import ProfileForm from "@/components/ProfileForm";
import type { ProfileType } from "@/types"; 

interface ProfilePageProps {
    params: {
        id: string;
    };
}

export default async function ProfilePage({ params }: ProfilePageProps) {

    const page_id  = (await params).id
    const profileData: ProfileType = (await apiService.get(`/get_profile/${page_id}`)).data;
    const {user_id} = await getUserInfo();

    const isOwner = page_id === user_id;

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4 py-6">
            <ProfileForm initialProfile={profileData} isOwner={isOwner} />
        </div>
    );
}