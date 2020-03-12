# TaskManager

[![Maintainability](https://api.codeclimate.com/v1/badges/dafceeb72e94d0875a88/maintainability)](https://codeclimate.com/github/irfiacre/TaskManager/maintainability)
[![Build Status](https://travis-ci.org/irfiacre/TaskManager.svg?branch=develop)](https://travis-ci.org/irfiacre/TaskManager)
[![Coverage Status](https://coveralls.io/repos/github/irfiacre/TaskManager/badge.svg?branch=develop)](https://coveralls.io/github/irfiacre/TaskManager?branch=develop)

> Task Manager is a task management plaatform that helps you to stay organized and manage your day-to-day activities. You can use Task Manager to make any listing thing from shopping lists to task lists, take notes or set reminders to increase your productivity and focus on what matters to you.

#### All of the projects endpoints are hosted on [Heroku](https://taskamanager.herokuapp.com/)

> For better testing, please make requests using [Postman](https://www.getpostman.com/) 
  ```on Port localhost:7000/url```

### Features

1.  User can sign up
2.  User can sign in
3.  User can create a Task
4.  User can read (view) all Tasks
5.  User can read (view) specific Task
6.  User can update content of a Task
7.  User can delete a specific Task

### Endpoints

| HTTP Method | Endpoint                      | Description                                    |
| :---------- | :---------------------------- | :--------------------------------------------- |
| POST        | /auth/signup                  | allows the user to create an account           |
| POST        | /auth/signin                  | allows the user to sign in                     |
| POST        | /api/v1/tasks                 | allows the User to create a task               |
| GET         | /api/v1/tasks                 | allows the User to view all tasks created      |
| GET         | /api/v1/tasks ? taskid =  `taskId`      | allows the User to view a specific task        |
| PATCH       | /api/v1/tasks/< task-id >/end | allows the User to update the status of a task |
| PATCH       | /api/v1/tasks/< task-id >     | allows the User to update the content          |
| PATCH       | api/v1/tasks/< task-id >      | allows a user to DELETE a task                 |

### Prerequisites :

- Clone this project with `https://github.com/irfiacre/TaskManager.git`
- Head to project directory

#### API-Endpoints

##### Installation

> After clone open this in your code editor preferably Vs code.
>
> - `$ cd TaskManager`
> - `$ npm install`

##### To run the endpoints

> `npm run dev`

##### To learn the tests

> `npm test`

### Technologies used:

> Backend-API
>
> - NodeJS/Express
> - PostgreSQL
> - Mocha chai
> - TRAVIS CI

### Project Management

> Project Mangement for TaskManager can be found on [Google Docs](https://docs.google.com/document/d/10YyhQYYoZQDdyF-9RTIF6ZfFLKXcilsoWC6MWIeWnTs/edit?usp=sharing)

### Authors

># Warriorz Team
>
> [MUGOROZI Francois](https://github.com/Francois-MUGOROZI)
>
>[URIMUBENSHI Daniel](https://github.com/benshidanny11) 
>
>[KABUNDEGE Christophe](https://github.com/kabundege) 
>
>[MWUMVANEZA Arnold](https://github.com/fordarnold) 
>
>[IRADUKUNDA Allelua Fiacre](https://github.com/irfiacre)  `#Team Lead`
