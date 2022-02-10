export function url(page) {
    let lang = page.data.language;
    
    let langPrefix
    if(lang == 'ru') 
    langPrefix = '/ru'
    else langPrefix = ''
    
    return langPrefix+`/${page.src.path.split('/').at(-1)}/`;
    // if(lang == 'ru') return '/hey_ru/'
    // else return '/hey_en/'
  }

export const type = "post";
export const layout = "layouts/post.njk";