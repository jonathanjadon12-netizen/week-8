function User({ user }) {
  return (
    <div className="p-4 border rounded shadow bg-white">
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>DOB:</strong> {user.dateOfBirth}</p>
      <p><strong>Mobile:</strong> {user.mobileNumber}</p>
    </div>
  );
}

export default User;