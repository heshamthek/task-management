 // Toggle sidebar and main content visibility
 document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('collapsed');
    document.getElementById('mainContent').classList.toggle('collapsed');
});

// Task Modal functionality
const showTaskBtn = document.getElementById("btn-floating");
const maskTaskModal = document.querySelector(".modal-mask");
const taskModal = document.querySelector(".modal");
const closeTaskBtn = document.querySelector(".close-modal-btn");

showTaskBtn.addEventListener("click", () => {
    openTaskModal();
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
    maskProjectModal.style.display = "block";
    projectModal.classList.add("active");
}

function closeProjectModal() {
    maskProjectModal.style.display = "none";
    projectModal.classList.remove("active");
}
// -------------------------------------------------------------------------------
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener("DOMContentLoaded", async () => {
    // Get userId from URL
    const userId = getUrlParameter('userId');
    console.log('User ID from URL:', userId);

    // Prepare headers for fetch request
    const headersList = {
        "Accept": "application/json",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    };

    // Construct the URL for the fetch request to get projects
    const url = `http://localhost:3000/projects?userId=${userId}`;

    // Perform the fetch request to get projects
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const projects = await response.json(); // assuming response is JSON
        let projectList = document.getElementById("projec-list");

        // Clear existing content in case of re-fetching
        projectList.innerHTML = '';

        // Append project titles to the project list
        projects.forEach(project => {
            let projectTitle = document.createElement('p');
            projectTitle.textContent = project.projectTitle;
            projectTitle.classList.add("project-title"); // add class for styling and event binding
            //projectTitle.dataset.projectId = project.projectId; // store projectId as a data attribute

            // Add click event listener to fetch tasks for this project
            projectTitle.addEventListener("click", async ()=>{
                await getTaskByProjectId(project);
            });

            projectList.appendChild(projectTitle);
        });

        console.log('Data received:', projects);
    } catch (error) {
        console.error('Fetch projects error:', error);
    }
});
async function getTaskByProjectId (project) {
    try {
        let headersList = {
            "Accept": "*/*",
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
        tasksData.forEach(task=>{
            if(task.status = "progress"){
                document.getElementById("progress").innerHTML="";
                document.getElementById("progress").innerHTML+=` 
                  <p>IN WORK <span>5</span></p>
                <div class="tasks">
                    <div>
                        <p class="title">
                          ${task.taskTitle}
                        </p>
                        <span class="material-symbols-outlined" id="projec-list"> 
                            delete
                            </span>
                            <span class="material-symbols-outlined" >
                                more_vert
                                </span>
                        <p class="desc">
                           ${task.taskDesc}
                        </p>
                        <div class="status_data">
                            <p>${task.status}</p>
                            <div>

                                <i class="fa-solid fa-calendar-days"></i>
                                  <span>${task.deadLine}</span>
                            </div>
                        </div>
                    </div>
                </div>`
            } if(task.status = "todo"){
                document.getElementById("to-do").innerHTML="";
                document.getElementById("to-do").innerHTML+=` 
                  <p>To Do <span>5</span></p>
                <div class="tasks">
                    <div>
                        <p class="title">
                          ${task.taskTitle}
                        </p>
                        <span class="material-symbols-outlined" id="projec-list"> 
                            delete
                            </span>
                            <span class="material-symbols-outlined" >
                                more_vert
                                </span>
                        <p class="desc">
                           ${task.taskDesc}
                        </p>
                        <div class="status_data">
                            <p>${task.status}</p>
                            <div>

                                <i class="fa-solid fa-calendar-days"></i>
                                  <span>${task.deadLine}</span>
                            </div>
                        </div>
                    </div>
                </div>`
            } if(task.status = "completed"){
                document.getElementById("completed").innerHTML="";
                document.getElementById("completed").innerHTML+=` 
                  <p>COMPLETED <span>5</span></p>
                <div class="tasks">
                    <div>
                        <p class="title">
                          ${task.taskTitle}
                        </p>
                        <span class="material-symbols-outlined" id="projec-list"> 
                            delete
                            </span>
                            <span class="material-symbols-outlined" >
                                more_vert
                                </span>
                        <p class="desc">
                           ${task.taskDesc}
                        </p>
                        <div class="status_data">
                            <p>${task.status}</p>
                            <div>

                                <i class="fa-solid fa-calendar-days"></i>
                                <span>${task.deadLine}</span>
                            </div>
                        </div>
                    </div>
                </div>`
            } 
        })
        console.log('Tasks for Project ID:', project.projectId, tasksData);
    } catch (error) {
        console.error('Fetch tasks error:', error);
    }
}




















