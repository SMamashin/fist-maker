# Fist Maker
<img src="./design/banner.jpg"  alt="error" title="cover-project">
FistMaker - мой первый немного полезный для окружающих проект! 🥶

Этот проект представляет из себя 2 бота в ВКонтакте и Telegram, функционал данных ботов содержит в себе: **обрезать получаемое изображение от пользователя под 256x256, затем нарисовать на этом всём нужную обводку, 
это пригодится для тех, кто играет в SA:MP, ведь fist.png часто хочется сменить.**

## **Разработка**
Для этой задачи я почему то на удивление решил использовать TypeScript 🤯
Как ни странно, наверняка можно было бы использовать старый добрый Python 🐍

---

## **Работа с картинками**
В коде я написал 2 функции ```typescript drawSquareOutline()``` - отвечает за квадратную обводку по стандартам оригинального fist.png
А так же, ```typescript drawCircleOutline()``` - отвечает за круглую обводку fist.png

Функции: 
```typescript
function drawSquareOutline(context: CanvasRenderingContext2D, size: number, lineWidth: number, lineColor: string, cornerRadius: number) {
  context.lineWidth = lineWidth;
  context.strokeStyle = lineColor;
  context.beginPath();
  context.moveTo(lineWidth / 2 + cornerRadius, lineWidth / 2);
  context.arcTo(size - lineWidth / 2, lineWidth / 2, size - lineWidth / 2, lineWidth / 2 + cornerRadius, cornerRadius);
  context.arcTo(size - lineWidth / 2, size - lineWidth / 2, size - lineWidth / 2 - cornerRadius, size - lineWidth / 2, cornerRadius);
  context.arcTo(lineWidth / 2, size - lineWidth / 2, lineWidth / 2, size - lineWidth / 2 - cornerRadius, cornerRadius);
  context.arcTo(lineWidth / 2, lineWidth / 2, lineWidth / 2 + cornerRadius, lineWidth / 2, cornerRadius);
  context.closePath();
  context.stroke();
}
function drawCircleOutline(context: CanvasRenderingContext2D, size: number, lineWidth: number, lineColor: string) {
  context.lineWidth = lineWidth;
  context.strokeStyle = lineColor;
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2 - lineWidth / 2, 0, Math.PI * 2);
  context.closePath();
  context.stroke();
}
```
---
## **Конфиг** 
Для удобства я решил использовать *./config/config.ts*
Данный файл содержит в себе две экспортируемых переменных - **tokenVK** & **tokenTG**
А так же некоторые данные касамое обработки через *canvas*
```typescript
export const tokenVK = 'token-vk';
export const tokenTG = 'token-tg';
// square-fist
export const squareSize = 28 // 25-27
export const squareRadius = 35 // 30-34
export const squareColor = 'black'
// round-fist
export const roundColor = 'black'
export const roundSize = 10
```

---

## **Сборка**
Я использовал не так много модулей для написания данных ботов, поэтому сборка не займет у знающих людей много времени. 🔩
* npm i vk-io
* npm i @vk-io/hear
* npm i canvas
* npm i puregram
  


---
## **Автор**
Stepan Mamashin/S-Mamashin

## **Link's**
[BLASTHACK](https://www.blast.hk/threads/183886/) topic <br>
[VK](https://vk.com/fistmaker) bot <br>
[TG](https://t.me/FistMakerBot) bot <br>
[Web](https://smamashin.ru/fistmaker/) app



