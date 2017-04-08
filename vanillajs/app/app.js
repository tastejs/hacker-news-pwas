const app = document.querySelector('#app');
const API_BASE = 'https://hacker-news.firebaseio.com/v0'
const SECTION_MATCHER = /^\/$|top|newest|show|ask|jobs/;

document.body.addEventListener('click', (e) => {
  const t = e.target;
  if (t.classList.contains('page')) {
    e.preventDefault();
    history.pushState({offset: 0}, '', `${t.getAttribute('href')}`);
    showStories(0, t.dataset.scope);
  }

  if (t.classList.contains('comments')) {
    e.preventDefault();
    const storyId = t.getAttribute('story-id');
    history.pushState({storyId}, '', `/story/${storyId}`);
    renderDetail(storyId);
  }
});

function fetchJson(url) {
  return fetch(url + '.json').then(v => v.json());
}

function renderCommentsInto(root, recurse = false, comments) {
  for (let comment of comments.filter(c => !c.deleted).map(renderComment)) {
    root.appendChild(comment);
    recurse && fetchChildComments(comment.kids, root);
  }
}

function fetchChildComments(children, root) {
  if (children && children.length) {
    Promise.all(children.map(id => fetchJson(`${API_BASE}/item/${id}`)))
        .then(renderCommentsInto.bind(null, root, true));
  }
}

function renderComment(comment) {
  let kidRoot =
      _createElm('ul', {className: 'kid-root', 'story-id': comment.id});
  let commentElm = _createElm('li', {className: 'kid'});

  let commentInfo =
      _createElm('div', {className: ['comment-info', 'sub-info']});
  commentInfo.appendChild(
      _createElm('div', {className: ['author', 'secondary']}, comment.by));
  commentElm.appendChild(commentInfo);

  let commentText = _createElm('p', {className: 'comment-text'});
  commentText.innerHTML = comment.text;

  commentElm.appendChild(commentText);
  kidRoot.appendChild(commentElm);

  fetchChildComments(comment.kids, kidRoot);

  return kidRoot;
}

function renderDetail(storyId) {
  // Empty the app DOM
  app.innerHTML = '';

  fetchJson(`${API_BASE}/item/${storyId}`).then(story => {
    const storyRoot = _createElm('div', {className: 'story-root'});
    app.appendChild(storyRoot);

    storyRoot.appendChild(renderStory(story, 'div'))

    Promise.all(story.kids.map(id => fetchJson(`${API_BASE}/item/${id}`)))
        .then(kids => {
          const root = _createElm('ul', {className: 'root'});
          renderCommentsInto(root, false, kids);
          storyRoot.appendChild(root);
        });
  });
}

function fetchStories(scope, offset = 0, num = 30) {
  return fetchJson(`${API_BASE}/${scope}`).then(ids => {
    return Promise.all(ids.slice(offset, num).map((id, idx) => {
      return fetchJson(`${API_BASE}/item/${id}`).then(v => Object.assign(v, {
        position: idx + offset
      }));
    }));
  });
}

function _createElm(tagName, attrs = {}, textContent = undefined) {
  const elm = document.createElement(tagName);

  for (let k in attrs) {
    if (k === 'className') {
      elm.classList.add(
          ...(Array.isArray(attrs.className) ? attrs.className :
                                               [attrs.className]));
      continue;
    }
    elm.setAttribute(k, attrs[k]);
  }

  if (textContent !== undefined) {
    elm.textContent = textContent;
  }

  return elm;
}

function renderStory(story, rootTag = 'li') {
  let item = _createElm(rootTag, {className: 'story'});
  let headline = _createElm('div', {className: 'headline'});
  item.appendChild(headline);


  if (story.position !== undefined) {
    headline.appendChild(_createElm(
        'div', {className: ['position', 'secondary']},
        `${story.position + 1}.`));
  }

  headline.appendChild(_createElm(
      'a', {href: story.url, className: ['title', 'primary']}, story.title));

  if (story.url) {
    headline.appendChild(_createElm(
        'div', {className: ['host', 'secondary']},
        `(${new URL(story.url).host})`));
  }

  let subInfo = _createElm('div', {className: 'sub-info'});
  item.appendChild(subInfo);

  subInfo.appendChild(_createElm(
      'div', {className: ['score', 'secondary']}, `${story.score} points |`));
  subInfo.appendChild(_createElm(
      'div', {className: ['author', 'secondary']}, `by ${story.by} |`));
  subInfo.appendChild(_createElm(
      'a', {
        'story-id': story.id,
        className: ['comments', 'secondary'],
        href: `/story/${story.id}`
      },
      `${story.descendants} comments`));

  return item;
}

function showStories(offset, scope) {
  app.innerHTML = '';
  fetchStories(scope, offset).then(stories => {
    const list = _createElm('ul', {id: 'stories'});

    for (let story of stories) {
      list.appendChild(renderStory(story));
    }

    app.appendChild(list);
  });
}

window.onpopstate = e => {
  if (e.state.offset !== undefined) {
    showStories(
        e.state.offset,
        (window.location.pathname.match(SECTION_MATCHER) === '/' ? 'top' :
                                                                   match[0]) +
            'stories');
  } else {
    renderDetail(e.state.storyId);
  }
};

if (match = window.location.pathname.match(SECTION_MATCHER)) {
  let url = match[0] === '/' ? 'top' : match[0];
  history.replaceState({offset: 0}, '', '/' + url);
  showStories(0, `${url}stories`);
} else {
  const storyId = window.location.pathname.match(/story\/(\d+)/)[1]
  history.pushState({storyId}, '', `/story/${storyId}`);
  renderDetail(storyId);
}
