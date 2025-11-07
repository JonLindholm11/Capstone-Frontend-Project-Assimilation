export default function DisplaySalesman({ salesman, onLogout }) {
  if (!salesman) return null;

  return (
    <section className="salesman-info">
      <h1 className="page-title">Salesman Dashboard</h1>

      <div className="salesman-card">
        <h2>{salesman.name}</h2>
        <p>
          <strong>ID:</strong> {salesman.id}
        </p>
        <p>
          <strong>Email:</strong> {salesman.email}
        </p>
        <p>
          <strong>Region:</strong> {salesman.region}
        </p>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </section>
  );
}