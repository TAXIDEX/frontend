const tg = window.Telegram.WebApp;

// Инициализация
tg.initDataOnStart = true;
tg.ready();

// Обработчик для кнопки "Заказать такси"
document.getElementById("create-order").addEventListener("click", () => {
  // Показываем форму для ввода данных заказа
  document.getElementById("order-form").style.display = "block";
});

// Обработчик для подтверждения заказа
document.getElementById("submit-order").addEventListener("click", () => {
  const pickupLocation = document.getElementById("pickup-location").value;
  const dropoffLocation = document.getElementById("dropoff-location").value;
  const price = document.getElementById("price").value;

  if (!pickupLocation || !dropoffLocation || !price) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  // Данные заказа
  const orderData = {
    passengerId: tg.initDataUnsafe.user.id,
    pickupLocation: pickupLocation,
    dropoffLocation: dropoffLocation,
    price: price,
  };

  // Отправляем данные на сервер
  fetch("https://<твой-реплит>.replit.dev/api/users/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => response.json())
    .then((data) => {
      tg.MainButton.text = "Заказ подтвержден";
      tg.MainButton.show();
      alert("Ваш заказ на такси принят!");
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при создании заказа.");
    });
});
