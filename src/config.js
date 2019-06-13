/**
 * @file: 配置项
 */
import { URLWrapper } from './utils'

const { username, reponame, clientID, clientSecret, authToken } = window
const hostname = 'https://api.github.com'
const rootPath = `${hostname}/repos/${username}/${reponame}/`
let urls = {
  issue: `${rootPath}issues`,
  comment: `${rootPath}issues/{number}/comments`,
  milestones: `${rootPath}milestones`,
  msPost: `${rootPath}issues?milestone={number}`,
  oAuth: `https://github.com/login/oauth/authorize?client_id=${clientID}&client_secret=${clientSecret}&redirect_uri={url}&scope=public_repo`,
  newComment: `https://github.com/${username}/${reponame}/issues/{number}#new_comment_field`
}

for (let k in urls) {
  urls[k] = new URLWrapper(urls[k])
}

const scopeKeys = ['issue', 'comment', 'milestones', 'msPost']

if (authToken) {
  // 如果做了授权，则将其加到请求参数里去
  scopeKeys.forEach(k => {
    urls[k].query({ access_token: authToken })
  })
}

export {
  urls
}
