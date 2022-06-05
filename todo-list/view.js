let view = (() => {

    function groupNames(object) {
        let groupNamesDiv = document.createDocumentFragment();
        let head = { "All Tasks": object["All tasks"] };
        let middle = object.groups;
        let foot = { "Trash": object["Trash"] };
        groupNamesDiv.appendChild(groupNamesSection(head))
        groupNamesDiv.appendChild(groupNamesSection(middle))
        groupNamesDiv.appendChild(groupNamesSection(foot))
        return groupNamesDiv;
    }

    //helper for groupnames
    function groupNamesSection(list) {
        let output = document.createElement("div");
        output.classList.add("groupNamesSection");

        Object.keys(list).forEach(key => {
            output.appendChild(groupNamesItem(key, list[key]))
        });
        return output;
    }
    //helper for groupnames
    function groupNamesItem(key, value) {
        let output = document.createElement("div");
        output.classList.add("groupNamesItem");
        output.dataset.groupname = key;
        output.onclick = (event) => { controller.showGroup(event.currentTarget.dataset.groupname) };
        let name = document.createElement("div");
        name.classList.add("groupNamesItemName")
        name.textContent = key;

        let number = document.createElement("div");
        number.classList.add("groupNamesItemNumber")
        number.textContent = value;

        output.appendChild(name);
        output.appendChild(number);
        return output;
    }

    function multipleTasks(array) {
        if (array.length == 0) {
            let emptyDiv = document.createElement("div")
            emptyDiv.textContent = "Looks like this group does not contain any tasks."
            emptyDiv.classList.add("emptyGroup")
            return emptyDiv;
        }
        let output = document.createDocumentFragment();
        array.forEach((task) => {
            let summary = document.createElement("div");
            summary.classList.add("taskSummary")
            summary.dataset.taskindex = task.index;
            summary.appendChild(taskSummary(task))
            summary.onclick = (event) => { controller.showTask(event.currentTarget.dataset.taskindex) }
            output.appendChild(summary);
        })
        return output;
    }
    //helper for multipletasks. used to load all tasks in group
    function taskSummary(object) {
        let output = document.createDocumentFragment();

        let priority = document.createElement("div");
        priority.classList.add(`priority`)
        priority.classList.add(`priority${object.priority}`)

        let lastEdit = document.createElement("div");
        lastEdit.textContent = object.lastEdit;
        lastEdit.classList.add("tasklastEdit");

        let title = document.createElement("div");
        title.textContent = object.title.slice(0, 25);
        if (object.title.length > 25) {
            title.textContent += "..."
        };
        title.classList.add("taskTitle");

        let description = document.createElement("div");
        description.textContent = object.description.slice(0, 100);
        if (object.description.length > 100) {
            description.textContent += "..."
        }
        description.classList.add("taskDescription");

        output.appendChild(priority);
        output.appendChild(title);
        output.appendChild(description);
        output.appendChild(lastEdit);
        return output;
    }

    function taskDetails(task, index) { //index will be used to add data attributes
        let titleInput = document.createElement("input");
        titleInput.classList.add('titleInput');
        titleInput.dataset.taskindex = index;
        titleInput.dataset.inputKey = "title";
        titleInput.placeholder = "Title"
        titleInput.value = task.title;
        titleInput.addEventListener("input", controller.editTask);

        let descriptionInput = document.createElement("textarea");
        descriptionInput.classList.add('descriptionInput');
        descriptionInput.dataset.taskindex = index;
        descriptionInput.dataset.inputKey = "description";
        descriptionInput.placeholder = "Description"
        descriptionInput.value = task.description;
        descriptionInput.addEventListener("input", controller.editTask);

        let groupInput = document.createElement("input")
        groupInput.dataset.taskindex = index;
        groupInput.dataset.inputKey = "group";
        groupInput.value = task.group;
        groupInput.addEventListener("input", controller.editTask);
        let groupLabel = document.createElement("label");
        groupLabel.classList.add('labelAndInput');
        groupLabel.textContent = "Group"
        groupLabel.appendChild(groupInput);

        let priorityInput = document.createElement("select")
        priorityInput.dataset.taskindex = index;
        priorityInput.dataset.inputKey = "priority";
        priorityInput.innerHTML = `
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>`
        priorityInput.value = task.priority;
        priorityInput.addEventListener("input", controller.editTask);
        let priorityLabel = document.createElement("label");
        priorityLabel.classList.add('labelAndInput');
        priorityLabel.textContent = "Priority"
        priorityLabel.appendChild(priorityInput)

        let dueDateInput = document.createElement("input")
        dueDateInput.dataset.taskindex = index;
        dueDateInput.dataset.inputKey = "dueDate";
        dueDateInput.type = "date";
        dueDateInput.value = task.dueDate;
        dueDateInput.addEventListener("input", controller.editTask);
        let dueDateLabel = document.createElement("label");
        dueDateLabel.classList.add('labelAndInput');
        dueDateLabel.textContent = "Due Date"
        dueDateLabel.appendChild(dueDateInput)

        let inputGroup = document.createElement("div");
        inputGroup.classList.add("inputGroup")
        inputGroup.appendChild(groupLabel)
        inputGroup.appendChild(priorityLabel)
        inputGroup.appendChild(dueDateLabel)


        let lastEdit = document.createElement("div");
        lastEdit.classList.add("lastEditedExtended")
        lastEdit.textContent = `Last edited on ${task.lastEdit}`;

        let deleteButton = document.createElement("button");
        deleteButton.dataset.taskindex = index;
        deleteButton.textContent = "Delete Permanently";
        deleteButton.addEventListener("click", () => { controller.moveTask(index, "remove") });

        let trashButton = document.createElement("button");
        trashButton.dataset.taskindex = index;
        trashButton.textContent = "Move to Trash"
        trashButton.addEventListener("click", () => { controller.moveTask(index, "trash") });

        let restoreButton = document.createElement("button");
        restoreButton.dataset.taskindex = index;
        restoreButton.textContent = "Restore"
        restoreButton.addEventListener("click", () => { controller.moveTask(index, "restore") });

        let closeButton = document.createElement("button");
        closeButton.dataset.taskindex = index;
        closeButton.textContent = "Close"
        closeButton.addEventListener("click", () => { controller.closeDialouge() });

        let buttonsGroup = document.createElement("div");
        buttonsGroup.classList.add("buttonsGroup")

        if (!task.deleted) {
            buttonsGroup.appendChild(trashButton)
        } else {
            buttonsGroup.appendChild(restoreButton);
            buttonsGroup.appendChild(deleteButton);
        }
        buttonsGroup.appendChild(closeButton)


        let fragment = document.createDocumentFragment();
        fragment.appendChild(titleInput)
        fragment.appendChild(descriptionInput)
        fragment.appendChild(inputGroup)
        fragment.appendChild(buttonsGroup)
        fragment.appendChild(lastEdit)

        return fragment
    }

    return { groupNames, multipleTasks, taskDetails }

})();

