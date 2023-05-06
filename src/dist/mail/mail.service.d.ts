export declare class EmailService {
    private transporter;
    constructor();
    sendPasswordResetEmail(to: string, resetLink: string): Promise<any>;
}
