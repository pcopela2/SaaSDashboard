import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { InstagramPost, CreatePostInput, CreateCommentInput } from './types/instagram'

export const instagramService = {
  async listPosts(): Promise<InstagramPost[]> {
    const supabase = createClientComponentClient()
    
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) throw new Error('Authentication error')
      if (!user) throw new Error('Not authenticated')

      console.log('Fetching posts as user:', user.email)

      // Get posts with basic info
      const { data: posts, error } = await supabase
        .from('instagram_posts')
        .select(`
          id,
          user_id,
          image_url,
          caption,
          created_at
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Posts query error:', error)
        throw new Error(error.message || 'Failed to fetch posts')
      }

      if (!posts) return []

      // Get user info, likes, and comments separately
      const postsWithDetails = await Promise.all(
        posts.map(async (post) => {
          const [{ data: userInfo }, { data: likes }, { data: comments }] = await Promise.all([
            // Get user info
            supabase
              .from('auth.users')
              .select('email')
              .eq('id', post.user_id)
              .single(),
            // Get likes
            supabase
              .from('instagram_likes')
              .select('id, user_id, post_id, created_at')
              .eq('post_id', post.id),
            // Get comments with user info
            supabase
              .from('instagram_comments')
              .select(`
                id,
                content,
                created_at,
                user_id
              `)
              .eq('post_id', post.id)
              .order('created_at', { ascending: true })
          ])

          // Get commenter info for each comment
          const commentsWithUsers = await Promise.all(
            (comments || []).map(async (comment) => {
              const { data: commenter } = await supabase
                .from('auth.users')
                .select('email')
                .eq('id', comment.user_id)
                .single()
              
              return {
                ...comment,
                commenter: commenter || { email: 'Unknown' }
              }
            })
          )

          return {
            ...post,
            user: { email: userInfo?.email || 'Unknown' },
            likes: likes || [],
            comments: commentsWithUsers || []
          }
        })
      )

      return postsWithDetails
    } catch (error) {
      console.error('Error in listPosts:', error)
      throw error instanceof Error ? error : new Error('Unknown error in listPosts')
    }
  },

  async uploadImage(file: File): Promise<string> {
    const supabase = createClientComponentClient()
    
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('instagram-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw new Error(uploadError.message || 'Failed to upload image')
      }

      const { data: { publicUrl } } = supabase.storage
        .from('instagram-images')
        .getPublicUrl(fileName)

      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error instanceof Error ? error : new Error('Failed to upload image')
    }
  },

  async createPost(input: CreatePostInput): Promise<InstagramPost> {
    const supabase = createClientComponentClient()
    
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) throw new Error(authError.message)
      if (!user) throw new Error('Not authenticated')

      console.log('Creating post as user:', user.email, 'with input:', input)

      // Create the post
      const { data: post, error: insertError } = await supabase
        .from('instagram_posts')
        .insert({
          user_id: user.id,
          image_url: input.image_url,
          caption: input.caption
        })
        .select('id, user_id, image_url, caption, created_at')
        .single()

      if (insertError) {
        console.error('Post creation error:', insertError)
        throw new Error(insertError.message || 'Failed to create post')
      }

      // Get user info
      const { data: userInfo } = await supabase
        .from('auth.users')
        .select('email')
        .eq('id', post.user_id)
        .single()

      return {
        ...post,
        user: { email: userInfo?.email || 'Unknown' },
        likes: [],
        comments: []
      }
    } catch (error) {
      console.error('Error in createPost:', error)
      throw error instanceof Error ? error : new Error('Failed to create post')
    }
  },

  async toggleLike(postId: string): Promise<void> {
    const supabase = createClientComponentClient()
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data: existingLike } = await supabase
        .from('instagram_likes')
        .select()
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle()

      if (existingLike) {
        const { error } = await supabase
          .from('instagram_likes')
          .delete()
          .eq('id', existingLike.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('instagram_likes')
          .insert({
            post_id: postId,
            user_id: user.id
          })

        if (error) throw error
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      throw error
    }
  },

  async createComment(input: CreateCommentInput): Promise<void> {
    const supabase = createClientComponentClient()
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('instagram_comments')
        .insert({
          post_id: input.post_id,
          user_id: user.id,
          content: input.content
        })

      if (error) throw error
    } catch (error) {
      console.error('Error creating comment:', error)
      throw error
    }
  },

  async deleteComment(id: string): Promise<void> {
    const supabase = createClientComponentClient()
    
    try {
      const { error } = await supabase
        .from('instagram_comments')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting comment:', error)
      throw error
    }
  },

  async deletePost(id: string): Promise<void> {
    const supabase = createClientComponentClient()
    
    try {
      const { error } = await supabase
        .from('instagram_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting post:', error)
      throw error
    }
  }
} 