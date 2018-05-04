/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { Login, Signup } from './auth-form'
export { default as Navbar } from './navbar'
export { default as User } from './user'
export { default as UserHome } from './user-home'
// export { default as Category } from './category'
export { default as AddCustomHabit } from './add-custom-habit'
export { default as Habits } from './habits'
export { default as ProgressTracker } from './progress-tracker'

