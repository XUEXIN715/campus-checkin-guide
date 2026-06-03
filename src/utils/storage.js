// localStorage 工具函数封装

/**
 * 获取点赞数据
 * @returns {Object} 点赞状态对象
 */
export const getLikes = () => {
  try {
    const data = localStorage.getItem('campus_likes')
    return data ? JSON.parse(data) : {}
  } catch (e) {
    console.error('获取点赞数据失败:', e)
    return {}
  }
}

/**
 * 保存点赞数据
 * @param {Object} likes - 点赞状态对象
 */
export const saveLikes = (likes) => {
  try {
    localStorage.setItem('campus_likes', JSON.stringify(likes))
  } catch (e) {
    console.error('保存点赞数据失败:', e)
  }
}

/**
 * 获取留言数据
 * @returns {Array} 留言列表
 */
export const getComments = () => {
  try {
    const data = localStorage.getItem('campus_comments')
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error('获取留言数据失败:', e)
    return []
  }
}

/**
 * 保存留言数据
 * @param {Array} comments - 留言列表
 */
export const saveComments = (comments) => {
  try {
    localStorage.setItem('campus_comments', JSON.stringify(comments))
  } catch (e) {
    console.error('保存留言数据失败:', e)
  }
}

/**
 * 添加新留言
 * @param {Object} comment - 新留言对象
 * @returns {Array} 更新后的留言列表
 */
export const addComment = (comment) => {
  const comments = getComments()
  const newComment = {
    id: Date.now(),
    ...comment,
    createdAt: new Date().toLocaleString('zh-CN')
  }
  comments.unshift(newComment)
  saveComments(comments)
  return comments
}

/**
 * 删除留言
 * @param {number} id - 留言ID
 * @returns {Array} 更新后的留言列表
 */
export const deleteComment = (id) => {
  const comments = getComments()
  const filtered = comments.filter(c => c.id !== id)
  saveComments(filtered)
  return filtered
}