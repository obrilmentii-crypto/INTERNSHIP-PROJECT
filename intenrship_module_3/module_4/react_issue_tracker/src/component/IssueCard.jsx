function IssueCard({ issue, onDelete, onUpdateStatus }) {

  function handleStatus() {
    onUpdateStatus(issue.id);
  }

  function handleDelete() {
    onDelete(issue.id);
  }

  return (
    <div className="issue-card">

      <h3>{issue.title}</h3>

      <p>
        <strong>Description:</strong> {issue.description}
      </p>

      <p>
        <strong>Priority:</strong> {issue.priority}
      </p>

      <p>
        <strong>Status:</strong> {issue.status}
      </p>

      <p>
        <strong>Created:</strong> {issue.timestamp}
      </p>

      <button onClick={handleStatus}>
        Next Status
      </button>

      <button onClick={handleDelete}>
        Delete
      </button>

    </div>
  );
}

export default IssueCard;