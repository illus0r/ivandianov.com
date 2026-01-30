# Минимальные правки для исправления мультиязычности

## 1. Исправить posts.njk - фильтровать по языку

```njk
<!-- _includes/posts.njk -->
<section class="blog-posts">
	{% for post in collections.posts %}
		{# Фильтруем посты по текущему языку #}
		{% if post.data.lang == lang and post.data.draft != true %} 
		<div class="post-item">
			<div class='meta'>
				{% set progress = post.data.progress %}
				{% include "progress.njk" %}
			</div>
			<h2 class="post-title">
				<a href="{{ post.url }}">
					{{ post.data.title }}
				</a>
			</h2>
		</div>
		{% endif %}
	{% endfor %}
</section>
```

## 2. Добавить язык в коллекции (.eleventy.js)

```js
// Создать отдельные коллекции для каждого языка
eleventyConfig.addCollection("posts_en", function (collectionsApi) {
  return collectionsApi
    .getAll()
    .filter((item) => {
      return item.data?.tags?.includes("post") && item.data?.lang === "en";
    })
    .sort((a, b) => b.data.date - a.data.date);
});

eleventyConfig.addCollection("posts_ru", function (collectionsApi) {
  return collectionsApi
    .getAll()
    .filter((item) => {
      return item.data?.tags?.includes("post") && item.data?.lang === "ru";
    })
    .sort((a, b) => b.data.date - a.data.date);
});
```

## 3. Упростить header.njk

```njk
<header>
  <div class="nav-menu">
    {# Логотип/имя #}
    {% if lang == 'en' %}
      <a class="nav-item" href="/">Ivan Dianov</a>
    {% else %}
      <a class="nav-item" href="/ru">Иван Дианов</a>
    {% endif %}
    
    {# Меню для текущего языка #}
    {% for item in collections.menu %}
      {% if lang == item.data.lang %}
        <a class="nav-item{% if item.url == page.url %} nav-item-active{% endif %}" 
           href="{{ item.url }}">
          {{ item.data.menuTitle }}
        </a>
      {% endif %}
    {% endfor %}
    
    {# Переключатель языка - упрощенный #}
    {% if lang == 'en' %}
      <a class="nav-item" href="/ru{{ page.url | replace('/', '') }}">Ru</a>
    {% else %}
      {# Убираем /ru из URL для английской версии #}
      {% set enUrl = page.url | replace('/ru', '') %}
      {% if enUrl == '' %}{% set enUrl = '/' %}{% endif %}
      <a class="nav-item" href="{{ enUrl }}">En</a>
    {% endif %}
  </div>
</header>
```

## 4. Исправить контент
- Перенести русские тексты из `/en/posts/` в `/ru/posts/`
- Перевести или удалить неактуальные посты