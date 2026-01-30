// const Image = require("@11ty/eleventy-img");
import CleanCSS from "clean-css";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
// for classes in md
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItBracketedSpans from "markdown-it-bracketed-spans";
import jsdom from "jsdom";

export default function (eleventyConfig) {
  eleventyConfig.ignores.add("_docs/**/*");
  eleventyConfig.addPassthroughCopy({
    "assets/media/**/*.mp4": "assets/media",
    "assets/js/**/*.js": "assets/js",
    "assets/fonts/*": "assets/fonts",
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // output image dir
    urlPath: "/assets/media",
    // output image formats
    formats: ["webp"],
    sharpOptions: {
      webp: {
        quality: 100,
      },
    },
    widths: ["512", "1024", "2048"],

    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
      pictureAttributes: {},
    },
  });

  eleventyConfig.addFilter("dump", function (value) {
    console.log("value:", value);
  });

  eleventyConfig.addFilter("antiLang", function (value) {
    if (value == "ru") return "en";
    return "ru";
  });

  eleventyConfig.addFilter("getTranslationUrl", function (collections, page, targetLang) {
    const match = collections.find(p =>
      p.fileSlug === page.fileSlug &&
      p.data.lang === targetLang &&
      p.url !== page.url &&
      p.url && p.url !== false // страница должна реально генерироваться
    );
    return match ? match.url : (targetLang === 'en' ? '/' : '/ru/');
  });

  eleventyConfig.addFilter("lastPart", function (value) {
    if (!value) return "";
    let arr = value.split("/");
    arr.pop();
    return arr.pop();
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addCollection("posts", function (collectionsApi) {
    return collectionsApi
      .getAll()
      .filter((item) => {
        return item.data?.tags?.includes("post");
      })
      .sort((a, b) => b.data.date - a.data.date);
  });

  eleventyConfig.addCollection("menu", function (collectionsApi) {
    return collectionsApi
      .getAll()
      .filter((item) => {
        return Number.isInteger(Number(item.data.menu));
      })
      .sort((a, b) => Number(a.data.menu) - Number(b.data.menu));
  });

  eleventyConfig.addCollection("projects", function (collectionsApi) {
    return collectionsApi
      .getAll()
      .filter((item) => {
        return item.data?.tags?.includes("projects");
      })
      .sort((a, b) => a.page.fileSlug.localeCompare(b.page.fileSlug));
  });

  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true })
      .use(markdownItBracketedSpans)
      .use(markdownItAttrs),
  );

  eleventyConfig.addTransform("danceHeaders", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      const dom = new jsdom.JSDOM(content);
      const document = dom.window.document;

      const headers = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p.big",
      );
      headers.forEach((header) => {
        if (header.innerHTML === header.textContent) {
          let contentArray = header.textContent.split("");
          let newContent = contentArray
            .map((char) => `<span>${char}</span>`)
            .join("");
          header.innerHTML = `<span class="dance-dance">${newContent}</span>`;
        }
      });

      return dom.serialize();
    }

    return content;
  });

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
