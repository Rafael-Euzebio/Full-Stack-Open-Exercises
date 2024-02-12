const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  let sum = 0
  for (const post of blogPosts) {
    sum = sum + post.likes
  }

  return sum
}

const favoriteBlog = (blogPosts) => {
  let favorite = {}
  let likes = 0

  for (const post of blogPosts) {
    if (post.likes > likes) {
      likes = post.likes
      favorite = {
        title: post.title,
        author: post.author,
        likes: post.likes
      }
    }
  }

  return favorite
}

const mostBlogs = (blogPosts) => {
  if (blogPosts.length === 0) {
    return {}
  }
  const sortedBlogPosts = blogPosts.toSorted((a, b) => {
    if (a.author < b.author) {
      return -1
    }
    if (a.author > b.author) {
      return 1
    }

    return 0
  })

  const authorWithMostBlogs = {
    author: '',
    blogs: 0
  }

  let blogs = 0
  let currentAuthor = ''

  for (const post of sortedBlogPosts) {
    if (post.author === currentAuthor) {
      blogs++
    } else {
      blogs = 1
      currentAuthor = post.author
    }

    if (blogs > authorWithMostBlogs.blogs) {
      authorWithMostBlogs.author = post.author
      authorWithMostBlogs.blogs = blogs
    }
  }

  return authorWithMostBlogs
}

const mostBlogsLodash = (blogPosts) => {
  const authorsFrequency = _.map(blogPosts, 'author')
  const mostFrequentAuthor = _.flow(
    _.countBy,
    _.entries,
    _.maxBy
  )(authorsFrequency)

  if (!mostFrequentAuthor) {
    return {}
  }

  const authorWithMostBlogs = {
    author: mostFrequentAuthor[0],
    blogs: mostFrequentAuthor[1]
  }

  return authorWithMostBlogs
}

const mostLikes = (blogPosts) => {
  if (blogPosts.length === 0) {
    return {}
  }
  const sortedBlogPosts = blogPosts.toSorted((a, b) => {
    if (a.author < b.author) {
      return -1
    }
    if (a.author > b.author) {
      return 1
    }

    return 0
  })

  const authorWithMostLikes = {
    author: '',
    likes: 0
  }

  let likes = 0
  let currentAuthor = ''

  for (const post of sortedBlogPosts) {
    if (post.author === currentAuthor) {
      likes = likes + post.likes
    } else {
      currentAuthor = post.author
      likes = post.likes
    }

    if (likes > authorWithMostLikes.likes) {
      authorWithMostLikes.author = post.author
      authorWithMostLikes.likes = likes
    }
  }

  return authorWithMostLikes
}
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostBlogsLodash, mostLikes }
