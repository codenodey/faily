import { emailException } from "../src/emailExpcetion.js";

try {
    throw new Error('Test exception error');
} catch (error) {
    emailException(error, {
        name: 'Cristian',
        email: 'bGt2D@example.com',
        url: 'https://www.google.com',
        content: {
            subject: 'Test subject',
            text: 'Test text',
            html: '<h1>Test html</h1>'
        }
    });
}
