const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    if (window.innerWidth < 768) {
        container.classList.remove("right-panel-active");
    } else {
        container.classList.add("right-panel-active");
    }
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

async function signUp() {
    let userNameSignUp = document.getElementById("userNameSignUp").value;
    let userEmailSignUp = document.getElementById("userEmailSignUp").value;
    let userPassSignUp = document.getElementById("userPassSignUp").value;
    let userLastNameSignUp = document.getElementById("userLastNameSignUp").value;

    if (!userNameSignUp || !userEmailSignUp || !userPassSignUp) {
        alert("All fields are required.");
        return;
    }

    let userId = Math.floor(Math.random() * 10000);

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        "userId": userId,
        "userFirstName": userNameSignUp,
        "userSecondName": userLastNameSignUp,
        "userEmail": userEmailSignUp,
        "userPassword": userPassSignUp
    });

    try {
        let response = await fetch("http://localhost:3000/users", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.text();
        console.log(data);
        alert("Sign-up successful!");
    } catch (error) {
        console.error('Error:', error);
        alert("Sign-up failed. Please try again later.");
    }
}

document.getElementById("signUpButton").addEventListener("click", async () => {
    // await signUp();

});


async function signIn() {
    let userEmailSignIn = document.getElementById("userEmailSignIn").value;
    let userPassSignIn = document.getElementById("userPassSignIn").value;

    if (!userEmailSignIn || !userPassSignIn) {
        alert("Both fields are required.");
        return;
    }

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    try {
        let response = await fetch("http://localhost:3000/users", {
            method: "GET",
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();

        let user = data.find(user => user.userEmail === userEmailSignIn && user.userPassword === userPassSignIn);

        if (user) {
            console.log("Sign-in successful!");
            localStorage.setItem("login", "true");

            console.log("Local storage 'login' set to true.");
            // alert("Sign-in successful!");
            // window.location.href ="";
            window.location.href = `dashboard.html?userId=${user.userId}`;
            // Assuming user is the object containing user data
            localStorage.setItem("userId", user.userId.toString());

        } else {
            console.log("Invalid username or password.");
            alert("Invalid username or password.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Sign-in failed. Please try again later.");
    }
}

document.getElementById("signInButton").addEventListener("click", async () => {
    await signIn();
});
document.getElementById("goToSignIn").addEventListener("click", () => {
    document.getElementById("sign-in-container").style.position = "absolute";
})
document.getElementById("goToSignUp").addEventListener("click", () => {
    document.getElementById("sign-in-container").style.position = "relative";
})

// Function to toggle visibility of "Sign Up" and "Sign In" buttons based on window width
function toggleButtonsVisibility() {
    if (window.innerWidth > 768) {
        document.getElementById("goToSignUp").style.display = "none";
        document.getElementById("goToSignIn").style.display = "none";
    } else {
        document.getElementById("goToSignUp").style.display = "block";
        document.getElementById("goToSignIn").style.display = "block";
    }
}

// Initial toggle based on window width
toggleButtonsVisibility();

// Event listener for window resize to adjust button visibility
window.addEventListener("resize", toggleButtonsVisibility);
