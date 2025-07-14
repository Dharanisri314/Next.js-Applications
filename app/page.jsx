import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <nav className="nav">
        <div className="container nav-container">
          <div className="logo">
            <div className="logo-icon">📚</div>
            <span>DevBlog Pro</span>
          </div>
          <ul className="nav-links">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/tasks">Tasks</Link></li>
          </ul>
        </div>
      </nav>

      <div className="container home-container">
        <h1 className="home-title">Welcome to DevBlog Pro</h1>
        <p className="home-subtitle">
          Discover amazing content and manage your tasks like a pro. 
          Choose your application to get started.
        </p>
        
        <div className="home-buttons">
          <Link href="/blog" className="home-button blog">
            📖 Explore Blog
          </Link>
          <Link href="/tasks" className="home-button tasks">
            ✅ Task Manager
          </Link>
        </div>
      </div>
    </div>
  );
}