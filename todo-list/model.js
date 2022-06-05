let model = (() => {

    let storage;
    storage = []
    function initializeStorage() {
        let oldData
        try {
            oldData = JSON.parse(window.localStorage.getItem("todoTasks"));
        }
         catch (e) {
         }
        if (Array.isArray(oldData)) {
            storage = oldData;
        }else{
            storage = defaultValues();
        }
    }
    function updateLocalStorage(){
        let string = JSON.stringify(storage);
        window.localStorage.setItem("todoTasks",string);
    }
    function defaultValues() {
        return [
            {
                "title": "Todo Initialized",
                "description": "No tasks found in localStorage.",
                "group": "welcome",
                "dueDate": "2022-05-04",
                "priority": "high",
                "lastEdit": "01/05/2022 - 06:56:40",
                "index": 0
            },
            {
                "title": "Features",
                "description": "What is working: \n\n- Add new tasks.\n- Edit tasks.\n- Delete Tasks.\n\n- Save automatically\n- Local storage support.\n\n- Grouping tasks\n- Automatically remove empty groups.\n\n- Color bar according to task priority.\n- Red, high priority\n- Yellow, medium priority\n- Green, low priority (default)",
                "group": "welcome",
                "dueDate": "2022-05-04",
                "priority": "low",
                "lastEdit": "01/05/2022 - 16:48:05",
                "index": 1
            },
            {
                "title": "About",
                "description": "Designed and developed by Malta Khan.",
                "group": "welcome",
                "dueDate": "2022-05-04",
                "priority": "low",
                "lastEdit": "01/05/2022 - 06:56:40",
                "index": 0
            }
        ]
    }
    //returns name, number of tasks for each groups. 
    function getGroupNames() {
        const list = {
            "All tasks": 0,
            "Trash": 0,
            groups: {},
        }
        getAllTasks().forEach(task => {
            if (!task.deleted) {
                list["All tasks"] += 1;
                if (list.groups[task.group] == undefined) { list.groups[task.group] = 1 }
                else { list.groups[task.group] += 1 }
            } else {
                list["Trash"] += 1;
            }
        });

        return list;
    }

    function getTask(index) {
        return storage[index];
    }

    function getMultipleTasks(groupName) {
        let group = [];

        if (groupName == "All Tasks") {
            getAllTasks().forEach((task, index) => {
                if (!task.deleted) {
                    task.index = index;
                    group.push(task);
                }
            });
        } else if (groupName == "Trash") {
            getAllTasks().forEach((task, index) => {
                if (task.deleted) {
                    task.index = index;
                    group.push(task);
                }
            });
        } else {
            getAllTasks().forEach((task, index) => {
                if (task.group == groupName && !task.deleted) {
                    task.index = index;
                    group.push(task);
                }
            });
        }
        return group;
    }

    function getAllTasks() {
        return storage;
    }

    //make new task with default parameters and return its index 
    function addTask() {
        let task = {};
        task.title = "";
        task.description = "";
        task.group = "undefined";
        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 3); //default due date today + 3 days
        dueDate = [
            dueDate.getFullYear(),
            ('0' + (dueDate.getMonth() + 1)).slice(-2),
            ('0' + dueDate.getDate()).slice(-2)
        ].join('-');
        task.dueDate = dueDate;
        task.priority = "low";
        task.lastEdit = latestTime();
        task.deleted = false;
        storage.push(task);
        updateLocalStorage();
        return storage.length - 1
    }

    function editTask(index, newParameters) {
        let task = storage[index];
        let keys = Object.keys(newParameters)
        keys.forEach((key) => {
            task[key] = newParameters[key];
        })
        task.lastEdit = latestTime();
        updateLocalStorage();
    }

    function latestTime() {
        const t = new Date();
        const date = ('0' + t.getDate()).slice(-2);
        const month = ('0' + (t.getMonth() + 1)).slice(-2);
        const year = t.getFullYear();
        const hours = ('0' + t.getHours()).slice(-2);
        const minutes = ('0' + t.getMinutes()).slice(-2);
        const seconds = ('0' + t.getSeconds()).slice(-2);
        const time = `${date}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
        return time;
    }

    function trashTask(index) {
        storage[index]["deleted"] = true;
        updateLocalStorage();
    }

    function restoreTask(index) {
        storage[index]["deleted"] = false;
        updateLocalStorage();

    }

    function removeTask(index) {
        storage.splice(index, 1);
        updateLocalStorage();
    }


    return { getGroupNames, getTask, getMultipleTasks, addTask, editTask, trashTask, restoreTask, removeTask, initializeStorage }

})();