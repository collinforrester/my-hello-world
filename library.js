/////////////////////////////
// general helpers.        //
/////////////////////////////

function fillListWithItems(elementToClone, parentElement, jsonArray, skipArr) {
  for (const [key, value] of Object.entries(json)) {
    clonedElement.querySelector(`[avant-id="${key}"]`).value = value;
  }

  // Append the cloned element to the DOM.
  document.body.appendChild(clonedElement);
}

function fillHtmlItem(element, skipArr) {
  for (const [key, value] of Object.entries(json)) {
    element.querySelector(`[avant-id="${key}"]`).value = value;
  }
  return element;
}

function cloneAndFill(elementToClone, parentElement, jsonItems, jsonAttributesToSkip) {
  // Iterate over the json items
  for (const jsonItem of jsonItems) {
    // Clone the element
    const clone = elementToClone.cloneNode(true);

    // Iterate over the json item properties
    Object.entries(jsonItem).forEach(function([key, value]){
      // Check if the key is in the skip list
      if (jsonAttributesToSkip.indexOf(key) > -1) {
        continue;
      }

      // Get the HTML element with the avant-id attribute set to the key
      // const htmlElement = clone.querySelector(`[avant-id="${key}"]`);
      try {
        clone.querySelector(`[avant-id="${key}"]`).value = value;
      } catch(e) {
        console.log(`Unable to find the selector [avant-id="${key}"], skipping for now.`);
      }
    })

    // Append the clone to the parent element
    parentElement.appendChild(clone);
  }
}


function logout() {
  console.log('clearing old logins.');
  localStorage.removeItem('AuthToken');
  // window.location.href = '/login';
}

function checkIfUserIsLoggedIn() {
  var hasToken = xano.hasAuthToken();
  var loggedIn = true;
  if (!hasToken) loggedIn = false;
  xano.get('/auth/me').then(function () {
    return loggedIn;
  }, function (error) {
    loggedIn = false;
    return loggedIn;
  }).then(function(loggedIn) {
    if(loggedIn) {
      console.log('It appears the user is logged in... leaving them alone.');
    } else {
      if (window.location.pathname !== '/login') {
        console.log('It appears the user is not logged in. redirecting to /login');
        window.location.href = '/login';
      }
    }
  });
}

/////////////////////////////
// parent  section.        //
/////////////////////////////

function onAddChildPageLoad() {
  document.querySelector('#add-child').addEventListener('click', function (e) {
    e.preventDefault();
    var access_code = document.getElementById('student-access-code').value;
    xano.post('/students/add_to_family', {
      "access_code": access_code
    }).then(function (response) {
      window.location.href = '/student/my-children';
    });
  });
}

/////////////////////////////
// super admin section.    //
/////////////////////////////

function onAddUserPageLoad() {
  // write my some javascript code that detects a click on #create-user, gets the values from #first-name, #last-name, #employee-id, #email, #role dropdown, and #send-email checkbox and post the values using the xano sdk
  const createUserButton = document.getElementById("create-user");
  var redirectTo = '/avant/admin/users';

  createUserButton.addEventListener("click", (event) => {
    // Get the values from the form fields.
    // these IDs need udpated to match how they're actually selected.
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const employeeId = document.getElementById("employee-id").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const sendEmail = document.getElementById("send-email").checked;

    // Create a new Xano user object.
    const user = {
      firstName,
      lastName,
      employeeId,
      email,
      role,
      sendEmail,
    };

    // Post the user object to Xano.
    xano.post("/users", user, (err, user) => {
      if (err) {
        console.error('There was an error creating the user', err);
      } else {
        console.log("User created successfully!");
        window.location.href = redirectTo;
      }
    });
  });
}

function onAdminUserListPageLoad() {

}

/////////////////////////////
// Add them to the window  //
/////////////////////////////

window.avant = {
  logout: logout,
  checkIfUserIsLoggedIn: checkIfUserIsLoggedIn,
  fillHtml: fillHtml,
  cloneAndFill: cloneAndFill,
  onAddChildPageLoad: onAddChildPageLoad,
  onAddUserPageLoad: onAddUserPageLoad,
  onAdminUserListPageLoad: onAdminUserListPageLoad
};