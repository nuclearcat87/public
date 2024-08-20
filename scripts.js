document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#registrationForm");
    const loginInput = document.querySelector("#login");
    const messageBox = document.querySelector("#message");

    // Существующие логины
    const existingLogins = ["user1", "admin", "test"];

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        const login = loginInput.value.trim(); // Получаем значение логина, удаляя лишние пробелы

        // Проверка на пустое значение
        if (!login) {
            messageBox.textContent = "Введите логин.";
            messageBox.style.color = "red";
            return;
        }

        // Эмулируем запрос к серверу
        fakeFetchCheckLogin(login)
            .then(data => {
                if (data.exists) {
                    messageBox.textContent = "Логин уже существует!";
                    messageBox.style.color = "red";
                } else {
                    messageBox.textContent = "Логин доступен!";
                    messageBox.style.color = "green";
                }
            })
            .catch(error => {
                console.error("Ошибка:", error);
                messageBox.textContent = "Произошла ошибка при проверке логина. Попробуйте снова.";
                messageBox.style.color = "red";
            });
    });

    // Функция, эмулирующая серверный запрос с использованием fetch
    function fakeFetchCheckLogin(login) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Проверяем, есть ли логин в массиве существующих логинов
                const exists = existingLogins.includes(login);
                resolve({ exists });
            }, 1000); // Задержка 1 секунда для эмуляции запроса
        });
    }
});