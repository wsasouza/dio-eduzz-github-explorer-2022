import { useEffect, useState } from 'react';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { Header, RepositoryInfo, Issues } from './styles';

// interface IRepositoryParams {
//   repository: string;
// }
// interface IRepositoryParams {
//   path: string;
//   caseSensitive?: boolean;
//   end?: boolean;
// }

interface IRepository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<IRepository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const location = useLocation();

  const repos = location.pathname.replace('/repositories/', '');

  useEffect(() => {
    api.get(`repos/${repos}`).then(response => {
      setRepository(response.data);
    });
    api.get(`repos/${repos}/issues`).then(response => {
      setIssues(response.data);
    });
  }, [repos]);

  return (
    <>
      <Header>
        <img src={logoImg} alt='Github Explorer' />
        <Link to='/'>
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={30} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
