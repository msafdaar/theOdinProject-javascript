let controller = (() => {
    function showGroupsList() {
        let list = model.getGroupNames();
        let listDiv = view.groupNames(list);
        let listDest = document.querySelector("#groupNames")
        listDest.innerHTML = ""
        listDest.appendChild(listDiv);
    }

    function activateGroup(groupname) {
        //change header text
        document.querySelector(".activeGroup").textContent = groupname;

        //add class to active group in list
        let list = document.querySelectorAll(".groupNamesItem")
        list.forEach((item) => {
            let text = item.childNodes[0].textContent
            if (text == groupname) {
                item.classList.add("activeGroupNamesItem")
            } else {
                item.classList.remove("activeGroupNamesItem")
            }
        })
    }

    function showGroup(groupname) {
        document.querySelector("#dialogue").style.display = "none";
        activateGroup(groupname)
        let tasks = model.getMultipleTasks(groupname);
        let tasksDiv = view.multipleTasks(tasks, groupname);
        let tasksDestination = document.querySelector("#tasksList");
        tasksDestination.innerHTML = "";
        tasksDestination.appendChild(tasksDiv);
    }
    function showTask(index) {
        let nodeList = view.taskDetails(model.getTask(index), index);
        openDialogue(nodeList)
    }
    function addHandlers() {
        //add event handlers to dialogue
        let dialogueBg = document.querySelector("#dialogue");
        dialogueBg.onclick = closeDialouge;

        let newTaskButton = document.querySelector("#newTaskButton");
        newTaskButton.onclick = newTask;

        let selectGroupButton = document.querySelector("#selectGroupButton");
        selectGroupButton.onclick = () => { openDialogue(view.groupNames(model.getGroupNames())) };


        let content = document.querySelector("#dialogue-content")
        content.onclick = (event) => { event.stopPropagation() }
    }
    function newTask() {
        showTask(model.addTask())
    }
    function openDialogue(nodeList) {
        let dialogue = document.querySelector("#dialogue");
        dialogue.style.display = "flex"
        let content = document.querySelector("#dialogue-content")
        content.innerHTML = ""
        content.appendChild(nodeList)
    }
    function closeDialouge() {
        document.querySelector("#dialogue").style.display = "none";
        let groupName = document.querySelector(".activeGroup").textContent;
        showGroup(groupName);
        showGroupsList()
        activateGroup(groupName)
    }

    function startTodo() {
        addHandlers()
        model.initializeStorage();
        showGroupsList()
        showGroup("All Tasks")
    }

    function editTask() {
        //update task in model
        let taskIndex = event.target.dataset.taskindex
        let changedKey = event.target.dataset.inputKey
        let changedValue = event.target.value;
        if (changedKey == "group" && (changedValue == "" || changedValue == "Trash" || changedValue == "All Tasks")) {
            changedValue = "undefined"
        }
        model.editTask(taskIndex, { [changedKey]: changedValue })
    }

    function moveTask(index, where) {
        if (where == 'trash') {
            model.trashTask(index)
        } else if (where == 'restore') {
            model.restoreTask(index);
        } else if (where == 'remove') {
            model.removeTask(index)
        }
        closeDialouge();
    }

    return { showGroup, showTask, startTodo, editTask, moveTask, closeDialouge }
})();

controller.startTodo();