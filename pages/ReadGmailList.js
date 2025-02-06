import { request } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const BASE_URL = 'https://gmail.googleapis.com';
const GMAIL_TOKEN = process.env.GMAIL_TOKEN;

export async function ReadGmailList() {
    const apiRequest = await request.newContext();
    const response = await apiRequest.get(`${BASE_URL}/gmail/v1/users/me/messages`, {
        headers: {
            'Authorization': `Bearer ${GMAIL_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.status() === 200) {
        const data = await response.json();
        const mailId = data.messages[0].id;
        console.log('Mail ID fetched:', mailId);

        // Update .env file
        updateEnvVariable('MAIL_ID', mailId);
        
        return mailId;
    } else {
        console.error('Failed to fetch the Gmail list. Status code:', response.status());
        return null;
    }
}

export async function readMail(mailId) {
    if (!mailId) {
        console.error('Mail ID is not set. Run getGmailList() first.');
        return null;
    }
    
    const apiRequest = await request.newContext();
    const response = await apiRequest.get(`${BASE_URL}/gmail/v1/users/me/messages/${mailId}`, {
        headers: {
            'Authorization': `Bearer ${GMAIL_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.status() === 200) {
        const data = await response.json();
        const mailBody = data.snippet;
        console.log('Mail Body:', mailBody);

        // Update .env file
        updateEnvVariable('MAIL_BODY', mailBody);
        
        return mailBody;
    } else {
        console.error('Failed to fetch the email. Status code:', response.status());
        return null;
    }
}

// Function to update .env file dynamically
function updateEnvVariable(key, value) {
    const envPath = '.env';
    let envVars = fs.readFileSync(envPath, 'utf8').split('\n');

    let updated = false;
    envVars = envVars.map(line => {
        if (line.startsWith(`${key}=`)) {
            updated = true;
            return `${key}=${value}`;
        }
        return line;
    });

    if (!updated) {
        envVars.push(`${key}=${value}`);
    }

    fs.writeFileSync(envPath, envVars.join('\n'));
}
