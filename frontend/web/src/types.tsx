export type userType = {
    slackId: string;
    name: string;
    email: string;
    groupId: number;
    role: string;
};

export type meetingType = {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    repeat: string;
    content: string;
    participants: userType[];
    room: string;
    participateGroups: string[];
    keyword: string;
    keyItems: userType[];
};
