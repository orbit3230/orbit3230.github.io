(() => {
  'use strict';
  const config = document.getElementById('quick-search');
  if (!config) return;
  const normalize = value => String(value || '').normalize('NFKC').toLocaleLowerCase();
  const terms = query => normalize(query).split(/\s+/).filter(Boolean);
  let enginePromise, fallbackPromise;
  async function engine() {
    if (!enginePromise) enginePromise = import(config.dataset.pagefindUrl).then(async module => {
      await module.options({ excerptLength: 28 });
      return module;
    }).catch(error => { enginePromise = null; throw error; });
    return enginePromise;
  }
  async function fallback() {
    if (!fallbackPromise) fallbackPromise = fetch(config.dataset.searchUrl).then(response => {
      if (!response.ok) throw Error('Search index unavailable');
      return response.json();
    }).catch(error => { fallbackPromise = null; throw error; });
    return fallbackPromise;
  }
  function markText(element, text, query) {
    // Always create text nodes: neither titles nor user queries become HTML.
    const escaped = terms(query).map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (!escaped.length) { element.textContent = text; return; }
    const expression = new RegExp(escaped.join('|'), 'giu');
    let offset = 0;
    for (const match of String(text).matchAll(expression)) {
      element.append(document.createTextNode(text.slice(offset, match.index)));
      const mark = document.createElement('mark'); mark.textContent = match[0]; element.append(mark);
      offset = match.index + match[0].length;
    }
    element.append(document.createTextNode(text.slice(offset)));
  }
  function markExcerpt(element, text, query, rich) {
    if (!rich) { markText(element, text, query); return; }
    const parsed = new DOMParser().parseFromString(text, 'text/html');
    // Only preserve Pagefind's mark emphasis, never other markup or attributes.
    function append(node, parent) {
      if (node.nodeType === Node.TEXT_NODE) parent.append(document.createTextNode(node.textContent));
      else if (node.nodeType === Node.ELEMENT_NODE && !['SCRIPT','STYLE','IFRAME','OBJECT'].includes(node.tagName)) {
        const target = node.tagName === 'MARK' ? document.createElement('mark') : parent;
        if (target !== parent) parent.append(target);
        node.childNodes.forEach(child => append(child, target));
      }
    }
    parsed.body.childNodes.forEach(node => append(node, element));
  }
  async function search(query, selected, page = 1) {
    const filters = Object.fromEntries(Object.entries(selected).filter(([,value]) => value));
    try {
      const module = await engine();
      const found = await module.search(query.trim() || null, { filters });
      const data = await Promise.all(found.results.slice((page - 1) * 5, page * 5).map(result => result.data()));
      return { total: found.results.length, posts: data.map(post => ({
        url: post.url, title: post.meta.title || '', date: post.meta.date || '',
        tags: post.filters?.tag || [], excerpt: post.sub_results?.find(section => section.url.includes('#') && (section.plain_excerpt || '').length >= 80)?.excerpt || post.excerpt || '', richExcerpt: true,
        sections: (post.sub_results || []).filter(section => section.url.includes('#'))
      })) };
    } catch {
      // Plain Jekyll previews and a failed index download retain complete search.
      const words = terms(query), index = await fallback();
      const found = index.filter(post => (!selected.year || post.date.slice(0,4) === selected.year)
        && (!selected.tag || (post.tags || []).flat().includes(selected.tag))
        && words.every(word => normalize([post.title, ...(post.tags || []).flat(), post.content].join(' ')).includes(word)));
      found.sort((a,b) => Number(words.every(word => normalize(b.title).includes(word))) - Number(words.every(word => normalize(a.title).includes(word))));
      const posts = await Promise.all(found.slice((page - 1) * 5, page * 5).map(async post => {
        const start = Math.max(0, normalize(post.content).indexOf(words[0] || '') - 60);
        const result = { ...post, tags:(post.tags || []).flat(), excerpt:(start ? '…' : '') + post.content.slice(start,start + 220) + '…', sections:[], richExcerpt:false };
        try {
          const url = new URL(post.url, location.href);
          if (url.origin !== location.origin) return result;
          const response = await fetch(url.href); if (!response.ok) return result;
          const html = new DOMParser().parseFromString(await response.text(), 'text/html');
          const body = html.querySelector('.post-body');
          let heading;
          for (const node of body?.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,pre') || []) {
            if (/^H[1-6]$/.test(node.tagName) && node.id) heading = node;
            if (heading && words.length && words.every(word => normalize(node.textContent).includes(word))) {
              url.hash = heading.id; result.sections.push({url:url.href,title:heading.textContent}); break;
            }
          }
        } catch { /* A snippet remains useful when an individual article is unavailable. */ }
        return result;
      }));
      return { total:found.length, posts };
    }
  }
  window.OrbitSearch = { search, markText, markExcerpt };
})();
