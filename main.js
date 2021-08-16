const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const createTask = document.querySelector(".create-task_btn");

const check = document.querySelectorAll(".task__checkbox");
const deleteTask = document.querySelectorAll(".task__delete_btn");
const changeBtn = document.querySelectorAll(".text__change");

const main = document.querySelector(".main");

const closeModal = function (item) {
    item.style.visibility = 'hidden';
    item.style.opacity = 0;
};
createTask.addEventListener('click', function () {
    const createTaskModal = document.querySelector(".modal");
    const modalClose = document.querySelector('.modal__close');
    const closeModal_btn = document.querySelector('.modal__close_btn');
    const createTask_btn = document.querySelector('.modal__save-task_btn')

    createTaskModal.style.visibility = 'visible';
    createTaskModal.style.opacity = 1;

    modalClose.onclick = function () {
        closeModal(createTaskModal);
    };
    closeModal_btn.onclick = function () {
        closeModal(createTaskModal);
    };
    window.onclick = function (event) {
        if (event.target == createTaskModal) {
            closeModal(createTaskModal);
        }
    }
    createTask_btn.addEventListener('click', function () {
        const titleInput = document.querySelector('.modal__title-input');
        const textInput = document.querySelector('.modal__text');
        const element = {
            title: titleInput.value,
            text: textInput.value,
            checked: 0
        }
        if (!titleInput.value || titleInput.value.trim().length === 0) {
            console.log('lolkek');
            return; 
        }
        else if (textInput.value = undefined) {
            text = '';
        }
        tasks.push(element);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        titleInput.value = '';
        textInput.value = '';
        main.innerHTML = '';
        renderTasks();
    });
});
deleteTask.forEach(function (element, index) {
    element.addEventListener('click', function () {
        const deleteTaskModal = document.querySelector(".modal-delete");
        const modalClose_Btn = document.querySelector(".modal-delete__close_btn")
        const modalClose = document.querySelector(".modal__close__2");

        deleteTaskModal.style.visibility = 'visible';
        deleteTaskModal.style.opacity = 1;

        modalClose.onclick = function () {
            closeModal(deleteTaskModal);
        };
        modalClose_Btn.onclick = function () {
            closeModal(deleteTaskModal);
        };
        window.onclick = function (event) {
            if (event.target == deleteTaskModal) {
                closeModal(deleteTaskModal);
            }
        }
    });
});
const createElement = (tag, className, textContent = "") => {
    if (!tag) {
        alert("Внутреняя ошибка сервиса!");
        return;
    }
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}
function createNewTask(title, text, checked) {
    let element = createElement('div', 'task');
    let taskTitle = createElement('h3', 'task__title', title);
    if(checked == 1){
        taskTitle.style.textDecoration = 'line-through';  
    }
    element.innerHTML = ` <div class="task__content">
    ${taskTitle};
     <p class="task__text">
    ${text}
    </p>
    <div class="change">
     <img src="./assets/change.png" alt="" class="change__img">
     <p class="text__change">Изменить</p>
    </div>
    </div>
    <div class="task__input">
    <div class="task__checkbox">
     <img class="task__checkbox_img" src="./assets/check.png"></img>
    </div>
    <img class="task__delete_btn" src="./assets/delete__btn.png" alt="">
    </div>`;
    return element;
}
const renderTasks = () => {
    for (let i = 0; i < tasks.length - 1; i++) {
        main.innerHTML = '';
        main.prepend(createNewTask(tasks[i].title, tasks[i].text, tasks[i].checked)); 
    }
}
console.log(tasks);
renderTasks();




