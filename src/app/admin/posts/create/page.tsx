'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your post here...</p>',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const content = editor?.getHTML()
    
    // TODO: Implement the API call to create a post
    console.log({ title, description, content })
    
    // Reset form
    setTitle('')
    setDescription('')
    editor?.commands.setContent('<p>Start writing your post here...</p>')
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Content</Label>
          <EditorContent editor={editor} className="border p-2 min-h-[200px]" />
        </div>
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  )
}