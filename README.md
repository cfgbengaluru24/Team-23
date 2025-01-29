# Team-23

# Best Practices Foundation Project

## Table of Contents
- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Data Flow Diagram](#dataflow-diagram)
- [Modules](#modules)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The Best Practices Foundation project aims to address various challenges faced by the illiterate women through gamefied MBA program. The primary areas of problem that they currently face is on training trainers, assessing their learning, recording and analyzing data, and creating a comprehensive knowledge bank for program management and reporting.

## Problem Statement

Development of technology to
1. Train trainers through digital modules
2. Assess trainers learning through the digital module and store it for end-of-cycle grading and certification
3. Record baseline and endline data of the programme participants
4. Analyse this data
5. Allow helpdesk personnel and trainers to view FAQs recorded from queries related to earlier and existing training
batches (filters by a UID number for each participant)
6. Create a knowledge bank and document repository which can be utilized for program management and reporting

Addressing these issues we came up with our one in all solution focusing on social good. Digging deep into our solution

## Features

### Trainer & Volunteer Registration
- **Volunteer Registration**: Volunteers fill a detailed form and register on the portal.
- **Modular Courses**: Volunteers are taken through a series of curated courses based on their location.
- **Testing & Certification**: Volunteers take tests, and results determine their acceptance as volunteers.

### Admin Data Management
- **Baseline Data Recording**: Scrutinize and record baseline data.
- **Ongoing Data Recording**: Record data at specific intervals.
- **Data Visualization**: Real-time graphical representation of the data.
- **Collaborative Recommendation System**: Prevent wastage by recommending likely occupations.
- **SMS Service**: Send data on current business status via SMS at intervals and upon intervention.

### Call Center
- **Helpline Service**: Landline helpline for users to call from PCO booths.
- **Language & Feedback Options**: Provision for language selection and feedback/enquiry options.
- **Dedicated Call Center Staff**: Calls are attended by dedicated personnel.
- **Call Data Analysis**: Transcribe and analyze call data to identify general traits and make modifications.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **SMS Service**: Twilio

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/best-practices-foundation.git
    cd best-practices-foundation
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Create a `.env.local` file and add the required environment variables
    ```env
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    ```

4. Start the development server
    ```bash
    npm run dev
    ```

## Data Flow Diagram
![image](https://github.com/user-attachments/assets/7887ea13-daac-4dc3-b0c7-92b7dd8ae354)

## Modules

### Trainer & Volunteer Registration
- Detailed form
- Modular courses
- Tests and results

### Admin Data Management
- Baseline data recording
- Ongoing data recording
- Data visualization
- Recommendation system
- SMS service

### Call Center
- Helpline service
- Language and feedback options
- Dedicated call center staff
- Call data analysis

## Usage

1. **Register as a Volunteer**: Fill out the detailed form and start the modular courses.
2. **Admin Dashboard**: View and manage data, visualize it, and utilize the recommendation system.
3. **Call Center**: Use the helpline service for assistance and feedback.

 <br /> <br /> The code ("Code") in this repository was created solely by the student teams during a coding competition hosted by JPMorgan Chase Bank, N.A. ("JPMC"). JPMC did not create or contribute to the development of the Code. This Code is provided AS IS and JPMC makes no warranty of any kind, express or implied, as to the Code, including but not limited to, merchantability, satisfactory quality, non-infringement, title or fitness for a particular purpose or use.