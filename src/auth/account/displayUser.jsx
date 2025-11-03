export default function DisplayAccount({user}) {
  return (
    <div className="user">
        <h2>Account Information</h2>
        <p><strong>Email:</strong> {user.email}</p>
    </div>
  )
}
