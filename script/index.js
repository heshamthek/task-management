// localStorage.setItem("login", "false");
if (localStorage.getItem("login") === "true") {
    console.log("User is already logged in, redirecting...");
    let userId = localStorage.getItem("userId")
    window.location.href = `html/dashboard.html?userId=${userId}`;
}else{
    window.location.href = 'html/homepage.html';
}