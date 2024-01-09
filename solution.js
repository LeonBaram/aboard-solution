const users = [
  { id: 1, name: 'John', email: 'john@test.com', department: 'IT' },
  { id: 2, name: 'Doe', email: 'Doe@test.com', department: 'Marketing' },
  { id: 3, name: 'Morgan', email: 'Morgan@test.com', department: 'IT' },
  { id: 4, name: 'Martha', email: 'Martha@test.com', department: 'Marketing' },
  { id: 5, name: 'Dave', email: 'Dave@test.com', department: 'Sales' },
  { id: 6, name: 'Oslo', email: 'Oslo@test.com', department: 'Sales' },
  { id: 7, name: 'Qiev', email: 'Qiev@test.com', department: 'Product' },
  { id: 8, name: 'Hanzel', email: 'Hanzel@test.com', department: 'Product' },
  { id: 9, name: 'Mats', email: 'Mats@test.com', department: 'Sales' },
  { id: 10, name: 'Yoshimura', email: 'Yoshimura@test.com', department: 'IT' }
]

const tasks = [
  { id: 1, department: 'IT', title: 'Develop company landing page' },
  { id: 2, department: 'IT', title: 'Develop company API' },
  { id: 3, department: 'Product', title: 'Call customers' },
  { id: 4, department: 'Sales', title: 'Sells more!' },
  { id: 5, department: 'IT', title: 'QA' },
]

/**
 * Imagine there are 2 tables of users and tasks.
 * As a User I want to know which user belongs to the task in the same department.
 * 
 * What you need todo:
 * 1. Create a function to map between task and its users.
 *    result:
 *    [
 *      {id: 1, department: 'IT', title: 'Develop company landing page', users: [{ id: 1, ...//omitted }, { id: 3, ...//omitted }] },
 *      ...//omitted
 *    ]
 * 2. Explain the time complexities of your code.
 * 3. Don't send your solution here.
 */

/**
 * returns an object where each key is a department, and each value is a list of users in that department
 *
 * Time complexity: O(u), where u is the number of users
 * Space complexity: O(u)
 *
 * Explanation: The function makes a single pass over the users array (O(u) time). Each user object is cloned exactly once (O(u) space).
 * */
function groupUsersByDepartment(users) {
  const departments = {};
  for (const user of users) {
    const dept = user.department;
    departments[dept] ??= [];

    const clone = structuredClone(user);
    departments[dept].push(clone);
  }
  return departments;
}

/**
 * returns an array where each entry is a task with an additional field "users"
 * the "users" field of each task is an array of users related to that task
 *
 * Time complexity: O(u + t), where u and t are the number of users and tasks respectively
 * Space complexity: O(u + t)
 *
 * Explanation: The function makes a single call to groupUsersByDepartment, which has space and time complexity of O(u). Then it makes a single pass over the tasks array (O(t) time), and clones each task object exactly once (O(t) space).
 * */
function usersByTask(users, tasks) {
  const departments = groupUsersByDepartment(users);

  return tasks.map((task) => {
    const dept = task.department;
    const deptUsers = departments[dept] ?? [];
    
    const clone = structuredClone(task);
    clone.users = deptUsers;
    return clone;
  });
}
