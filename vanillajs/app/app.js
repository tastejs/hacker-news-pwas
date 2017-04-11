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

function fetchJson(url, query = '') {
  return fetch(`${url}.json${query}`).then(v => v.json());
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
    fetchJson('/items', `?ids=${children.join(',')}`)
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
          'li', {}, _createElm(
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

    fetchJson('/items', `?ids=${story.kids.join(',')}`).then(kids => {
      const root = _createElm('ul', {className: 'root'});
      renderCommentsInto(root, false, kids);
      storyRoot.appendChild(root);
    });
  });
}

function fetchStories(scope, offset = 0, num = 30) {
  return new Promise((res) => {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', function(v) {
      res(JSON.parse(this.responseText));
    });
    oReq.open(
        'GET', `/stories.json?scope=${scope}&offset=${offset}&num=${num}`);
    oReq.send();
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
  return _createElm(
      rootTag, {className: 'story'},
      _createElm(
          'div', {className: 'headline'},
          _createElm(
              'div', {hidden: story.idx === undefined}, `${story.idx + 1}.`),
          _createElm(
              'div', {},
              _createElm(
                  'a',
                  {href: story.url || `/story/${story.id}`, className: 'title'},
                  story.title,
                  _createElm(
                      'div', {className: 'sub-info'},
                      _createElm('div', {}, `${story.score} points |`),
                      _createElm('div', {}, `by ${story.by} |`),
                      _createElm(
                          'a', {
                            'story-id': story.id,
                            className: 'comments',
                            href: `/story/${story.id}`,
                            // Some stories have no descendants.
                            hidden: story.descendants === undefined,
                          },
                          `${story.descendants} comments`))))),
      _createElm('div', {
        className: 'story-text',
        innerHTML: story.text,
        hidden: !(withText && story.text !== undefined)
      }));
}

function showStories(offset, scope) {
  app.innerHTML = '';
  fetchStories(scope, offset).then(stories => {
    app.appendChild(stories.reduce(
        (list, story) => list.appendChild(renderStory(story)) && list,
        _createElm('ul', {id: 'stories'})));
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
