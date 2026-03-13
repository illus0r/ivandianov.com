---
title: Пересечение поверхностей
date: 2021-03-03 06:35:00
progress: 3
---

Я сделал эту статью из своего твиттер-треда [https://twitter.com/i_dianov/status/1367136469853351944](https://twitter.com/i_dianov/status/1367136469853351944)

![](https://media.ivandianov.com/posts/2022-02-17-11-09-37.png)
Пересечение сферы с пересечением гироида и сферы {.caption}

Привет! Это туториал о том, как найти пересечение двух или более поверхностей (не объёмов), чтобы делать сложные #SDF формы для #raymarching.

---

1. Начнём с базовой настройки реймаршинга

``` glsl
#define SPHERE length(p)-1.
#define SDF(p) SPHERE
vec3 p; float d=0.,i,e=1.; for(;i++<99.&&e>.01; p=d*normalize(vec3((FC.xy-.5*r)/r.y,1))+ vec3(0,0,-5), p*=rotate3D(t,vec3(.3,1,0)), d+=e=.5*SDF(p)); o+=100./i/i;
```
[https://bit.ly/3b9u7AL](https://bit.ly/3b9u7AL)
{.caption}

Не нужно понимать нижнюю строку, давайте сосредоточимся на строке, начинающейся с

```
#define SDF(p) …
```

Она определяет форму для рендеринга. Вот сфера:

```
#define SPHERE length(p)-1.
#define SDF(p) SPHERE
```

![](https://media.ivandianov.com/posts/2022-02-17-11-07-46.png)

---

2. А вот SDF для плоскости Z (она параллельна осям X и Y) [https://bit.ly/3e4nd1D](https://bit.ly/3e4nd1D)

```
#define PLANE_Z -p.z
#define SDF(p) PLANE_Z
```
![](https://media.ivandianov.com/posts/surface-intersection-2.gif)

---

3. Чтобы найти пересечение этих двух поверхностей, просто пишем

```
#define SDF(p) length(vec2(PLANE_Z, SPHERE))
```

И БУМ!💥 Круг появился! https://bit.ly/3bXGTBJ

Дело в том, что `length` двух SDF близок к нулю, только если оба SDF близки к нулю.

![](https://media.ivandianov.com/posts/surface-intersection-3.gif)

---

4. Мы можем надуть эту поверхность, вычитая небольшое значение из SDF:

```
#define SDF(p) length(vec2(PLANE_Z, SPHERE))-.2
```

Обратите внимание на `-.2` в конце формулы.
https://bit.ly/3bXGTBJ

![](https://media.ivandianov.com/posts/surface-intersection-4.gif)

---

5. Можете сделать небольшую паузу и подумать, как сделать цилиндр, используя этот трюк?

---

6. Отлично, у вас получилось! Это просто пересечение двух плоскостей, надутое вычитанием небольшого значения:

```
#define SDF(p) length(vec2(PLANE_X, PLANE_Z))-1.2
```

Часто это сокращают до `length(p.xz)-1.2`, что фактически то же самое.

https://bit.ly/30me4cZ

![](https://media.ivandianov.com/posts/surface-intersection-6.gif)

---

7. Пересечём цилиндры! Получатся два пересекающихся круга

```
#define CYLINDER_Y length(vec2(PLANE_X, PLANE_Z))-1.2
#define CYLINDER_X length(vec2(PLANE_Y, PLANE_Z))-1.2
SPHERE))-.01
#define SDF(p) length(vec2(CYLINDER_Y, CYLINDER_X))-.1
```

https://bit.ly/3883WbT

![](https://media.ivandianov.com/posts/surface-intersection-7.gif)

---

8. Начинается безумие! Осторожно, гироид

```
#define GYROID dot(sin(p*9.),cos(p.zxy*9.))*.1
#define SDF(p) GYROID
```

Сложно понять его форму, потому что гироид бесконечен и мы внутри него https://bit.ly/3070hqe

![](https://media.ivandianov.com/posts/surface-intersection-8.gif)

---

9. Чтобы лучше понять его форму, нужно пересечь его с каким-то другим примитивом. Почему бы не со сферой?

```
#define SDF(p) length(vec2(SPHERE, GYROID))-.02
```

https://bit.ly/30a2scU

Подробнее о гироидах можно узнать на https://en.wikipedia.org/wiki/Gyroid

![](https://media.ivandianov.com/posts/surface-intersection-9.gif)

---

10. Хотите пересечь пересечения? Без проблем! Можем использовать нашу странную форму из твита #7:

```
#define CROSS_RINGS length(vec2(CYLINDER_Y, CYLINDER_X))-.2
#define SDF(p) length(vec2(CROSS_RINGS, GYROID))-.01
```

https://bit.ly/3kGYWjr

![](https://media.ivandianov.com/posts/surface-intersection-10.gif)

---

11. Можно пересечь больше двух поверхностей сразу! Используйте для этого vec3 или vec4:

```
#define SDF(p) length(vec3(CYLINDER_Y, CYLINDER_X, SPHERE))-.1
```

https://bit.ly/3uT3ZSu

![](https://media.ivandianov.com/posts/surface-intersection-11.gif)

---

12. Иииии… обычный SDF сферы — это сокращение той же самой формулы!

```
#define SDF(p) length(vec3(PLANE_X, PLANE_Y, PLANE_Z))-.9
```
↓
```
#define SDF(p) length(p.xyz)-.9
```
↓
```
#define SDF(p) length(p)-.9
```

Я был в шоке, когда узнал об этом! 🤯

---

13. Вот и всё! Попробуйте поиграть с кодом, интересные паттерны могут внезапно появиться https://bit.ly/3uSmvdO

Это мой первый туториал-тред. Буду благодарен, если поделитесь мыслями по теме, зададите вопросы или похвастаетесь SDF, которые откроете.

![](https://media.ivandianov.com/posts/surface-intersection-13.gif)
