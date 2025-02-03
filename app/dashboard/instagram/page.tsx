'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, MessageCircle, Trash2, X } from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import { instagramService } from '@/lib/instagram-service'
import type { InstagramPost } from '@/lib/types/instagram'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { CreatePost } from '@/components/instagram/create-post'

export default function InstagramPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) return // Don't load if not authenticated
    loadPosts()
  }, [user])

  const loadPosts = async () => {
    try {
      setIsLoading(true)
      console.log('Loading posts with user:', user?.email) // Debug log
      const posts = await instagramService.listPosts()
      console.log('Loaded posts:', posts) // Debug log
      setPosts(posts)
    } catch (error) {
      console.error('Error loading posts:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load posts',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = async (postId: string) => {
    try {
      await instagramService.toggleLike(postId)
      await loadPosts()
    } catch (error) {
      console.error('Error toggling like:', error)
      toast({
        title: 'Error',
        description: 'Failed to like post',
        variant: 'destructive',
      })
    }
  }

  const handleComment = async (postId: string) => {
    if (!newComment.trim()) return

    try {
      setIsSubmitting(true)
      await instagramService.createComment({
        post_id: postId,
        content: newComment.trim(),
      })
      setNewComment('')
      await loadPosts()
    } catch (error) {
      console.error('Error creating comment:', error)
      toast({
        title: 'Error',
        description: 'Failed to post comment',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    try {
      await instagramService.deletePost(postId)
      await loadPosts()
      setSelectedPost(null)
      toast({
        title: 'Success',
        description: 'Post deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting post:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    try {
      await instagramService.deleteComment(commentId)
      await loadPosts()
      toast({
        title: 'Success',
        description: 'Comment deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting comment:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete comment',
        variant: 'destructive',
      })
    }
  }

  const canModifyPost = (post: InstagramPost) => {
    return user?.email === 'parkerobx@gmail.com' || post.user_id === user?.id
  }

  const canModifyComment = (comment: InstagramPost['comments'][0]) => {
    return user?.email === 'parkerobx@gmail.com' || comment.user_id === user?.id
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Instagram Feed</h1>
          {user && <p className="text-sm text-gray-500">Logged in as {user.email}</p>}
        </div>
        <CreatePost onSuccess={loadPosts} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts yet. Be the first to share!</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative aspect-square cursor-pointer group"
                onClick={() => setSelectedPost(post)}
              >
                <Image
                  src={post.image_url}
                  alt={post.caption || ''}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 text-white">
                  <div className="flex items-center">
                    <Heart className="w-6 h-6 mr-2" />
                    <span>{post.likes.length}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-6 h-6 mr-2" />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Post modal */}
          <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogTitle className="sr-only">
                Post Details
              </DialogTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image */}
                <div className="relative aspect-square">
                  {selectedPost && (
                    <Image
                      src={selectedPost.image_url}
                      alt={selectedPost.caption || ''}
                      fill
                      className="object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Comments section */}
                <div className="flex flex-col h-full">
                  {selectedPost && (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">
                          Posted by {selectedPost.user.email}
                        </span>
                        {canModifyPost(selectedPost) && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeletePost(selectedPost.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      {selectedPost.caption && (
                        <p className="text-sm mb-4">{selectedPost.caption}</p>
                      )}

                      <div className="flex items-center space-x-4 mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLike(selectedPost.id)}
                        >
                          <Heart
                            className={`h-4 w-4 mr-2 ${
                              selectedPost.likes.some(
                                (like) => like.user_id === user?.id
                              )
                                ? 'fill-red-500 stroke-red-500'
                                : ''
                            }`}
                          />
                          {selectedPost.likes.length}
                        </Button>
                        <span className="text-sm text-gray-500">
                          {selectedPost.comments.length} comments
                        </span>
                      </div>

                      <div className="flex-1 overflow-y-auto mb-4">
                        {selectedPost.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="flex items-start justify-between mb-2"
                          >
                            <div>
                              <span className="text-sm font-medium">
                                {comment.commenter.email}
                              </span>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                            {canModifyComment(comment) && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Input
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              handleComment(selectedPost.id)
                            }
                          }}
                        />
                        <Button
                          onClick={() => handleComment(selectedPost.id)}
                          disabled={isSubmitting || !newComment.trim()}
                        >
                          Post
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
} 