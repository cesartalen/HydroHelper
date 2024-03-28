# Hydro Helper

Hydro Helper is a web application built to aid your daily water intake. It's built with Next.js and MongoDB.

[Hydro Helper](hydro-helper.vercel.app)

*Preview as an authenticated user*

![image](https://github.com/cesartalen/HydroHelper/assets/154442565/94f40be5-5da5-41d3-852f-1249fc2b1885)



## Features

- Monitor your hydration intake
- Set goals for minimum daily water intake
- Set a preset button to match the amount of your favorite cup for fast updates
- Manual input(ml)
- View your recent hydration statistics
- Responsive design

## Getting Started

For running this project yourself

### Prerequisites

- Node.js
- MongoDB database
- Github Oauth key (can also be easily modified to use other authjs providers `https://authjs.dev/getting-started/providers` )

### Installation

1. Clone the repo
   ````sh
   git clone https://github.com/cesartalen/HydroHelper.git```
   ````
2. Install NPM packages
   ```
   npm install
   ```
3. Create an .env in the root folder and include the following

   ```
   DATABASE_URL="mongodburl"
   AUTH_SECRET="secret"

   GITHUB_CLIENT_SECRET="secret"
   GITHUB_CLIENT_ID="id"
   ```

4. Run the following command
   ```
   npx prisma generate
   ```

### Usage

Run the development server with
`npm run dev`

And stay hydrated!
