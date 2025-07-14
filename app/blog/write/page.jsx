'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WritePost() {
  const router = useRouter();
  const [post, setPost] = useState({
    title: '',
    category: 'Web Development',
    content: '',
    excerpt: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!post.title.trim() || !post.content.trim() || !post.excerpt.trim()) {
      alert('❌ Please fill in all required fields!');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get existing posts from localStorage
      const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      
      // Create new post with proper data
      const newPost = {
        id: Date.now(),
        title: post.title.trim(),
        excerpt: post.excerpt.trim(),
        content: post.content.trim(),
        category: post.category,
        author: 'You',
        date: new Date().toISOString().split('T')[0],
        readTime: Math.max(1, Math.ceil(post.content.split(' ').length / 200)) + ' min read',
        likes: 0,
        views: 0,
        image: post.imageUrl.trim() || getRandomImage(post.category)
      };

      // Add new post to the beginning of the array
      const updatedPosts = [newPost, ...existingPosts];
      
      // Save to localStorage
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      
      // Show success message
      alert('🎉 Post published successfully! Redirecting to blog...');
      
      // Reset form
      setPost({
        title: '',
        category: 'Web Development',
        content: '',
        excerpt: '',
        imageUrl: ''
      });

      // Small delay to show success message, then redirect
      setTimeout(() => {
        router.push('/blog');
      }, 1000);

    } catch (error) {
      console.error('Error saving post:', error);
      alert('❌ Error publishing post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRandomImage = (category) => {
    const images = {
      'Web Development': [
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'Design': [
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'JavaScript': [
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'React': [
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'CSS': [
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'Backend': [
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    };
    
    const categoryImages = images[category] || images['Web Development'];
    return categoryImages[Math.floor(Math.random() * categoryImages.length)];
  };

  const insertHeading = (level) => {
    const headingPrefix = '#'.repeat(level) + ' ';
    const textarea = document.getElementById('content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    const newText = before + headingPrefix + after;
    setPost({...post, content: newText});
    
    // Set cursor position after the heading prefix
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + headingPrefix.length, start + headingPrefix.length);
    }, 0);
  };

  const insertCodeBlock = () => {
    const textarea = document.getElementById('content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    const codeBlock = '\n```\n// Your code here\n```\n';
    const newText = before + codeBlock + after;
    setPost({...post, content: newText});
    
    // Set cursor position inside the code block
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 5, start + 21);
    }, 0);
  };

  return (
    <div>
      <nav className="nav">
        <div className="container nav-container">
          <div className="logo">
            <div className="logo-icon">📚</div>
            <span>DevBlog Pro</span>
          </div>
          <div className="nav-actions">
            <Link href="/blog" className="btn btn-primary">← Back to Blog</Link>
          </div>
        </div>
      </nav>

      <div className="write-container">
        <div className="write-header">
          <h1 className="write-title">✍️ Write New Post</h1>
          <p className="write-subtitle">Share your knowledge with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="write-form">
          <div className="form-group">
            <label htmlFor="title">Post Title *</label>
            <input
              type="text"
              id="title"
              value={post.title}
              onChange={(e) => setPost({...post, title: e.target.value})}
              placeholder="Enter an engaging title..."
              className="form-input"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              value={post.category}
              onChange={(e) => setPost({...post, category: e.target.value})}
              className="form-select"
              disabled={isSubmitting}
            >
              <option value="Web Development">Web Development</option>
              <option value="Design">Design</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="CSS">CSS</option>
              <option value="Backend">Backend</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Post Image URL (Optional)</label>
            <input
              type="url"
              id="imageUrl"
              value={post.imageUrl}
              onChange={(e) => setPost({...post, imageUrl: e.target.value})}
              placeholder="https://example.com/your-image.jpg"
              className="form-input"
              disabled={isSubmitting}
            />
            <small className="form-help">
              💡 Add a custom image URL for your post. If left empty, we'll choose one automatically.
            </small>
            {post.imageUrl && (
              <div className="image-preview">
                <img src={post.imageUrl} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt *</label>
            <textarea
              id="excerpt"
              value={post.excerpt}
              onChange={(e) => setPost({...post, excerpt: e.target.value})}
              placeholder="Write a brief description of your post..."
              className="form-textarea"
              rows="3"
              required
              disabled={isSubmitting}
            />
            <small className="form-help">This will be shown in the article preview</small>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            
            <div className="formatting-toolbar">
              <button type="button" onClick={() => insertHeading(2)} className="format-btn" title="Heading 2">
                H2
              </button>
              <button type="button" onClick={() => insertHeading(3)} className="format-btn" title="Heading 3">
                H3
              </button>
              <button type="button" onClick={insertCodeBlock} className="format-btn" title="Code Block">
                {'</>'}
              </button>
            </div>
            
            <textarea
              id="content"
              value={post.content}
              onChange={(e) => setPost({...post, content: e.target.value})}
              placeholder="Write your post content here... 

## Main Heading
Use ## for main headings

### Sub Heading  
Use ### for sub headings

```
// Code blocks
function example() {
  return 'Hello World';
}
```"
              className="form-textarea content-textarea"
              rows="15"
              required
              disabled={isSubmitting}
            />
            <small className="form-help">
              💡 Tips: Use ## for headings, ### for subheadings, and ``` for code blocks. Use the toolbar buttons above for quick formatting!
            </small>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary publish-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? '🔄 Publishing...' : '🚀 Publish Post'}
            </button>
            <Link href="/blog" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}