# Destination Insights Hub

A regional tourism dashboard designed to help local government areas (LGAs), destination marketing organisations (DMOs), and tourism operators gain actionable insights from visitor data.

The dashboard transforms complex tourism data into intuitive visualisations, enabling stakeholders to make informed decisions about destination development, marketing strategies, and resource allocation. Users can track visitor trends, analyse seasonal patterns, monitor key performance indicators, and identify emerging opportunities in their tourism markets.

***All provided data are for demonstration purposes only.**

## Usage

The application implements role-based access control to ensure appropriate data access and functionality for different user types:

 ### User Roles and Permissions

| Role                           | View Own LGA Data | PDF Exports | Compare Multiple LGAs | Upload CSV Data | User Management |
| ------------------------------ | ----------------- | ----------- | --------------------- | --------------- | --------------- |
| **Tourism Operator** (default) | ✅                 | ✅           | ❌                     | ❌               | ❌               |
| **Tourism Analyst**            | ✅                 | ✅           | ✅                     | ❌               | ❌               |
| **Admin**                      | ✅                 | ✅           | ✅                     | ✅               | ✅               |

**[Live Demo (Tourism Analyst)](https://destination-insights-hub.vercel.app/)** 


## 📌 Features

- ✅ Role-based user access (Admin, Analyst, Operator)

- ✅ Regional tourism data visualisations

- ✅ Data filtering by date

- ✅ Export dashboard as PDF

- ✅ Compare regions available from database

- ✅ Upload CSV to database


## 📊 Tech Stack

| Layer    | Tech                                 |
| -------- | ------------------------------------ |
| Frontend | React, Chakra UI, Recharts, jsPDF    |
| Backend  | Express, Multer, Papaparse, Supabase |
| Database | PostgreSQL                           |
