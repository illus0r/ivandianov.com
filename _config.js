import lume from "lume/mod.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import postcss from "lume/plugins/postcss.ts";
import date from "lume/plugins/date.ts";

const site = lume({
    location: new URL("https://ivandianov.com"),
});
site.filter("lastPart", (value) => value.split('/').at(-1));
site.filter("urlWithoutLang", (value) => value.replace(/^\/ru/,''));
site.filter("keys", (value) => Object.keys(value));
site.filter("antiLang", (value) => (value=='ru')?'en':'ru');

site.preprocess([".html"], (page) => page.data.srcPath = page.src.path);

site.use(code_highlight());
site.use(postcss());
site.use(date());


site.copy('assets/media');
site.copy('CNAME');

export default site;
