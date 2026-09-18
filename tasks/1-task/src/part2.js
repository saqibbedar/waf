// command line info
console.log(`
 ————————————————————————————————————————————————————————————-
|                                                             |
| - Please read the part2.js file and uncomment it's parts,   |
| i.e., i, ii, etc., to see different executions.             |
|                                                             |
| - default execution happening through async/await method!   |
|                                                             |
 ————————————————————————————————————————————————————————————-
`);

/*======================================================================

  (i): Call these functions in the above order with the given delays and observe the execution order. Note the sequence in which messages appear

  - Uncomment following part to view the program flow, for quick view, you can checkout the output section at bottom just before start of new section.

========================================================================*/

// function register() {
//   setTimeout(() => console.log("register"), 2500);
// }

// function sendWelcomeMessage() {
//   setTimeout(() => console.log("welcome"), 3000);
// }

// function login() {
//   setTimeout(() => {
//     console.log("login");
//   }, 2000);
// }

// function fetchProfile() {
//   setTimeout(() => {
//     console.log("profile");
//   }, 4000);
// }
// function updateStatus() {
//   setTimeout(() => {
//     console.log("update");
//   }, 1500);
// }

// function logout() {
//   setTimeout(() => {
//     console.log("logout");
//   }, 3500);
// }

// register();
// sendWelcomeMessage();
// login();
// fetchProfile();
// updateStatus();
// logout();

/**
Output (invoke vs. sequence they appeared in the console):

    update
    login
    register
    welcome
    logout
    profile
*/





/*======================================================================

  (ii): Use callbacks to ensure the functions are executed in the specified order. Call them again with the same delays and verify the order.

  - Uncomment following part to view the program flow, for quick view, you can checkout the output section at bottom just before start of new section.

========================================================================*/

// function register_cb(cb) {
//   setTimeout(() => {
//     console.log("register cb");
//     cb();
//   }, 2500);
// }

// function sendWelcomeMessage_cb(cb) {
//   setTimeout(() => {
//     console.log("welcome cb");
//     cb();
//   }, 3000);
// }

// function login_cb(cb) {
//   setTimeout(() => {
//     console.log("login cb");
//     cb();
//   }, 2000);
// }

// function fetchProfile_cb(cb) {
//   setTimeout(() => {
//     console.log("profile cb");
//     cb();
//   }, 4000);
// }
// function updateStatus_cb(cb) {
//   setTimeout(() => {
//     console.log("update cb");
//     cb();
//   }, 1500);
// }

// function logout_cb(cb) {
//   setTimeout(() => {
//     console.log("logout cb");
//     cb();
//   }, 3500);
// }

// register_cb(() =>
//   sendWelcomeMessage_cb(() =>
//     login_cb(() =>
//       fetchProfile_cb(() =>
//         updateStatus_cb(() =>
//           logout_cb(() => console.log("All operations finished!")),
//         ),
//       ),
//     ),
//   ),
// );

/*
Output (using callback method):

    register cb
    welcome cb
    login cb
    profile cb
    update cb
    logout cb
    All operations finished!
*/




/*======================================================================

  (iii): Use Promises to achieve the same ordered execution as in part ii. Call the functions with the delays and confirm the sequence. 

  - Uncomment following part to view the program flow, for quick view, you can checkout the output section at bottom just before start of new section.

========================================================================*/

// function register(flag) {
//   const isTrue = flag;
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       isTrue ? res("Login resolved") : rej("login rejected");
//     }, 2500);
//   })
// }

// function sendWelcomeMessage(flag) {
//   const isTrue = flag;
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       isTrue ? res("Welcome resolved") : rej("Welcome rejected")
//     }, 3000);
//   })
// }

// function login(flag) {
//   const isTrue = flag;
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       isTrue ? res("login resolved") : rej("login rejected")
//     }, 2000);
//   })
// }

// function fetchProfile(flag) {
//   const isTrue = flag;
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       isTrue ? res("fetchProfile resolved") : rej("fetchProfile rejected")
//     }, 4000);
//   })
// }
// function updateStatus(flag) {
//   const isTrue = flag;
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       isTrue ? res("updateStatus resolved") : rej("updateStatus rejected")
//     }, 1500);
//   })
// }

// function logout(flag) {
//   const isTrue = flag;
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       isTrue ? res("logout resolved") : rej("logout rejected")
//     }, 3500);
//   })
// }

// register(true)
//   .then((res) => {
//     console.log(res);
//     return sendWelcomeMessage(true);
//   })
//   .then((res) => {
//     console.log(res);
//     return login(true);
//   })
//   .then((res) => {
//     console.log(res);
//     return fetchProfile(true);
//   })
//   .then((res) => {
//     console.log(res);
//     return updateStatus(true);
//   })
//   .then((res) => {
//     console.log(res);
//     return logout(true);
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err))
//   .finally(() => console.log("All operations finished!"));

/*
Output (using promises/chaining method):

    Login resolved
    Welcome resolved
    login resolved
    fetchProfile resolved
    updateStatus resolved
    logout resolved
    All operations finished!
*/




/*======================================================================

  (iii): Use async/await to accomplish the same as part ii or iii. Call the functions with the delays and verify the execution order.

========================================================================*/

function register(flag) {
  const isTrue = flag;
  return new Promise((res, rej) => {
    setTimeout(() => {
      isTrue ? res("Login resolved") : rej("login rejected");
    }, 2500);
  })
}

function sendWelcomeMessage(flag) {
  const isTrue = flag;
  return new Promise((res, rej) => {
    setTimeout(() => {
      isTrue ? res("Welcome resolved") : rej("Welcome rejected")
    }, 3000);
  })
}

function login(flag) {
  const isTrue = flag;
  return new Promise((res, rej) => {
    setTimeout(() => {
      isTrue ? res("login resolved") : rej("login rejected")
    }, 2000);
  })
}

function fetchProfile(flag) {
  const isTrue = flag;
  return new Promise((res, rej) => {
    setTimeout(() => {
      isTrue ? res("fetchProfile resolved") : rej("fetchProfile rejected")
    }, 4000);
  })
}
function updateStatus(flag) {
  const isTrue = flag;
  return new Promise((res, rej) => {
    setTimeout(() => {
      isTrue ? res("updateStatus resolved") : rej("updateStatus rejected")
    }, 1500);
  })
}

function logout(flag) {
  const isTrue = flag;
  return new Promise((res, rej) => {
    setTimeout(() => {
      isTrue ? res("logout resolved") : rej("logout rejected")
    }, 3500);
  })
}

const doAllTasks = async () => {
  try {
    const reg = await register(true);
    console.log(reg);

    const welcomeMsg = await sendWelcomeMessage(true);
    console.log(welcomeMsg);

    const login_ = await login(true);
    console.log(login_);

    const profile = await fetchProfile(true);
    console.log(profile);

    const update = await updateStatus(true);
    console.log(update);

    const logout_ = await logout(true);
    console.log(logout_);
    
  } catch (error) {
    console.error(error);
  } finally {
    console.log("All operations finished!");
  }
}

doAllTasks();