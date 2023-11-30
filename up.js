//импорт инициализированного объекта firebase
import { app } from "./app.js";
//импорт функций авторизации
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

//объект кнопки "Sign up"
let submit_btn = document.getElementById("form-submit");
//поле ввода пароля
let password = document.getElementById("password");
//объект сообщения
let msg = document.getElementsByClassName("msg")[0];

//функция регистрации нового пользователя
function regUser(email, password) {
    createUserWithEmailAndPassword(getAuth(app), email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        msg.textContent = "Регистрация прошла успешно";
        msg.classList.add("msg-success");
        msg.classList.remove("hide", "msg-error");

        setTimeout(() => {
            window.location.replace("index_in.html");
        }, 2000);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        msg.textContent = "Ошибка: " + errorCode;
        msg.classList.add("msg-error");
        msg.classList.remove("hide", "msg-success");
    })
};

//обработчик события нажатия на кнопку "Sign up"
submit_btn.addEventListener("click", () => {
    let email = document.getElementById("email").value;
    let pass = password.value;
    let user_name = document.getElementById("name").value;
    let contact_number = document.getElementById("number").value;
    
    submit_btn.childNodes[1].classList.add("display-hide");

    if (email == "" || pass == "" || user_name == "" || contact_number == "") {
        msg.textContent = "Не все поля заполнены";
        msg.classList.add("msg-error");
        msg.classList.remove("hide", "msg-success");
    }
    else {
        regUser(email, pass);
    }

    submit_btn.childNodes[1].classList.remove("display-hide");
});