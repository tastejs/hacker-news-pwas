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
    const storyId = t['story-id'];
    history.pushState({storyId}, '', `/story/${storyId}`);
    renderDetail(storyId);
  }
});

function fetchJson(url) {
  return fetch(url + '.json').then(v => v.json());
}

/**
 * @param {Node} root
 * @param {boolean} recurse
 * @param {Array<StoryComment>} comments
 */
function renderCommentsInto(root, recurse, comments) {
  comments.filter(c => !c.deleted).map(renderComment).forEach(comment => {
    root.appendChild(comment);
    recurse && fetchChildComments(comment.kids, root);
  });
}

function fetchChildComments(children, root) {
  if (children && children.length) {
    Promise.all(children.map(id => fetchJson(API_BASE + `/item/${id}`)))
        .then(renderCommentsInto.bind(null, root, true));
  }
}

/**
* @param {StoryComment} comment
*/
function renderComment(comment) {
  let kidRoot = _createElm(
      'ul', {className: 'kid-root', 'story-id': comment.id},
      _createElm(
          'li', {className: 'kid'},
          _createElm(
              'div', {className: 'comment-info sub-info'},
              _createElm('div', {className: 'author'}, comment.by)),
          _createElm(
              'p', {className: 'comment-text', innerHTML: comment.text})));

  fetchChildComments(comment.kids, kidRoot);

  return kidRoot;
}

function renderDetail(storyId) {
  // Empty the app DOM
  app.innerHTML = '';

  fetchJson(API_BASE + `/item/${storyId}`).then(story => {
    const storyRoot = _createElm(
        'div', {className: 'story-root'}, renderStory(story, 'div', true));
    app.appendChild(storyRoot);

    Promise.all(story.kids.map(id => fetchJson(API_BASE + `/item/${id}`)))
        .then(kids => {
          const root = _createElm('ul', {className: 'root'});
          renderCommentsInto(root, false, kids);
          storyRoot.appendChild(root);
        });
  });
}

function fetchStories(scope, offset = 0, num = 30) {
  return fetchJson(API_BASE + `/${scope}`).then(ids => {
    return Promise.all(ids.slice(offset, num).map((id, idx) => {
      return fetchJson(API_BASE + `/item/${id}`).then(v => Object.assign(v, {
        'idx': idx + offset
      }));
    }));
  });
}

/**
 * @param {string} tagName
 * @param {DomAttrs} attrs
 * @param {...*} var_args
 */
function _createElm(tagName, attrs = {}, var_args) {
  const elm = document.createElement(tagName);

  for (let k in attrs) {
    elm[k] = attrs[k];
  }

  Array.from(arguments).slice(2).forEach(
      n => elm.appendChild(typeof n === 'string' ? new Text(n) : n));

  return elm;
}

/**
 * @param {Story} story
 * @param {string} rootTag
 * @param {boolean} withText
 */
function renderStory(story, rootTag = 'li', withText = false) {
  let item = _createElm(rootTag, {className: 'story'});
  let headline = _createElm('div', {className: 'headline'});
  item.appendChild(headline);

  if (story.idx !== undefined) {
    headline.appendChild(
        _createElm('div', {className: 'position'}, `${story.idx + 1}.`));
  }

  headline.appendChild(_createElm(
      'a',
      {href: story.url || `/story/${story.id}`, className: 'title primary'},
      story.title));

  if (story.url) {
    headline.appendChild(
        _createElm('div', {className: 'host'}, `(${new URL(story.url).host})`));
  }

  let subInfo = _createElm(
      'div', {className: 'sub-info'},
      _createElm('div', {className: 'score'}, `${story.score} points |`),
      _createElm('div', {className: 'author'}, `by ${story.by} |`),
      _createElm(
          'a', {
            'story-id': story.id,
            className: 'comments',
            href: `/story/${story.id}`
          },
          `${story.descendants} comments`));
  item.appendChild(subInfo);

  withText && story.text !== undefined &&
      item.appendChild(
          _createElm('div', {className: 'story-text', innerHTML: story.text}));

  return item;
}

function showStories(offset, scope) {
  app.innerHTML = '';
  fetchStories(scope, offset).then(stories => {
    const list = _createElm('ul', {id: 'stories'});

    stories.forEach(story => list.appendChild(renderStory(story)));
    app.appendChild(list);
  });
}

function matchPath(matcher) {
  return window.location.pathname.match(matcher);
}

window.onpopstate = e => {
  if (e.state.offset !== undefined) {
    let match = matchPath(SECTION_MATCHER);
    showStories(
        e.state.offset, (match[0] === '/' ? 'top' : match[0]) + 'stories');
  } else {
    renderDetail(e.state.storyId);
  }
};

if (match = matchPath(SECTION_MATCHER)) {
  let url = match[0] === '/' ? 'top' : match[0];
  history.replaceState({offset: 0}, '', '/' + url);
  showStories(0, `${url}stories`);
} else {
  const storyId = matchPath(/story\/(\d+)/)[1]
  history.pushState({storyId}, '', `/story/${storyId}`);
  renderDetail(storyId);
}
