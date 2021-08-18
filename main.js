const tasks = JSON.parse(localStorage.getItem('tasks')) || [];


const createTask = document.querySelector(".create-task_btn");

const check = document.querySelectorAll(".task__checkbox");
const deleteTask = document.querySelectorAll(".task__delete_btn");
const changeBtn = document.querySelectorAll(".text__change");

const main = document.querySelector(".main");


const createTask_btn = document.querySelector('.modal__save-task_btn')


const createElement = (tag, className, textContent) => {
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
function createTaskTag(title, text, checked) {
    let element = createElement('div', 'task');
    element.innerHTML = ` <div class="task__content">
    <h3 class="task__title">${title}</h3>
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
    if(checked === 1){
        const titleChecked = element.querySelector('.task__title');
        titleChecked.style.textDecoration = 'line-through';
    }
    const delete_btn = element.querySelector('.task__delete_btn');
    delete_btn.addEventListener('click', function(){
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
            
            // window.onclick = function (event) {
            //     if (event.target == deleteTaskModal) {
            //         closeModal(deleteTaskModal);
            //     }
            // }
      
    })
    return element;
}
createTask_btn.addEventListener('click', function(){

    const titleInput = document.querySelector('.modal__title-input');
    const textInput = document.querySelector('.modal__text');
    const createTaskModal = document.querySelector(".modal");

    const element = {
        title: '', 
        text: '',
        checked: 0
    }
    if (!titleInput.value || titleInput.value.trim().length === 0) {
        let error = document.querySelector('.modal__error');
        error.textContent = 'Вы не ввели заголовок';
        openModal(error);  
        return; 
    }
    else if (textInput.value === undefined) {
        text = '';
    }
    element.title = titleInput.value;
    element.text = textInput.value;
    tasks.push(element);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    main.innerHTML ='';
    renderTasks();
    closeModal(createTaskModal);
})
const renderTasks = () => {
    for (let i = 0; i < tasks.length; i++) {
        main.appendChild(createTaskTag(tasks[i].title, tasks[i].text, tasks[i].checked)); 
    }
}
renderTasks();































createTask.addEventListener('click', function () {
    const createTaskModal = document.querySelector(".modal");
    const modalClose = document.querySelector('.modal__close');
    const closeModal_btn = document.querySelector('.modal__close_btn');

    createTaskModal.style.visibility = 'visible';
    createTaskModal.style.opacity = 1;

    modalClose.onclick = function () {
        closeModal(createTaskModal);
    };
    closeModal_btn.onclick = function () {
        closeModal(createTaskModal);
    };
})
deleteTask.forEach(function (element) {
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
        // window.onclick = function (event) {
        //     if (event.target == deleteTaskModal) {
        //         closeModal(deleteTaskModal);
        //     }
        // }
    });
})
const closeModal = function (item) {
    item.style.visibility = 'hidden';
    item.style.opacity = 0;
};
const openModal = function (item) {
    item.style.visibility = 'visible';
    item.style.opacity = 1;
};
