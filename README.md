# | | | C R O W D S O U R C E | | | 

## How to Run The App
First, add the environment variable:

Create new file ".env" in crowd-source-ai folder

Paste the DATABASE_URL key into the .env file

Check and make sure ".env" is listed in the file ".gitignore"

From the Root Directory, run these commands:

cd .\crowd-source-ai

npm install

npm run dev

Lastly, open the link displayed in the terminal. (Most likely: http://localhost:3000)

## Description
Crowd Source is a tool for communities to communicate with first responders in the event of a crisis. Often during events like flash floods, earthquakes, and fires, 911 operators become overwhelmed and vital/live information does not reach first responders. With Crowd Source, people will be able to send messages tagged to their location with a description of issues in their area such as road flooding, building fires, and car accidents. Then a LLM will aggregate the messages from the people in an area to give first responders a concise summary of the state of the community to help them navigate safely and quickly address the community's needs in an city-wide emergency. Users will also be able to submit photos with their messages which the LLM may hyperlink in the summary for first responders to view.

## Members
- Kent Phipps
- Jason Ang
- Tiancheng Zhou
- David Willis

  ## INSTRUCTIONS FOR TESTING

  1. From https://github.com/StrongKs/CrowdSource/ click "Code" and then in the drop down select "Download Zip"
  2. Unzip the Folder
  3. Follow the Instructions from the "How to Run the App" section
  4. Test All Functionality: Log a message and check if it shows up in the database
  5. Note: Do not test in your IDE! Do it from the terminal to make sure that it works consistently on any machine.
