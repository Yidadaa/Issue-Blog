const {username, reponame, clientID, clientSecret} = window
const hostname = 'https://api.github.com'
const rootPath = `${hostname}/repos/${username}/${reponame}/`;
const urls = {
  issue: `${rootPath}issues`,
  comment: `${rootPath}issues/{number}/comments`,
  milestones: `${rootPath}milestones`,
  msPost: `${rootPath}issues?milestone={number}`,
  oAuth: `https://github.com/login/oauth/authorize?client_id=${clientID}&client_secret=${clientSecret}&redirect_uri={url}&scope=public_repo`
}
export {
  urls
}