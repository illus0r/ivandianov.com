---
title: The game of Ivan
date: 2021-11-11 01:39:00
draft: true
---

Ну, э типа тут про то, как делать клеточный автомат такой странный, который наращивает разрешение своё.

Ну, начнём с небольшой картинки, скажем, 8×8 клеток. Заполним случайными значениями.

Чтобы её преобразовать, нам понадобятся правила. Они будут делить исходную клетку на 4 дочерних клетки и задавать цвета этим квадрантам исходя из цветов исходной клетки, её соседей и айдишника дочерней клетки. В отличие от игры Конвея будем рассматривать только 4 соседних клетки. А ещё для нас будет важена не сумма соседей, то, с какой стороны есть сосед, тоже будет играть роль.

То есть жизнь будет идти по правилам:

    n0, n1, n2, n3, n4, id → color
    ↑   ↑                ↑
    |   Цвета 4 соседей  Айдишник дочерней клетки  
    |
    Свой цвет клетки

Таким образом, число клеток на каждом шаге будет увеличиваться в 4 раза.

Сколько же разных правил возможно, если клетка может быть либо жива, либо мертва?

Для задания правил, нам надо перебрать все возможные варианты правой части. Оказывается, для этого надо будет записать 

2 * 2 * 2 * 2 * 2 * 4 = 128 строчек вида

    0, 0, 0, 0, 0, 0 → 0
    0, 0, 0, 0, 0, 1 → 0
    0, 0, 0, 0, 0, 2 → 1
    0, 0, 0, 0, 0, 3 → 1
    0, 0, 0, 0, 1, 0 → 1
    0, 0, 0, 0, 1, 1 → 0
    0, 0, 0, 0, 1, 2 → 0
    0, 0, 0, 0, 1, 3 → 1
    …

Если перебрать все возможные варианты правой части такого свода правил (левая всегда будет оставаться неизменной), получится 2**128 = 3.4e38 вариантов, что очень много. Будут варианты, которые всегда производят пустые или полные клетки, и это скучно. Но вероятность получить такой вариант очень мала.

Вроде номр. Остаётся только повторить деление клеток ещё несколько раз, любуясь проявляющейся картинкой.

Туду: анимировать более плавно, не как сейчас.