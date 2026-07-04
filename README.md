# Biomedical Device Library Website

This is a starter Next.js website for your biomedical device database.

## Run locally
1. Install Node.js from https://nodejs.org
2. Open this folder in VS Code
3. Run:
   npm install
   npm run dev
4. Open http://localhost:3000

## Use Airtable live data
Create a `.env.local` file:

AIRTABLE_TOKEN=your_new_airtable_token
AIRTABLE_BASE_ID=appZ4G2qYD46mde5T
AIRTABLE_TABLE_NAME=Medical Devices

Then restart `npm run dev`.

## Publish free on Vercel
1. Create GitHub account
2. Upload this project to GitHub
3. Go to https://vercel.com
4. Import the GitHub project
5. Add the same environment variables in Vercel Project Settings
6. Deploy

Important: Never share your Airtable token publicly.
