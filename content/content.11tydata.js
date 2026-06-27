import fs from "fs";
import path from "path";

export default {
  eleventyComputed: {
    // Черновики исключаются из всех коллекций
    eleventyExcludeFromCollections: (data) => {
      return data.draft === true;
    },

    permalink: (data) => {
      // Черновики не генерируют страницы
      if (data.draft === true) {
        return false;
      }

      // Если permalink уже явно задан как false, оставляем
      if (data.permalink === false) {
        return false;
      }

      // Проверяем, есть ли контент в файле (после frontmatter)
      if (data.page?.inputPath) {
        try {
          const content = fs.readFileSync(data.page.inputPath, "utf-8");
          // Ищем контент после второго ---
          const parts = content.split(/^---$/m);
          if (parts.length >= 3) {
            const body = parts.slice(2).join("---").trim();
            if (!body) {
              // Пустой контент — не генерируем страницу
              return false;
            }
          }
        } catch (e) {
          // Если не удалось прочитать, используем дефолтный permalink
        }
      }

      // For projects: strip numeric prefix from slug (e.g. "04 walbi" → "walbi")
      if (data.tags?.includes("projects") && data.page?.fileSlug) {
        const lang = data.lang || "en";
        const slug = data.page.fileSlug.replace(/^\d+\s+/, "");
        return `/${lang}/${slug}/`;
      }

      return data.permalink;
    },
  },
};
