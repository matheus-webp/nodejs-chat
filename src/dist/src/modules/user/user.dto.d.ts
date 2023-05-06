export type UserDTO = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation?: string;
};
export type MessageDTO = {
    id: number;
    content: string;
    timestamp: Date;
};
