
let but = document.querySelector(".add");
let taskMenu = document.querySelector(".task");
let taskArr = window.localStorage.getItem("Tasks") || [];
let taskCount = window.localStorage.getItem("C") || 0;
let input = document.querySelector(".input");
let newArr = []
window.onload = function () {
    read(taskArr);

}

but.onclick = function (e) {
    if (input.value === "") {
        e.preventDefault();
        input.value = "  Please enter a valid task";

        setTimeout(function () {
            input.value = ""
        }, 2000);
    }
    else {
        newArr = addTask(input, taskArr);
        window.localStorage.setItem("Tasks", JSON.stringify(newArr));

        window.localStorage.setItem("C", taskCount);
    }
}
document.addEventListener("click", function (e) {
    if (e.target.className === "del") {
        let tempid = e.target.parentNode.id;
        e.target.parentNode.remove();
        window.localStorage.setItem("C", taskCount)

        window.localStorage.setItem("Tasks", JSON.stringify(remove(window.localStorage.getItem("Tasks"), tempid)));

    }
})


function addTask(input, taskArr) {
    taskCount++;
    let mainText = document.createTextNode(input.value);
    let divText = document.createElement("div");
    let subTask = document.createElement("div");
    let delBut = document.createElement("button");
    subTask.id = `${taskCount}-id`
    delBut.id = `${taskCount}-id`
    divText.className = "tasks"
    delBut.className = "del";
    delBut.innerHTML = "Delete";
    subTask.className = "sub";

    subTask.appendChild(divText);

    subTask.appendChild(mainText);
    divText.appendChild(mainText)

    taskMenu.appendChild(subTask);

    subTask.appendChild(delBut);
    delBut.style.cssText = "    background-color:orangered;border:none; border-radius: 10px;padding:10px 20px;color:white;font-weight: bold;"
    subTask.style.cssText = "background-color:white; display:flex; justify-content:space-between; margin:10px; border-radius:10px; padding:10px; "
    divText.style.cssText = "margin-top:10px; margin-left:10px;"
    input.value = "";
    TaskValues = new Object();
    TaskValues.id = subTask.id;
    TaskValues.name = divText.innerHTML;
    taskArr.push(TaskValues)
    window.localStorage.setItem("C", taskCount)
    return taskArr;
}
function read(newArr) {
    if (newArr === "") {
        return;
    }
    else {
        taskArr = JSON.parse(newArr);


        for (let i = 0; i < taskArr.length; i++) {
            console.log(taskArr[i].name);
            console.log(taskArr[i].id)
            let mainText = document.createTextNode(taskArr[i].name);
            let divText = document.createElement("div");
            let subTask = document.createElement("div");
            let delBut = document.createElement("button");

            subTask.id = taskArr[i].id;
            delBut.id = taskArr[i].id
            divText.className = "tasks"
            delBut.className = "del";
            delBut.innerHTML = "Delete";
            subTask.className = "sub";

            subTask.appendChild(divText);

            subTask.appendChild(mainText);
            divText.appendChild(mainText)
            subTask.appendChild(delBut);
            delBut.style.cssText = "    background-color:orangered;border:none; border-radius: 10px;padding:10px 20px;color:white;font-weight: bold;"
            subTask.style.cssText = "background-color:white; display:flex; justify-content:space-between; margin:10px; border-radius:10px; padding:10px; "
            divText.style.cssText = "margin-top:10px; margin-left:10px;"
            taskMenu.appendChild(subTask);
        }
    }


}
function remove(taskArr, id) {
    let newAr = JSON.parse(taskArr);

    for (let i = 0; i < newAr.length; i++) {
        if (newAr[i].id === id) {
            console.log(newAr[i])
            delete newAr[i];
        }
    }
    let newA = newAr.filter(function (e) {
        return e !== null
    })
    return newA;

}