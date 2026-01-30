# Улучшенная архитектура мультиязычности

## Основная идея
Использовать фильтр для автоматического определения парных страниц и упростить логику.

## 1. Создать универсальный фильтр для поиска переводов

```js
// .eleventy.js - добавить новый фильтр
eleventyConfig.addFilter("findTranslation", function(currentPage, collections, targetLang) {
  // Получаем slug текущей страницы (без языкового префикса)
  let currentSlug = currentPage.fileSlug;
  
  // Ищем страницу с таким же slug в другом языке
  return collections.all.find(page => {
    return page.data.lang === targetLang && 
           page.fileSlug === currentSlug &&
           page.inputPath !== currentPage.inputPath;
  });
});

// Фильтр для переключения языка с фоллбеком на главную
eleventyConfig.addFilter("langSwitchUrl", function(currentPage, collections, targetLang) {
  const translation = this.findTranslation(currentPage, collections, targetLang);
  
  if (translation) {
    return translation.url;
  }
  
  // Фоллбек на главную страницу нужного языка
  return targetLang === 'en' ? '/' : '/ru/';
});
```

## 2. Упрощенный header.njk

```njk
<header>
  <div class="nav-menu">
    {# Логотип/имя #}
    <a class="nav-item" href="{{ '/' if lang == 'en' else '/ru/' }}">
      {{ 'Ivan Dianov' if lang == 'en' else 'Иван Дианов' }}
    </a>
    
    {# Меню #}
    {% for item in collections.menu %}
      {% if lang == item.data.lang %}
        <a class="nav-item{% if item.url == page.url %} nav-item-active{% endif %}" 
           href="{{ item.url }}">
          {{ item.data.menuTitle }}
        </a>
      {% endif %}
    {% endfor %}
    
    {# Переключатель языка #}
    {% set targetLang = 'ru' if lang == 'en' else 'en' %}
    <a class="nav-item" href="{{ page | langSwitchUrl(collections, targetLang) }}">
      {{ targetLang | upper }}
    </a>
  </div>
</header>
```

## 3. Структура данных для страниц

### Вариант A: Связывание через translationKey
```yaml
# en/about.md
---
translationKey: about
menu: 20
menuTitle: About
---

# ru/about.md
---
translationKey: about  
menu: 30
menuTitle: Про меня
---
```

### Вариант B: Автоматическое связывание по fileSlug (проще!)
Просто используем одинаковые имена файлов в разных языковых папках.

## 4. Коллекции с фильтрацией по языку

```js
// .eleventy.js
// Универсальная функция для создания языковых коллекций
function createLangCollection(eleventyConfig, name, tag, lang) {
  eleventyConfig.addCollection(`${name}_${lang}`, function(collectionsApi) {
    return collectionsApi
      .getAll()
      .filter(item => {
        return item.data?.tags?.includes(tag) && 
               item.data?.lang === lang;
      })
      .sort((a, b) => b.data.date - a.data.date);
  });
}

// Создаем коллекции для обоих языков
['en', 'ru'].forEach(lang => {
  createLangCollection(eleventyConfig, 'posts', 'post', lang);
  createLangCollection(eleventyConfig, 'projects', 'projects', lang);
});

// Коллекция меню остается общей, но с фильтрацией по языку при использовании
```

## 5. Использование в шаблонах

```njk
<!-- blog.njk -->
{% set postsCollection = collections['posts_' + lang] %}
<section class="blog-posts">
  {% for post in postsCollection %}
    {% if post.data.draft != true %}
      <!-- вывод поста -->
    {% endif %}
  {% endfor %}
</section>
```

## Преимущества этого подхода:
1. **Понятная логика** - легко увидеть, что происходит
2. **Масштабируемость** - легко добавить новые языки
3. **Надежность** - автоматический фоллбек на главную
4. **Гибкость** - можно иметь уникальные страницы для каждого языка