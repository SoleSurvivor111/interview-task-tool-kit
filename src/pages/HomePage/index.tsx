import { useQuery } from '@apollo/client';
import { $currentPage, $searchQuery, resetPagination, setCurrentPage, setSearchQuery } from 'app/store';
import { useUnit } from 'effector-react';
import React, { useCallback, useMemo } from 'react';
import { GET_OWNER_REPOSITORIES, GET_REPOSITORIES } from 'shared/api/queries';
import Paginator from '../../widgets/Paginator';
import RepositoryList from '../../widgets/RepositoryList';
import SearchBar from '../../widgets/SearchBar';

const ITEMS_PER_PAGE = 10;

const Home: React.FC = () => {
  const searchQuery = useUnit($searchQuery);
  const currentPage = useUnit($currentPage);
  const offsetStartCursor = useMemo(() => `cursor:${ITEMS_PER_PAGE * (currentPage - 1)}`, [currentPage]);
  const encodedStartCursor = useMemo(() => btoa(offsetStartCursor), [offsetStartCursor]);

  const {
    loading: reposLoading,
    error: reposError,
    data: reposData,
  } = useQuery(GET_REPOSITORIES, {
    variables: {
      first: ITEMS_PER_PAGE,
      query: searchQuery,
      after: encodedStartCursor,
    },
    skip: !searchQuery,
  });

  const {
    loading: ownerReposLoading,
    error: ownerReposError,
    data: ownerReposData,
  } = useQuery(GET_OWNER_REPOSITORIES, {
    variables: {
      first: ITEMS_PER_PAGE,
      after: encodedStartCursor,
    },
  });

  const totalPages = useMemo(
    () =>
      Math.ceil(
        (searchQuery ? reposData?.search.repositoryCount : ownerReposData?.viewer.repositories.totalCount) /
          ITEMS_PER_PAGE,
      ) || 0,
    [reposData?.search.repositoryCount, ownerReposData?.viewer.repositories.totalCount],
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    resetPagination();
  }, []);

  return (
    <div>
      <h1>Поиск</h1>
      <SearchBar query={searchQuery} onChange={handleSearch} dataTestId="search" />
      <RepositoryList
        loading={searchQuery ? reposLoading : ownerReposLoading}
        error={searchQuery ? reposError : ownerReposError}
        list={searchQuery ? reposData?.search.edges : ownerReposData?.viewer.repositories.edges}
      />
      <Paginator
        totalPages={totalPages}
        currentPage={currentPage}
        maxVisibleItems={20}
        isLoading={reposLoading}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
