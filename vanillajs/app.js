const app = document.querySelector('#app');
const API_BASE = 'https://hacker-news.firebaseio.com/v0'

app.addEventListener('click', (e) => {
  if (e.target.classList.contains('comments')) {
    e.preventDefault();
    const storyId = e.target.getAttribute('story-id');
    history.pushState({storyId}, '', `/story/${storyId}`);
    renderDetail(storyId);
  }
});

function fetchChildComments(children, root) {
  if (children && children.length) {
    Promise
        .all(children.map(
            id => {return fetch(`${API_BASE}/item/${id}.json`)
                       .then(v => v.json())}))
        .then(kids => {
          for (let comment of kids.map(renderComment)) {
            root.appendChild(comment);
            fetchChildComments(comment.kids, root);
          }
        });
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

  fetch(`${API_BASE}/item/${storyId}.json`).then(v => v.json()).then(story => {
    const storyRoot = _createElm('div', {className: 'story-root'});
    app.appendChild(storyRoot);

    storyRoot.appendChild(renderStory(story, 'div'))

    Promise
        .all(story.kids.map(
            id => {return fetch(`${API_BASE}/item/${id}.json`)
                       .then(v => v.json())}))
        .then(kids => {
          const root = _createElm('ul', {className: 'root'});

          for (let kid of kids) {
            root.appendChild(renderComment(kid));
          }

          storyRoot.appendChild(root);
        });
  });
}

function fetchTopStories(offset = 0, num = 30) {
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

function showTopStories(offset) {
  app.innerHTML = '';
  fetchTopStories(offset).then(stories => {
    const list = document.createElement('ul');
    list.id = 'stories';

    for (let story of stories) {
      list.appendChild(renderStory(story));
    }

    app.appendChild(list);
  });
}

window.onpopstate = e => {
  if (e.state.offset !== undefined) {
    showTopStories(e.state.offset);
  } else {
    renderDetail(e.state.storyId);
  }
};

history.replaceState({offset: 0}, '', '/');
showTopStories(0);
