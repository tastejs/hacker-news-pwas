const app = document.querySelector('#app');
const API_BASE = 'https://hacker-news.firebaseio.com/v0'

function fetchFetchTop(offset = 0, num = 30) {
  return fetch(`${API_BASE}/topstories.json`).then(v => v.json()).then(ids => {
    return Promise.all(ids.slice(offset, num).map((id, idx) => {
      return fetch(`${API_BASE}/item/${id}.json`)
          .then(v => v.json())
          .then(v => {
            v.position = idx + offset;
            return v;
          });
    }));
  });
}

function _createElm(tagName, klass, textContent) {
  const elm = document.createElement(tagName);
  elm.classList.add(...(Array.isArray(klass) ? klass : [klass]));

  if (textContent !== undefined) {
    elm.textContent = textContent;
  }

  return elm;
}

function renderStory(story) {
  let item = _createElm('li', 'story');
  let headline = _createElm('div', 'headline');
  item.appendChild(headline);

  headline.appendChild(
      _createElm('div', ['position', 'secondary'], `${story.position + 1}.`));
  headline.appendChild(_createElm('div', ['title', 'primary'], story.title));
  headline.appendChild(
      _createElm('div', ['host', 'secondary'], `(${new URL(story.url).host})`));

  let subInfo = _createElm('div', 'sub-info');
  item.appendChild(subInfo);

  subInfo.appendChild(
      _createElm('div', ['score', 'secondary'], `${story.score} points |`));
  subInfo.appendChild(
      _createElm('div', ['author', 'secondary'], `by ${story.by} |`));
  subInfo.appendChild(_createElm(
      'div', ['comments', 'secondary'], `${story.descendants} comments`));

  return item;
}

fetchFetchTop().then(stories => {
  const list = document.createElement('ul');
  list.id = 'stories';

  for (let story of stories) {
    list.appendChild(renderStory(story));
  }

  app.appendChild(list);
});
