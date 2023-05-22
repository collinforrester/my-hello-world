/////////////////////////////
// general helpers.        //
/////////////////////////////

function fillHtml(clonedElement, parentElement, json) {
    for (const [key, value] of Object.entries(json)) {
        clonedElement.querySelector(`[avant-id="${key}"]`).value = value;
    }

    // Append the cloned element to the DOM.
    document.body.appendChild(clonedElement);
}

function logout() {
    localStorage.removeItem('AuthToken');
    window.location.href = '/login';
}

/////////////////////////////
// parent  section.        //
/////////////////////////////

function onAddChildPageLoad() {
    document.querySelector('#add-child').addEventListener('click',function(e){
        e.preventDefault();
        var access_code = document.getElementById('student-access-code').value;
        xano.post('/students/add_to_family',{
            "access_code": access_code
        }).then(function(response){
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
    fillHtml: fillHtml,
    onAddChildPageLoad: onAddChildPageLoad,
    onAddUserPageLoad: onAddUserPageLoad,
    onAdminUserListPageLoad: onAdminUserListPageLoad
};