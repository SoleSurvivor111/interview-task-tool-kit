import React from 'react';
import { Link } from 'react-router-dom';

interface RepositoryListProps {
  loading: boolean;
  error: any;
  list: any;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ loading, error, list }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!list.length) return <p>No data</p>;

  return (
    <ul>
      {list.map((repo: any) => (
        <li key={repo.node.name}>
          <Link to={`/repository/${repo.node.owner.login}/${repo.node.name}`}>
            {repo.node.name} - {repo.node.stargazers?.totalCount || repo.node.stargazerCount} stars - Last commit:{' '}
            {new Date(repo.node.pushedAt || repo.node.updatedAt).toLocaleDateString()}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default RepositoryList;
