### Mail.ru test task
*Typescript | webpack | "jasmine" | storybook*

Необходимо разработать компонент по данным макетам с использованием чистого `javascript (vanillaJS)` или `typescript`. Использование сторонних библиотек для реализации компонентов **запрещено**.

# Phone-validation web component

![](https://i.ibb.co/QH3K1Nj/screenshoot.png)

Компонент позволяет валидировать введенный пользователем номер телефона с маскировочной частью, длина которой может быть произвольной.
## Работа с номером
Валидация пользовательского телефона модет происходить *2-мя способами*:
1.  Корректный номер телефона (либо его маска) с помощью сеттера `setCorrectMask()` подается на "вход" компонента. По нажатию на клавишу `Enter`  компонент сравнивает значения, введеные пользователем с кореектным номером телефона с последующем уведомлением пользователя.
2. Геттер `getInputsValues()` позволяет получить данные введенные пользователем для последующего сравнения с корректным номером. Уведомление пользователя осузествляется путем высова функции `setCurrentState()`.

## Api
Для работы с методми компонента требуется использовать *следующий* интерфейс:

	interface Props {
		 * Маска инпута. Значения:
		 * "I" - одиночный инпут для ввода одной цифры
		 * "X" - серый блок с символом "X"
		 * "*" - серый блок с символом "●"
		 * <цифра> - серый блок с введенной цифрой
		 * <не цифра> - символ отображается "как есть"
		 mask: string;
	}
```
Пример маски: +7(985)0II-**-**
```
### Методы компонента

**- setMask()** - Задаем маску, по которой будет формироваться структура компонента в соответсвии с логикой, описанной в интерфейсе Props:
![](https://i.ibb.co/qMyCghJ/screenshoot.png)

**- getMask()** - Задаем корректный номер, с которым будут сравниваться значения, введенные пользователем:
![](https://i.ibb.co/wWbC8X3/screenshoot.png)

**- setCorrectMask()** - Получам текущую маску компонента.
![](https://i.ibb.co/kxV5YmT/screenshoot.png)

**- getCurrentState()** - Получам текущее состояние компонента:
![](https://i.ibb.co/PWjB0RX/screenshoot.png)

**- getInputsKol()** - Получам количество инпутов, доступных пользвателю:
![](https://i.ibb.co/vPpcfVQ/screenshoot.png)

**- getInputsValues()** - Получаем значния, введенные пользователями:
![](https://i.ibb.co/ygmS7R1/screenshoot.png)

## Макет
Для простомтра "макета" компонента выполните команду `npm run storybook`

## Доп. пункты
- Компонент написан на Typescript
- Компонент собирается с помощью Webpack
- Трансляцию в es5 осуществляет Typescript
- В качестве линтера используется ts-lint

*- Тесты, git-хуки, рабочая публикация в npm, тестирование скриншотами - не сделано.*