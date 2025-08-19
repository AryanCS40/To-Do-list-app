let add = document.querySelector("#add-btn");
let p = document.querySelector("p");
let input = document.querySelector("input");
let taskList = document.querySelector(".task-list");

// All tasks stored in an array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save task permanently
function savetask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks in UI
function showtask(){
    taskList.innerHTML = "";
    tasks.forEach((task,index) => {
        let li = document.createElement("li");
        li.innerHTML = `<span class = "${task.completed ? "completed" : ""}" >  ${task.text} </span>
        <button class = "complete" data-index = "${index}"> <i class="fa-solid fa-square-check"></i> </button> 
        <button class = "delete-btn" data-index = "${index}" > <i class="fa-solid fa-square-xmark"></i> </button>`
        taskList.appendChild(li);
    })

    // Delete task
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            let idx = e.target.getAttribute("data-index");
            tasks.splice(idx, 1);
            savetask();
            showtask();
        });
    });

    // complete task
    document.querySelectorAll(".complete").forEach(btn=>{
        btn.addEventListener("click", function(){
            let idx = this.getAttribute("data-index");
            console.log(idx);
            tasks[idx].completed = !tasks[idx].completed;
            savetask();
            showtask();
        })
    })
}

// Add task 
add.addEventListener('click',function(){
    if(input.value.trim()===""){
        p.textContent = "Enter any task";
        p.style.display = "initial";
    }
    else{
        p.style.display = "none";
        tasks.push({text: input.value.trim() , completed : false});
        savetask();
        input.value = "";
        showtask();
    }
})

// Calling show task function
showtask();

