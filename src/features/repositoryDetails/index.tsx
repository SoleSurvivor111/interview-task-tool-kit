import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_DETAILS } from '../../shared/api/queries';

interface RepositoryDetailsProps {
  owner: string;
  name: string;
}

const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({ owner, name }) => {
  const { loading, error, data } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { owner, name },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data</p>;

  const { repository } = data;

  return (
    <div>
      <h1>
        {repository.name} - {repository.stargazers.totalCount} stars - Last commit: {repository.pushedAt}
      </h1>
      <img src={repository.owner.avatarUrl} alt={repository.owner.login} />
      <p>
        <a href={repository.owner.url}>{repository.owner.login}</a>
      </p>
      <h2>Languages</h2>
      <ul>
        {repository.languages.edges.map((language: any) => (
          <li key={language.node.id}>{language.node.name}</li>
        ))}
      </ul>
      <p>{repository.description}</p>
    </div>
  );
};

export default RepositoryDetails;
