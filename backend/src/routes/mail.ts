import nodemailer from 'nodemailer';

export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'shahilpatel688@gmail.com',
                pass: 'Pshahil@12'
            }
        });
    }

    async sendOtpEmail(email: string, otp: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: 'shahilpatel688@gmail.com',
                to: email,
                subject: 'Your OTP for Registration',
                html: `
                    <p>Hello,</p>
                    <p>Your OTP for registration is: ${otp}</p>
                    <p>Please use this OTP to complete your registration.</p>
                `
            });
            console.log('OTP email sent successfully');
        } catch (error) {
            console.error('Error sending OTP email:', error);
            throw new Error('Error sending OTP via email');
        }
    }
}
