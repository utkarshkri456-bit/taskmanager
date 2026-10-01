# TaskFlow – React Task Manager

A responsive task management application built with React.js for the React.js learning project.

## Project Overview

TaskFlow allows users to create, edit, complete, delete, search, filter and sort tasks. Tasks are automatically saved in the browser's Local Storage, so data remains available after a page refresh.

## Objectives

- Understand React component-based architecture.
- Practice JSX and JavaScript expressions.
- Use functional components.
- Manage application state with `useState`.
- Perform side effects with `useEffect`.
- Build reusable components.
- Implement CRUD operations.
- Persist data with Local Storage.
- Create a responsive and accessible interface.
- Deploy a production React application.

## Features

- Add tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- Task categories
- Search tasks
- Filter by All / Active / Completed
- Sort by Newest / Oldest / A-Z / Active first
- Clear completed tasks
- Local Storage persistence
- Responsive design
- Animated task appearance

## Technologies

- React.js
- JavaScript ES6+
- HTML5
- CSS3
- Local Storage API
- Create React App

## Project Structure

```text
react-task-manager/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskInput.js
│   │   ├── TaskList.js
│   │   └── TaskItem.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Setup Instructions

### 1. Install Node.js

Download and install Node.js from the official Node.js website.

### 2. Open the project

Open a terminal in the project folder.

### 3. Install dependencies

```bash
npm install
```

### 4. Start development server

```bash
npm start
```

The application normally opens at:

```text
http://localhost:3000
```

### 5. Create production build

```bash
npm run build
```

## React Concepts Used

### Components

The application is divided into reusable functional components:

- `App` – main state and application logic
- `TaskInput` – task creation form
- `TaskList` – displays task collection
- `TaskItem` – individual task UI and editing

### JSX

JSX is used to describe the interface using JavaScript expressions.

Example:

```jsx
<h3>{task.text}</h3>
```

### Props

Data and callback functions are passed from parent to child components.

Example:

```jsx
<TaskItem
  task={task}
  onToggle={toggleTask}
  onDelete={deleteTask}
/>
```

### useState

`useState` manages:

- Tasks
- Search text
- Current filter
- Sort option
- Form input

### useEffect

Two effects are used:

1. Load tasks from Local Storage when the application starts.
2. Save the current task array whenever it changes.

### Event Handling

React event handlers are used for:

- Form submission
- Button clicks
- Input changes
- Checkbox changes
- Keyboard shortcuts

## CRUD Operations

### Create

A new task object is created and added to the task array.

### Read

Tasks are rendered with:

```jsx
tasks.map(...)
```

### Update

Tasks can be edited or marked as completed.

### Delete

A task is removed using `filter()`.

## Data Structure

Each task uses the following structure:

```js
{
  id: 123456789,
  text: "Complete React assignment",
  category: "College",
  completed: false,
  createdAt: "2026-10-01T12:00:00.000Z"
}
```

## Component Data Flow

```text
                    App
                     |
        +------------+------------+
        |            |            |
    TaskInput    TaskList      Controls
                     |
                 TaskItem
                     |
                 User Action
                     |
                 App State
                     |
                LocalStorage
```

## Local Storage

The task array is serialized using `JSON.stringify()`:

```js
localStorage.setItem(
  "react-task-manager-tasks",
  JSON.stringify(tasks)
);
```

It is restored using `JSON.parse()`:

```js
const savedTasks = localStorage.getItem(
  "react-task-manager-tasks"
);

setTasks(JSON.parse(savedTasks));
```

## Testing Evidence

| Test Case | Expected Result |
|---|---|
| Add valid task | Task appears in list |
| Add empty task | Task is not created |
| Complete task | Task receives completed state |
| Edit task | Task text changes |
| Delete task | Task disappears |
| Filter Active | Only incomplete tasks appear |
| Filter Completed | Only completed tasks appear |
| Search | Matching tasks appear |
| Sort A-Z | Tasks are alphabetically sorted |
| Refresh browser | Saved tasks remain |
| Clear completed | Completed tasks are removed |
| Mobile viewport | Layout adapts to screen |

## Deployment

### Netlify

1. Run `npm run build`.
2. Create a Netlify site.
3. Connect the GitHub repository.
4. Build command: `npm run build`.
5. Publish directory: `build`.

### Vercel

1. Import the GitHub repository.
2. Select the React project.
3. Use the default build configuration.
4. Deploy.

## Visual Documentation

Add screenshots to the `screenshots/` folder before final submission:

- `dashboard.png`
- `add-task.png`
- `edit-task.png`
- `filter-task.png`

Then add them to this README if required by your instructor.

## Future Improvements

- User authentication
- Cloud database
- Due dates and reminders
- Drag-and-drop task ordering
- Dark mode
- Priority levels
- Backend API
- Multi-device synchronization

## Learning Outcomes

After completing this project, the learner should understand:

- React fundamentals
- Functional components
- JSX
- Props
- State
- Hooks
- Event handling
- CRUD logic
- Local Storage
- Component architecture
- Responsive UI development
- React deployment

## Submission Checklist

- [x] React application
- [x] Functional components
- [x] JSX
- [x] useState
- [x] useEffect
- [x] CRUD operations
- [x] Filtering
- [x] Sorting
- [x] Local Storage
- [x] Reusable components
- [x] Responsive UI
- [x] README documentation
- [ ] Add your own screenshots
- [ ] Push to GitHub
- [ ] Deploy to Netlify/Vercel
