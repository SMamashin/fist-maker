const smile = "😁"
const nope = "❌"
const magic = "🙌"
const cmds = "🕹"
const idea = "💡"
const egor = "🤔"
const dvxch = "🥰"

export const phrases = [
    `Привет!${smile}\nЯ могу сделать тебе фист прямо из твоей картинки! ${magic}\nВот список моих команд${cmds}:\n\n\
    /fist - фист в стандартной обводке.\n/fist_round - фист в круглой обводке.\n\n\
    Обратите внимание! ${idea}\nДля /fist_round присутствует возможность передать 2 аргумента - это толщина обводки и цвет(black/white)\n\
    Например: /fist_round 15.5 white\n\n
    По умолчанию:\nЦвет: black\nТолщина: 10\n\nТак же, можно указать только размер или только нужный цвет.\n\
    Например: /fist_round 18.5 & /fist_round white\nВ этих случаях, аргументы которые вы не указали, примут значения по умолчанию.`,
    `${nope} Прикрепите к команде вашу картинку для фиста.`,
    `${egor} Кажется вы ошиблись при написании команды, если вы здесь впервые - введите /help ${dvxch}`

]