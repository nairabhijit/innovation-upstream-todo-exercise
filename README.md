# Innovation Upstream frontend exercise - Abhijit Nair

## About Exercise

This a 'TODO' project interview exercise completed for the company Innovation Upstream

The 'TODO' project is a very simple 'Reminder' system

## About Project

The companies providing web services and maintenance usually manage a large pool of websites and domains. The challenge is to maintain a list of SSL certificates and domains that will expire in the future in one place and send reminders as per the configuration.

User can do below activities in the project
+ Add a new task
+ The task list is grouped by date & sort by the latest upcoming task
+ Can view details of the task by clicking on it
+ Can Update task details
+ Can delete task details

The navigation bar only has two links, to add a task and to view the tasks being added. The navigation bar remains sticky on scroll.

The task list is maintained in the localStorage so as to persist the data, also for the demonstration purpose.

Visually it is being differentiated for the tasks that are about to expire(Orange Color) and tasks that are already expired(Red Color).

For quick demonstration and convenience, the 'Load Sample Values' option has been given in the initial load, 'Clear All' option has also been given to clear all the tasks being added.

## Improvements
The app is very simple in nature, many things can be added, few of the features that come to my mind and are important are given below
+ Ability for the user to put a task in a group, for example, we can have a group named as 'SSL' and all the tasks of SSL will belong to SSL group, easy for organizing content
+ User can filter the task list by group
+ The task can have a history associated with it, for example, if an SSL certificate got expired, we can add a new one to the existing one and the old will be part of the history
+ User can view all the history for a particular SSL certificate, no need to delete or overwrite, useful in managing content.
+ Asking an 'email' in the task, the reminder will be sent on the given email. A default email can be setup by the user, so as to avoid giving the email all the time.
+ Date internationalization needs to be handled

## Run Project

In the current project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

You can find the test cases in folder `screens>TaskForm>__test__` & `screens>TaskList>__test__`

## This project uses the below technology stack
+ reactjs for the frontend development
+ typescript for type safety
+ bootstrap for css utilities & components
+ react-testing-library for testing
+ BEM(Block Element Modifier) naming convention has been followed for CSS
+ scss for variables and BEM shortcuts

## Author
Abhijit Nair - nairabhijit6@gmail.com