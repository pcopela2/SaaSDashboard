export interface InstagramPost {
  id: string
  user_id: string
  image_url: string
  caption: string | null
  created_at: string
  user: {
    email: string
  }
  likes: Array<{
    id: string
    user_id: string
    post_id: string
    created_at: string
  }>
  comments: Array<{
    id: string
    content: string
    created_at: string
    user_id: string
    commenter: {
      email: string
    }
  }>
}

export interface InstagramLike {
  id: string
  user_id: string
  post_id: string
  created_at: string
}

export interface InstagramComment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  user: {
    email: string
  }
}

export interface CreatePostInput {
  image_url: string
  caption?: string | null
}

export interface CreateCommentInput {
  post_id: string
  content: string
} 