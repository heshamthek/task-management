// Toggle sidebar and main content visibility
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('collapsed');
    document.getElementById('mainContent').classList.toggle('collapsed');
});

const showTaskBtn = document.getElementById("btn-floating");
const maskTaskModal = document.querySelector(".modal-mask");
const taskModal = document.querySelector(".modal");
const closeTaskBtn = document.querySelector(".close-modal-btn");

showTaskBtn.addEventListener("click", () => {
    openTaskModal();
    document.getElementById("project-modal").style.visibility="hidden";
});

closeTaskBtn.addEventListener("click", () => {
    closeTaskModal();
});

maskTaskModal.addEventListener("click", () => {
    closeTaskModal();
});

function openTaskModal() {
    maskTaskModal.style.display = "block";
    taskModal.classList.add("active");
}

function closeTaskModal() {
    maskTaskModal.style.display = "none";
    taskModal.classList.remove("active");
}

// Project Modal functionality
const showProjectBtn = document.getElementById("newProjectBtn");
const maskProjectModal = document.querySelector(".project-modal-mask");
const projectModal = document.querySelector(".project-modal");
const closeProjectBtn = document.querySelector(".close-project-modal-btn");

showProjectBtn.addEventListener("click", () => {
   

    openProjectModal();
    
});

closeProjectBtn.addEventListener("click", () => {
    closeProjectModal();
});

maskProjectModal.addEventListener("click", () => {
    closeProjectModal();
});

function openProjectModal() {
    document.getElementById("project-modal").style.visibility="visible";
    maskProjectModal.style.display = "block";
    projectModal.classList.add("active");
}

function closeProjectModal() {
    maskProjectModal.style.display = "none";
    projectModal.classList.remove("active");
}
// -------------------------------------------------------------------------------
let globalProjectId;
// Fetch projects on page load
document.addEventListener("DOMContentLoaded", async () => {
    const userId = getUrlParameter('userId');
    console.log('User ID from URL:', userId);

    const headersList = {
        "Accept": "application/json",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    };

    const url = `http://localhost:3000/projects?userId=${userId}`;
    // window.location.href = url;

    try {   
        const response = await fetch(url, {
            method: "GET",
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const projects = await response.json(); // assuming response is JSON

        // Clear existing content
        document.getElementById("projec-list").innerHTML = '';

        // Append project titles to the project list
        projects.forEach(project => {
            const projectHtml = `
                <div class="project-content">
                    <p class="project-title" data-project-id="${project.projectId}">${project.projectTitle}</p> 
                    <p class="project-desc">${project.projectDesc}</p> 
                </div>`;
            document.getElementById("projec-list").innerHTML += projectHtml;
        });

        // Add click event listeners for project titles
        document.querySelectorAll(".project-content").forEach(element => {
            element.addEventListener("click", async (event) => {

                const projectId = event.target.getAttribute("data-project-id");
                const project = projects.find(p => p.projectId == projectId);
                globalProjectId = project.projectId;
                await getTasksByProjectId(project);
                document.getElementById("project-name").innerText = project.projectTitle;
                document.getElementById("project-desc").innerText = project.projectDesc;
            });
        });

        console.log('Data received:', projects);
    } catch (error) {
        console.error('Fetch projects error:', error);
    }
});

// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to fetch tasks by project ID
async function getTasksByProjectId(project) {
    try {
        const headersList = {
            "Accept": "application/json",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        };

        const tasksResponse = await fetch(`http://localhost:3000/tasks?projectId=${project.projectId}`, {
            method: "GET",
            headers: headersList
        });

        if (!tasksResponse.ok) {
            throw new Error(`HTTP error! Status: ${tasksResponse.status}`);
        }

        const tasksData = await tasksResponse.json(); // assuming tasks response is JSON
        let todoNum = 0;
        let progressNum = 0;
        let completedNum = 0;

        // Clear existing content based on task status
        document.getElementById("to-do").innerHTML = '';
        document.getElementById("progress").innerHTML = '';
        document.getElementById("completed").innerHTML = '';

        // Populate tasks for the corresponding status
        tasksData.forEach(task => {
            let statusColor = ''; // Variable to hold the background color based on status

            // Determine background color based on task status
            if (task.status === "progress") {
                statusColor = "rgba(77, 77, 240, 0.714)";
            } else if (task.status === "todo") {
                statusColor = "rgba(255, 255, 0, 0.752)";
            } else if (task.status === "completed") {
                statusColor = "rgba(0, 128, 0, 0.752)";
            }

            const taskHtml = `
                <div class="tasks"> 
                    <div class="card-head">
                        <p class="title">
                            ${task.taskTitle}
                        </p>
                        <div class="edit-del">
                            <span class="material-symbols-outlined delete" id="projec-list" onclick="deleteTask(${task.id})"> 
                                delete
                            </span>
                            <span class="material-symbols-outlined more" id="go-to-editpage"onclick="goToEditPage(${task.id})">
                                more_vert
                            </span>
                        </div>
                    </div>
                    <p class="desc">${task.taskDesc}</p>
                    <div class="status_data">
                        <p id="status-p" style="background-color: ${statusColor};">${task.status}</p>
                        <div>
                            <i class="fa-solid fa-calendar-days"></i>
                            <span>${task.deadLine}</span>
                        </div>
                    </div>
                </div>`;

            // Append taskHtml to respective status container
            if (task.status === "progress") {
                document.getElementById("progress").innerHTML += taskHtml;
                progressNum++;
                // document.getElementById("status-p").style.backgroundColor = " rgba(77, 77, 240, 0.714)";
            } else if (task.status === "todo") {
                document.getElementById("to-do").innerHTML += taskHtml;
                todoNum++;
                // document.getElementById("status-p").style.backgroundColor = "rgba(255, 255, 0, 0.752)";
            } else if (task.status === "completed") {
                document.getElementById("completed").innerHTML += taskHtml;
                completedNum++;
                // document.getElementById("status-p").style.backgroundColor = "rgba(255, 255, 0, 0.752);";
            }
        });


        // Update the task counts
        document.getElementById("to-do").insertAdjacentHTML('afterbegin', `<p>TODO <span>${todoNum}</span></p>`);
        document.getElementById("progress").insertAdjacentHTML('afterbegin', `<p>IN WORK <span>${progressNum}</span></p>`);
        document.getElementById("completed").insertAdjacentHTML('afterbegin', `<p>COMPLETED <span>${completedNum}</span></p>`);

        console.log('Tasks for Project ID:', project.projectId, tasksData);
    } catch (error) {
        console.error('Fetch tasks error:', error);
    }
}

// Function to delete a task by ID
async function deleteTask(taskId) {
    try {
        const headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        };

        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "DELETE",
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        console.log("Delete response:", data);

        
    } catch (error) {
        console.error('Delete task error:', error);
    }
}



function generateRandomId() {
    return Math.floor(Math.random() * 1000000);
}

async function addproject() {
    const userId = getUrlParameter('userId');
    const body = {
        userId: userId,
        projectId: generateRandomId(),
        projectTitle: document.getElementById("project-title").value,
        projectDesc: document.getElementById("project-description").value
    };

    try {
        const response = await fetch("http://localhost:3000/projects", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        window.location.replace("/index.html");
    } catch (error) {
        console.error("There was an error!", error);
    }
}

document.getElementById("add-project-btn").addEventListener("click", async () => {
    await addproject();
});

function getValue() {
    // Get the select element by its ID
    var selectElement = document.getElementById("mySelect");

    // Get the value of the selected option
    var selectedValue = selectElement.value;

    return selectedValue;
}
async function addNewTask() {
    // e.preventDefault();
    let taskId = generateRandomId().toString()
    let projectId = globalProjectId;
    let taskTitle = document.getElementById("task-title").value;
    let taskDesc = document.getElementById("task-description").value;
    let deadLine = (document.getElementById("task-deadLine").value).toString();
    let status = getValue();

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        "id": taskId,
        "projectId": projectId,
        "taskTitle": taskTitle,
        "taskDesc": taskDesc,
        "deadLine": deadLine,
        "status": status,
    });

    let response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    let tasks = await response.json();
    console.log(data);

}
document.getElementById("task-add-btn").addEventListener("click", async () => {

    console.log(globalProjectId);
    await addNewTask();
})



// ------logout button--------------------

    document.getElementById("logout-btn").addEventListener("click" , ()=>{
        window.location.href = "homepage.html";
        localStorage.setItem("login" , "false");
    })


function goToEditPage(taskid) {
    console.log(taskid);
    window.location.href = `edittask.html?taskId=${taskid}`;
}



document.addEventListener("DOMContentLoaded", function() {
    function filterTasks() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const taskCards = document.querySelectorAll('.tasks'); 

        taskCards.forEach(card => {
            const cardHead = card.querySelector('.card-head');
            const title = cardHead.querySelector('.title').innerText.toLowerCase();
            const desc = card.querySelector('.desc').innerText.toLowerCase();

            if (title.includes(searchInput) || desc.includes(searchInput)) {
                card.style.display = ''; 
            } else {
                card.style.display = 'none'; 
            }
        });
    }
    document.getElementById('btnNavbarSearch').addEventListener('click', filterTasks);

    document.getElementById('searchInput').addEventListener('input', filterTasks);
});
