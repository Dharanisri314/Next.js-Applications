'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const initialPosts = [
  {
    id: 1,
    title: '🚀 Getting Started with Next.js 14',
    excerpt: 'Learn how to build modern web applications with the latest features of Next.js including App Router and Server Components.',
    content: `## 🌟 Introduction

Next.js 14 brings exciting new features that make building modern web applications easier than ever. In this comprehensive guide, we'll explore the App Router, Server Components, and other cutting-edge features.

## 🆕 What's New in Next.js 14

The latest version of Next.js introduces several groundbreaking features:

### 📁 App Router
The new App Router provides a more intuitive way to structure your applications with improved performance and developer experience.

### ⚡ Server Components
Server Components allow you to render components on the server, reducing bundle size and improving performance.

### 🚄 Improved Performance
Next.js 14 comes with significant performance improvements, including faster builds and optimized runtime performance.

## 🏁 Getting Started

To get started with Next.js 14, simply run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

This will create a new Next.js application with all the latest features enabled by default.

## 🎯 Conclusion

Next.js 14 represents a major step forward in React development, offering developers powerful tools to build fast, scalable applications.`,
    author: 'John Doe',
    date: '2024-01-15',
    readTime: '5 min read',
    likes: 124,
    views: 1250,
    category: 'Web Development',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    title: '🎨 Modern CSS Techniques for Beautiful Layouts',
    excerpt: 'Discover the latest CSS features and techniques for creating beautiful and responsive web layouts.',
    content: `## 🌈 Introduction

CSS has evolved tremendously over the years, and modern CSS techniques allow developers to create stunning, responsive layouts with ease.

## 📐 CSS Grid and Flexbox

Modern layout systems like CSS Grid and Flexbox have revolutionized how we approach web layouts.

### 🔲 CSS Grid
CSS Grid provides a two-dimensional layout system that's perfect for complex layouts:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
\`\`\`

### 📏 Flexbox
Flexbox is ideal for one-dimensional layouts and component alignment:

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## 🎨 CSS Custom Properties

CSS custom properties (variables) make maintaining consistent designs much easier:

\`\`\`css
:root {
  --primary-color: #4f7df3;
  --secondary-color: #764ba2;
}
\`\`\`

## ✨ Conclusion

These modern CSS techniques provide powerful tools for creating beautiful, maintainable web interfaces.`,
    author: 'Jane Smith',
    date: '2024-01-12',
    readTime: '7 min read',
    likes: 89,
    views: 890,
    category: 'Design',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 3,
    title: '⚡ JavaScript Performance Optimization Guide',
    excerpt: 'Learn essential techniques to optimize your JavaScript code for better performance and user experience.',
    content: `## 🔥 Introduction

JavaScript performance optimization is crucial for creating fast, responsive web applications. Here are the essential techniques every developer should know.

## 📦 Code Splitting

Break your code into smaller chunks that load only when needed:

\`\`\`javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));
\`\`\`

## 🧠 Memoization

Use memoization to cache expensive calculations:

\`\`\`javascript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);
\`\`\`

## ⏱️ Debouncing and Throttling

Control the frequency of function calls:

\`\`\`javascript
const debouncedSearch = debounce((query) => {
  performSearch(query);
}, 300);
\`\`\`

## 🔄 Virtual DOM Optimization

Optimize React renders with proper key usage and component structure.

## 📊 Bundle Analysis

Regularly analyze your bundle size and remove unused dependencies.

## 🎯 Conclusion

These optimization techniques will significantly improve your application's performance and user experience.`,
    author: 'Mike Johnson',
    date: '2024-01-10',
    readTime: '6 min read',
    likes: 156,
    views: 1100,
    category: 'JavaScript',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  // Load posts from localStorage on component mount
  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        setPosts(parsedPosts);
      } else {
        // If no saved posts, use initial posts
        setPosts(initialPosts);
        localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts(initialPosts);
    }
    setIsLoading(false);
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      try {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
      } catch (error) {
        console.error('Error saving posts:', error);
      }
    }
  }, [posts]);

  const categories = ['All', 'Web Development', 'Design', 'Backend', 'CSS', 'JavaScript', 'React'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleReadMore = (post) => {
    // Increment view count
    const updatedPosts = posts.map(p => 
      p.id === post.id ? { ...p, views: p.views + 1 } : p
    );
    setPosts(updatedPosts);
    setSelectedPost({ ...post, views: post.views + 1 });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    setEditingPost(null);
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    
    // Update selected post if it's currently being viewed
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
    }
  };

  const handleEdit = (post) => {
    setEditingPost({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image
    });
    setSelectedPost(null);
  };

  const handleSaveEdit = () => {
    if (!editingPost.title.trim() || !editingPost.content.trim() || !editingPost.excerpt.trim()) {
      alert('❌ Please fill in all required fields!');
      return;
    }

    const updatedPosts = posts.map(post => 
      post.id === editingPost.id 
        ? { 
            ...post, 
            title: editingPost.title.trim(),
            excerpt: editingPost.excerpt.trim(),
            content: editingPost.content.trim(),
            category: editingPost.category,
            image: editingPost.image.trim() || post.image
          }
        : post
    );
    
    setPosts(updatedPosts);
    setEditingPost(null);
    alert('✅ Post updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  const handleDelete = (postId) => {
    setShowDeleteModal(postId);
  };

  const confirmDelete = () => {
    const updatedPosts = posts.filter(post => post.id !== showDeleteModal);
    setPosts(updatedPosts);
    setShowDeleteModal(null);
    setSelectedPost(null);
    alert('🗑️ Post deleted successfully!');
  };

  const cancelDelete = () => {
    setShowDeleteModal(null);
  };

  const insertHeading = (level) => {
    const headingPrefix = '#'.repeat(level) + ' ';
    const textarea = document.getElementById('edit-content');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    const newText = before + headingPrefix + after;
    setEditingPost({...editingPost, content: newText});
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + headingPrefix.length, start + headingPrefix.length);
    }, 0);
  };

  const insertCodeBlock = () => {
    const textarea = document.getElementById('edit-content');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    const codeBlock = '\n```\n// Your code here\n```\n';
    const newText = before + codeBlock + after;
    setEditingPost({...editingPost, content: newText});
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 5, start + 21);
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing content...</p>
      </div>
    );
  }

  // Edit Mode
  if (editingPost) {
    return (
      <div>
        <nav className="nav">
          <div className="container nav-container">
            <div className="logo">
              <div className="logo-icon">📚</div>
              <span>DevBlog Pro</span>
            </div>
            <div className="nav-actions">
              <button onClick={handleCancelEdit} className="btn btn-secondary">← Cancel</button>
              <button onClick={handleSaveEdit} className="btn btn-primary">💾 Save Changes</button>
            </div>
          </div>
        </nav>

        <div className="edit-container">
          <div className="edit-header">
            <h1 className="edit-title">✏️ Edit Post</h1>
            <p className="edit-subtitle">Update your post content</p>
          </div>

          <div className="edit-form">
            <div className="form-group">
              <label htmlFor="edit-title">Post Title *</label>
              <input
                type="text"
                id="edit-title"
                value={editingPost.title}
                onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                className="form-input"
                placeholder="Enter post title..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-category">Category *</label>
              <select
                id="edit-category"
                value={editingPost.category}
                onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                className="form-select"
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
              <label htmlFor="edit-image">Post Image URL</label>
              <input
                type="url"
                id="edit-image"
                value={editingPost.image}
                onChange={(e) => setEditingPost({...editingPost, image: e.target.value})}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
              {editingPost.image && (
                <div className="image-preview">
                  <img src={editingPost.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="edit-excerpt">Excerpt *</label>
              <textarea
                id="edit-excerpt"
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                className="form-textarea"
                rows="3"
                placeholder="Brief description..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-content">Content *</label>
              <div className="formatting-toolbar">
                <button type="button" onClick={() => insertHeading(2)} className="format-btn">H2</button>
                <button type="button" onClick={() => insertHeading(3)} className="format-btn">H3</button>
                <button type="button" onClick={insertCodeBlock} className="format-btn">{'</>'}</button>
              </div>
              <textarea
                id="edit-content"
                value={editingPost.content}
                onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                className="form-textarea content-textarea"
                rows="15"
                placeholder="Write your content..."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Delete Modal
  if (showDeleteModal) {
    return (
      <div className="modal-overlay">
        <div className="delete-modal">
          <div className="modal-header">
            <h3>🗑️ Delete Post</h3>
          </div>
          <div className="modal-content">
            <p>Are you sure you want to delete this post? This action cannot be undone.</p>
          </div>
          <div className="modal-actions">
            <button onClick={cancelDelete} className="btn btn-secondary">Cancel</button>
            <button onClick={confirmDelete} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }

  // If a post is selected, show the full article view
  if (selectedPost) {
    return (
      <div>
        <nav className="nav">
          <div className="container nav-container">
            <div className="logo">
              <div className="logo-icon">📚</div>
              <span>DevBlog Pro</span>
            </div>
            <div className="nav-actions">
              <button onClick={handleBackToList} className="btn btn-secondary">← Back to Articles</button>
              <button onClick={() => handleEdit(selectedPost)} className="btn btn-warning">✏️ Edit</button>
              <button onClick={() => handleDelete(selectedPost.id)} className="btn btn-danger">🗑️ Delete</button>
              <Link href="/blog/write" className="btn btn-primary">✍️ Write Post</Link>
            </div>
          </div>
        </nav>

        <div className="article-container">
          <div className="article-header">
            <div className="article-meta">
              <span className={`category-badge ${selectedPost.category.toLowerCase().replace(' ', '-')}`}>
                {selectedPost.category}
              </span>
              <span className="article-date">📅 {selectedPost.date}</span>
              <span className="article-views">👁️ {selectedPost.views}</span>
            </div>
            <h1 className="article-title">{selectedPost.title}</h1>
            <div className="article-author-info">
              <span className="article-author">👤 {selectedPost.author}</span>
              <span className="article-read-time">⏱️ {selectedPost.readTime}</span>
              <button 
                onClick={() => handleLike(selectedPost.id)}
                className="like-btn"
              >
                👍 {selectedPost.likes}
              </button>
            </div>
          </div>

          <div className="article-image">
            <img src={selectedPost.image} alt={selectedPost.title} />
          </div>

          <div className="article-content">
            {selectedPost.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="content-heading">{paragraph.replace('## ', '')}</h2>;
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="content-subheading">{paragraph.replace('### ', '')}</h3>;
              } else if (paragraph.startsWith('```')) {
                const codeContent = paragraph.replace(/```\w*\n?/g, '').replace(/```/g, '');
                return <pre key={index} className="code-block"><code>{codeContent}</code></pre>;
              } else if (paragraph.trim()) {
                return <p key={index} className="content-paragraph">{paragraph}</p>;
              }
              return null;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="nav">
        <div className="container nav-container">
          <div className="logo">
            <div className="logo-icon">📚</div>
            <span>DevBlog Pro</span>
          </div>
          <div className="nav-actions">
            <Link href="/blog/write" className="btn btn-primary">✍️ Write Post</Link>
            <Link href="/tasks" className="btn btn-success">📋 Task Manager</Link>
          </div>
        </div>
      </nav>

      <div className="blog-container">
        <div className="blog-header">
          <h1 className="blog-title">
            Discover Amazing <span className="highlight">Content</span>
          </h1>
          <p className="blog-subtitle">
            Explore the latest insights, tutorials, and trends in web development,
            design, and technology. Create and share your own posts!
          </p>
        </div>

        <div className="blog-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="categories">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="no-posts">
            <h3>No posts found</h3>
            <p>Try adjusting your search or category filter</p>
          </div>
        ) : (
          <>
            <div className="featured-section">
              <h2 className="section-title">🏆 Featured Article</h2>
              <div className="featured-article">
                <div className="featured-image">
                  <img src={filteredPosts[0]?.image} alt={filteredPosts[0]?.title} />
                </div>
                <div className="featured-content">
                  <div className="article-meta">
                    <span className={`category-badge ${filteredPosts[0]?.category.toLowerCase().replace(' ', '-')}`}>
                      {filteredPosts[0]?.category}
                    </span>
                    <span className="date">📅 {filteredPosts[0]?.date}</span>
                    <span className="views">👁️ {filteredPosts[0]?.views}</span>
                  </div>
                  <h3 className="article-title">{filteredPosts[0]?.title}</h3>
                  <p className="article-excerpt">{filteredPosts[0]?.excerpt}</p>
                  <div className="article-footer">
                    <div className="author-info">
                      <span className="author">👤 {filteredPosts[0]?.author}</span>
                      <span className="read-time">⏱️ {filteredPosts[0]?.readTime}</span>
                      <button 
                        onClick={() => handleLike(filteredPosts[0]?.id)}
                        className="likes-btn"
                      >
                        👍 {filteredPosts[0]?.likes}
                      </button>
                    </div>
                    <div className="article-actions">
                      <button 
                        onClick={() => handleReadMore(filteredPosts[0])}
                        className="btn btn-primary"
                      >
                        Read More
                      </button>
                      <button 
                        onClick={() => handleEdit(filteredPosts[0])}
                        className="btn btn-warning"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(filteredPosts[0]?.id)}
                        className="btn btn-danger"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {filteredPosts.length > 1 && (
              <div className="recent-section">
                <h2 className="section-title">🔥 Recent Articles</h2>
                <div className="articles-grid">
                  {filteredPosts.slice(1).map(post => (
                    <div key={post.id} className="article-card">
                      <div className="article-image">
                        <img src={post.image} alt={post.title} />
                      </div>
                      <div className="article-content">
                        <div className="article-meta">
                          <span className={`category-badge ${post.category.toLowerCase().replace(' ', '-')}`}>
                            {post.category}
                          </span>
                          <span className="date">📅 {post.date}</span>
                        </div>
                        <h3 className="article-title">{post.title}</h3>
                        <p className="article-excerpt">{post.excerpt}</p>
                        <div className="article-footer">
                          <div className="author-info">
                            <span className="author">👤 {post.author}</span>
                            <span className="read-time">⏱️ {post.readTime}</span>
                            <button 
                              onClick={() => handleLike(post.id)}
                              className="likes-btn"
                            >
                              👍 {post.likes}
                            </button>
                          </div>
                          <div className="article-actions">
                            <button 
                              onClick={() => handleReadMore(post)}
                              className="btn btn-primary"
                            >
                              Read More
                            </button>
                            <button 
                              onClick={() => handleEdit(post)}
                              className="btn btn-warning"
                            >
                              ✏️
                            </button>
                            <button 
                              onClick={() => handleDelete(post.id)}
                              className="btn btn-danger"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}