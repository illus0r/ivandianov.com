# План миграции мультиязычности

## Проблемы:
1. ❌ **Блог** - показывает посты из обоих языков (нет фильтрации)
2. ❌ **Контент перепутан** - русские посты в английской папке
3. ❌ **Сложный header.njk** - трудно понять логику переключения языков
4. ✅ **Проекты работают** - уже есть фильтрация по языку

## Рекомендую минимальный план (1-2 часа работы):

### Шаг 1: Исправить posts.njk (5 минут)
```diff
<!-- _includes/posts.njk -->
<section class="blog-posts">
	{% for post in collections.posts %}
-		{% if post.data.draft != true %} 
+		{% if post.data.lang == lang and post.data.draft != true %} 
		<div class="post-item">
```

### Шаг 2: Упростить header.njk (20 минут)
Заменить всю сложную логику на простую:

```njk
<!-- _includes/header.njk -->
<header>
  <div class="nav-menu">
    {# Имя/логотип #}
    <a class="nav-item" href="{{ '/' if lang == 'en' else '/ru/' }}">
      {{ 'Ivan Dianov' if lang == 'en' else 'Иван Дианов' }}
    </a>
    
    {# Пункты меню #}
    {% for item in collections.menu %}
      {% if lang == item.data.lang %}
        <a class="nav-item{% if item.url == page.url %} nav-item-active{% endif %}" 
           href="{{ item.url }}">
          {{ item.data.menuTitle }}
        </a>
      {% endif %}
    {% endfor %}
    
    {# Переключатель языка - простая логика #}
    {% set otherLang = 'ru' if lang == 'en' else 'en' %}
    {% set otherUrl = page.url | replace('/' + lang + '/', '/') if lang == 'ru' else '/ru' + page.url %}
    
    {# Проверяем, существует ли перевод #}
    {% set translationExists = false %}
    {% for p in collections.all %}
      {% if p.fileSlug == page.fileSlug and p.data.lang == otherLang %}
        {% set translationExists = true %}
        {% set otherUrl = p.url %}
      {% endif %}
    {% endfor %}
    
    {# Если перевода нет - ведем на главную #}
    {% if not translationExists %}
      {% set otherUrl = '/' if otherLang == 'en' else '/ru/' %}
    {% endif %}
    
    <a class="nav-item" href="{{ otherUrl }}">
      {{ otherLang | upper }}
    </a>
  </div>
</header>
```

### Шаг 3: Перенести контент (30 минут)
1. Проверить все файлы в `/content/en/posts/` 
2. Перенести русские тексты в `/content/ru/posts/`
3. Либо перевести на английский, либо удалить из английской версии

### Шаг 4: Добавить недостающие переводы (опционально)
Для страниц, которые есть только на одном языке:
- Либо создать переводы
- Либо оставить как есть (переключатель будет вести на главную)

## Альтернатива: Полный рефакторинг (4-6 часов)

Если хочешь более чистую архитектуру:

1. **Добавить translationKey** в frontmatter всех страниц
2. **Создать умные фильтры** для поиска переводов
3. **Разделить коллекции** по языкам (posts_en, posts_ru)
4. **Унифицировать структуру** данных

Это даст:
- Более надежную систему
- Легче добавлять новые языки
- Проще поддерживать

## Тестирование

После любых изменений проверить:
1. `/` и `/ru/` - главные страницы
2. `/blog/` и `/ru/blog/` - списки постов (должны быть на правильных языках)
3. `/about/` и `/ru/about/` - переключение между переводами
4. Страница без перевода - должна вести на главную другого языка

---

**Мой совет**: Начни с минимального плана. Это решит основные проблемы. Потом, если захочешь, можно улучшать архитектуру постепенно.