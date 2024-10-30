import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_DETAILS } from '../../shared/api/queries';

const Repository: React.FC = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const { loading, error, data } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { owner, name },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { repository } = data;

  return (
    <div>
      <h1>{repository.name}</h1>
      <p>Stars: {repository.stargazers.totalCount}</p>
      <p>Last Commit: {new Date(repository.pushedAt).toLocaleDateString()}</p>
      <p>
        Owner: <a href={repository.owner.url}>{repository.owner.login}</a>
      </p>
      <img src={repository.owner.avatarUrl} alt={repository.owner.login} />
      <p>Languages: {repository.languages.edges?.map((lang: any) => lang.node.name).join(', ')}</p>
      <p>Description: {repository.description}</p>
    </div>
  );
};

export default Repository;
