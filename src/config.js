const {username, reponame} = window
const hostname = 'https://api.github.com'
const rootPath = `${hostname}/repos/${username}/${reponame}/`;
const urls = {
  issue: `${rootPath}issues`,
  comment: `${rootPath}issues/{number}/comments`,
  milestones: `${rootPath}milestones`,
  msPost: `${rootPath}issues?milestone={number}`
}
export {
  urls
}