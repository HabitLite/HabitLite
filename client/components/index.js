/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { Login, Signup } from './AuthForm'
export { default as Navbar } from './Navbar'
export { default as User } from './User'
export { default as UserHome } from './UserHome'
export { default as UserSummary } from './UserSummary'
export { default as Categories } from './Categories'
export { default as Habits } from './Habits'
export { default as Progress } from './Progress'
export { default as Group } from './Group'
export { default as Personality } from './Personality'

