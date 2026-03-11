import { Link, Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">

      <header className="flex justify-between items-center px-10 py-4 bg-gray-100 shadow">
        <h1 className="text-xl font-bold">User Management</h1>

        <nav className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/add-user">Add User</Link>
        </nav>
      </header>

      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;