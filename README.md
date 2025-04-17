# | | | C R O W D S O U R C E | | | 
## WARNING:
App will not run without the new google maps environment variable


## Issue Templates
Please, copy and paste the appropriate template below and complete all fields for each issue you write.

### Issue Template for Feature Requests:

#### Summary  
Briefly describe the feature and its purpose.  

#### Motivation  
Explain why this feature is needed. What problem does it solve? How will it improve the project?  

#### Proposed Solution  
Describe how the feature should work. Include details on UI changes, API endpoints, and other relevant implementation details.  

#### Requirements  
- [ ] List specific functionalities that need to be implemented  
- [ ] Define any UI components, backend changes, or database updates needed  
- [ ] Mention any dependencies or prerequisites  

#### Acceptance Criteria  
Define what must be completed for the feature to be considered "done." Example:  
- [ ] Users can add events to their personal calendar  
- [ ] The API correctly stores and retrieves event data  
- [ ] The UI updates dynamically when a new event is added  

#### Additional Notes
Mention any concerns, edge cases, or related issues. (Optional)


### Issue Template for Bugs:
#### Summary  
Briefly describe the problem.  

#### Steps to Reproduce (if applicable)  
Include the steps to trigger the issue.  

#### Expected Behavior  
Explain what the correct outcome should be.  

#### Actual Behavior (if applicable)  
Describe what is currently happening instead.  

#### Additional Notes  
Include screenshots, logs, or links to relevant discussions.  


## How to Run The App
Make sure Ollama is downloaded: https://ollama.com/download

First, add the environment variable:

Create new file ".env" in crowd-source-ai folder
    Note: The .env file must have both the database url and the UploadThing token

Paste the DATABASE_URL key into the .env file
Paste the Upload thing Key into the .env file
Paste the Google Maps key into the .env file

Check and make sure ".env" is listed in the file ".gitignore"

From the Root Directory, run these commands:

cd .\crowd-source-ai

npm install

ollama serve

ollama pull deepseek-r1:1.5b (or other models you want to pull)

npm run dev

Lastly, open the link displayed in the terminal. (Most likely: http://localhost:3000)

## Description
Crowd Source is a tool for communities to communicate with first responders in the event of a crisis. Often during events like flash floods, earthquakes, and fires, 911 operators become overwhelmed and vital/live information does not reach first responders. With Crowd Source, people will be able to send messages tagged to their location with a description of issues in their area such as road flooding, building fires, and car accidents. Then a LLM will aggregate the messages from the people in an area to give first responders a concise summary of the state of the community to help them navigate safely and quickly address the community's needs in an city-wide emergency. Users will also be able to submit photos with their messages which the LLM may hyperlink in the summary for first responders to view.

## Members
- Kent Phipps
- Jason Ang
- Tiancheng Zhou
- David Willis

## Instructions for Testing

1. From https://github.com/StrongKs/CrowdSource/ click "Code" and then in the drop down select "Download Zip"
2. Unzip the Folder
3. Follow the Instructions from the "How to Run the App" section
4. Test All Functionality: Log a message and check if it shows up in the database
5. Note: Do not test in your IDE! Do it from the terminal to make sure that it works consistently on any machine.
