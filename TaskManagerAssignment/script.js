const taskInput = document.getElementById('taskInput');
const addTask = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const data=[];
addTask.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '' && !data.includes(taskText)) {
        data.push(taskText);
        // Create table row and cells
        const tr = document.createElement('tr');
        tr.classList.add('task');

        const taskCell = document.createElement('td');
        taskCell.textContent = taskText;

        const checkBoxCell = document.createElement('td');
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.classList.add('checkbox');
        checkBox.addEventListener('change', () => {
            tr.classList.toggle('completed'); // Mark row as completed
        });
        checkBoxCell.appendChild(checkBox);

        const deleteBtnCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            data.splice(data.indexOf(taskText),1);
            tr.remove(); // Remove task
        });
        deleteBtnCell.appendChild(deleteBtn);

        // Append cells to row
        tr.appendChild(taskCell);
        tr.appendChild(checkBoxCell);
        tr.appendChild(deleteBtnCell);

        // Append row to the task list
        taskList.appendChild(tr);

        // Clear input field
        taskInput.value = '';
    }
    else{
        alert("Cant insert because it already exists");
    }
});
