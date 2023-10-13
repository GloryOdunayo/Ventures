type Social = {
    facebook: string;
    linkedin: string;
    instagram: string;
    twitter: string;
}
export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    gender: string,
    avatar: string,
    nationality: string,
    dob: string,
    bio: string,
    website: string,
    skills: string[],
    facebook: string;
    linkedin: string;
    instagram: string;
    twitter: string;
    socials: {
        facebook: string;
        linkedin: string;
        instagram: string;
        twitter: string;
    };
}