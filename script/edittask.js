document.addEventListener("DOMContentLoaded", async () => {
    let id = getUrlParameter('taskId');

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    };
    
    let response = await fetch(`http://localhost:3000/tasks?id=${id}`, {
        method: "GET",
        headers: headersList
    });

    let taskData = await response.json();
    
    if (taskData && taskData.length > 0) {
        document.getElementById("task-title").value = taskData[0].taskTitle;
        document.getElementById("task-desc").value = taskData[0].taskDesc;
        document.getElementById("task-date").value = taskData[0].deadLine;
        document.getElementById("mySelect").value = taskData[0].status;
    }

    document.getElementById("edit-btn").addEventListener("click", async () => {
        await editTaskData(id);
        window.history.back();
    });
});

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function editTaskData(id) {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({
        "taskTitle": document.getElementById("task-title").value,
        "taskDesc": document.getElementById("task-desc").value,
        "deadLine": document.getElementById("task-date").value,
        "status": document.getElementById("mySelect").value
    });

    let response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        body: bodyContent,
        headers: headersList
    });

    let data = await response.text();
    console.log(data);
   
}
