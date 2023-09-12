 const weatherDescriptions = {
 	'clear sky': 'Ясное',
 	'few clouds': 'Небольшая облачность',
 	'scattered clouds': 'Рассеянные облака',
 	'broken clouds': 'Облачно с прояснениями',
 	'shower rain': 'Ливень',
 	'rain': 'Дождь',
 	'thunderstorm': 'Гроза',
 	'snow': 'Снег',
 	'mist': 'Туман',
 	'overcast clouds': 'Пасмурно'
 };

 // Функция для получения текущего времени
 function getCurrentTime() {
 	const now = new Date();
 	const hours = now.getHours().toString().padStart(2, '0');
 	const minutes = now.getMinutes().toString().padStart(2, '0');
 	const seconds = now.getSeconds().toString().padStart(2, '0');
 	return `${hours}:${minutes}:${seconds}`;
 }

 // Функция для получения текущего дня недели
 function getCurrentDay() {
 	const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
 	const now = new Date();
 	const dayOfWeek = daysOfWeek[now.getDay()];
 	return dayOfWeek;
 }

 // Функция для получения погоды с API OpenWeatherMap
 function getWeather() {
 	const apiKey = "271af29ee6255865991c078d467e2519";
 	const city = "Yerevan";
 	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

 	fetch(apiUrl)
 		.then((response) => response.json())
 		.then((data) => {
 			const temperature = data.main.temp;
 			const weatherDescriptionEnglish = data.weather[0].description.toLowerCase();
 			const weatherDescriptionRussian = weatherDescriptions[weatherDescriptionEnglish] ||
 				weatherDescriptionEnglish;

 			const precipitation = data.weather[0].main;
 			const humidity = data.main.humidity;
 			const windSpeed = data.wind.speed;
 			const precipitationProbability = data.clouds.all; // Вероятность осадков в процентах

 			const timeElement = document.getElementById('time');
 			const dayElement = document.getElementById('day');
 			const weatherElement = document.getElementById('weather');
 			const precipitationElement = document.getElementById('precipitation');
 			const humidityElement = document.getElementById('humidity');
 			const windSpeedElement = document.getElementById('wind-speed');

 			timeElement.textContent = `${getCurrentTime()}`;
 			dayElement.textContent = `${getCurrentDay()}`;
 			weatherElement.textContent = `${weatherDescriptionRussian} ${temperature}°C`;
 			precipitationElement.textContent = `Вероятность осадков: ${precipitationProbability}%`;
 			humidityElement.textContent = `Влажность: ${humidity}%`;
 			windSpeedElement.textContent = `Скорость ветра: ${windSpeed} м/с`;
 		})
 		.catch((error) => {
 			console.error("Произошла ошибка при запросе погоды:", error);
 		});
 }

 // Обновляем данные каждую секунду
 setInterval(() => {
 	getWeather();
 }, 1000);

 // Инициализация при загрузке страницы
 getWeather();

 let date = new Date();
 let year = date.getFullYear();
 let month = date.getMonth();

 const day = document.querySelector(".calendar-dates");

 const currdate = document.querySelector(".calendar-current-date");

 const prenexIcons = document.querySelectorAll(".calendar-navigation span");

 // Массив с названиями месяцев на русском
 const months = [
 	"Январь",
 	"Февраль",
 	"Март",
 	"Апрель",
 	"Май",
 	"Июнь",
 	"Июль",
 	"Август",
 	"Сентябрь",
 	"Октябрь",
 	"Ноябрь",
 	"Декабрь"
 ];

 // Функция для генерации календаря
 const manipulate = () => {
 	// Получаем первый день месяца
 	let dayone = new Date(year, month, 1).getDay();

 	// Получаем последний день месяца
 	let lastdate = new Date(year, month + 1, 0).getDate();

 	// Получаем день недели последнего дня месяца
 	let dayend = new Date(year, month, lastdate).getDay();

 	// Получаем последний день предыдущего месяца
 	let monthlastdate = new Date(year, month, 0).getDate();

 	// Переменная для хранения HTML-кода с календарем
 	let lit = "";

 	// Добавляем дни предыдущего месяца
 	for (let i = dayone; i > 0; i--) {
 		lit +=
 			`<li class="inactive">${monthlastdate - i + 1}</li>`;
 	}

 	// Добавляем дни текущего месяца
 	for (let i = 1; i <= lastdate; i++) {
 		// Проверяем, является ли текущая дата сегодняшней
 		let isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date()
 			.getFullYear() ? "active" : "";
 		lit += `<li class="${isToday}">${i}</li>`;
 	}

 	// Добавляем дни следующего месяца
 	for (let i = dayend; i < 6; i++) {
 		lit += `<li class="inactive">${i - dayend + 1}</li>`;
 	}

 	// Обновляем текст элемента текущей даты
 	// с отформатированным текущим месяцем и годом
 	currdate.innerText = `${months[month]} ${year}`;

 	// Обновляем HTML элемента с датами
 	// с сгенерированным календарем
 	day.innerHTML = lit;
 }

 manipulate();

 // Добавляем обработчик события клика для каждой иконки
 prenexIcons.forEach(icon => {
 	// Когда иконка кликается
 	icon.addEventListener("click", () => {
 		// Проверяем, является ли иконка "calendar-prev"
 		// или "calendar-next"
 		month = icon.id === "calendar-prev" ? month - 1 : month + 1;

 		// Проверяем, выходит ли месяц за пределы диапазона
 		if (month < 0 || month > 11) {
 			// Устанавливаем дату на первый день
 			// месяца с новым годом
 			date = new Date(year, month, new Date().getDate());

 			// Устанавливаем год на новый год
 			year = date.getFullYear();

 			// Устанавливаем месяц на новый месяц
 			month = date.getMonth();
 		} else {
 			// Устанавливаем дату на текущую дату
 			date = new Date();
 		}

 		// Вызываем функцию manipulate
 		// для обновления отображения календаря
 		manipulate();
 	});
 });
 // Добавляем обработчик события нажатия клавиш "влево" и "вправо"
 document.addEventListener("keydown", function (event) {
 	if (event.key === "ArrowLeft") {
 		// Если нажата клавиша "влево", перейти к предыдущему месяцу
 		month = month - 1;
 	} else if (event.key === "ArrowRight") {
 		// Если нажата клавиша "вправо", перейти к следующему месяцу
 		month = month + 1;
 	}

 	// Проверяем, выходит ли месяц за пределы диапазона
 	if (month < 0 || month > 11) {
 		// Устанавливаем дату на первый день
 		// месяца с новым годом
 		date = new Date(year, month, new Date().getDate());

 		// Устанавливаем год на новый год
 		year = date.getFullYear();

 		// Устанавливаем месяц на новый месяц
 		month = date.getMonth();
 	} else {
 		// Устанавливаем дату на текущую дату
 		date = new Date();
 	}

 	// Вызываем функцию manipulate
 	// для обновления отображения календаря
 	manipulate();
 });