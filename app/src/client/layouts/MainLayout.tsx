import { Outlet, Link } from 'react-router-dom'

export default function MainLayout() {
    return (
        <div>
            <header style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
                <nav style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/users/123">User 123</Link>
                    <Link to="/search?term=react&page=1">Search React</Link>
                </nav>
            </header>

            <main style={{ padding: '1rem' }}>
                <Outlet /> {/* This is where nested pages render */}
            </main>

            <footer style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
                © 2025 My App
            </footer>
        </div>
    )
}
