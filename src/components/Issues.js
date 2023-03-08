//Issues component
const Issues = ({ issues }) => {
  return (
    <div>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <div className="issues-list">
              <div>
                <span className="icon">
                  <i className="fa-regular fa-circle-dot"></i>
                </span>

                <a className="issue-title" href={issue.html_url}>
                  {issue.title}
                </a>
                <p>
                  # {issue.number} opened on {issue.updated_at} by
                  <a href={issue.user.html_url}> {issue.user.login}</a>
                </p>
              </div>
              <p className="comment">
                <span className="icon">
                  <i className="fa-regular fa-message"></i>
                </span>
                {issue.comments}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Issues;
