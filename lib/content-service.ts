import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export interface Content {
  id: string
  title: string
  type: 'Article' | 'Page' | 'Email'
  status: 'Draft' | 'Published'
  content?: string
  created_at: string
  updated_at: string
}

export type ContentType = 'Article' | 'Page' | 'Email'
export type ContentStatus = 'Draft' | 'Published'

export interface CreateContentInput {
  title: string
  type: ContentType
  status: ContentStatus
  content: string
}

export interface UpdateContentInput extends Partial<CreateContentInput> {
  id: string
}

export const contentService = {
  async listContents(): Promise<Content[]> {
    const supabase = createClientComponentClient()
    
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error listing contents:', error)
        throw new Error(error.message)
      }
      return data
    } catch (err) {
      console.error('Error in listContents:', err)
      throw new Error('Failed to list contents')
    }
  },

  async getContent(id: string): Promise<Content> {
    const supabase = createClientComponentClient()
    
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error getting content:', error)
        throw new Error(error.message)
      }
      return data
    } catch (err) {
      console.error('Error in getContent:', err)
      throw new Error('Failed to get content')
    }
  },

  async createContent(input: CreateContentInput): Promise<Content> {
    const supabase = createClientComponentClient()
    
    try {
      console.log('Creating content with input:', input)
      const { data, error } = await supabase
        .from('content')
        .insert([input])
        .select()
        .single()

      if (error) {
        console.error('Error creating content:', error)
        throw new Error(error.message)
      }
      if (!data) {
        throw new Error('No data returned from create operation')
      }
      return data
    } catch (err) {
      console.error('Error in createContent:', err)
      throw new Error('Failed to create content')
    }
  },

  async updateContent({ id, ...input }: UpdateContentInput): Promise<Content> {
    const supabase = createClientComponentClient()
    
    console.log('Updating content with input:', { id, ...input })
    const { data, error } = await supabase
      .from('content')
      .update(input)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating content:', error)
      throw new Error(error.message)
    }
    if (!data) {
      throw new Error('No data returned from update operation')
    }
    return data
  },

  async deleteContent(id: string): Promise<void> {
    const supabase = createClientComponentClient()
    
    console.log('Deleting content with id:', id)
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting content:', error)
      throw new Error(error.message)
    }
  },
} 