let x =55;
if (localStorage.getItem("login") === "true") {
    console.log("User is already logged in, redirecting...");
    window.location.href = `html/task_card.html`;
}else{
    window.location.href = 'html/homepage.html';
}