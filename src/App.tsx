import { useQuery } from '@tanstack/react-query';
import { FC, useMemo, useState } from 'react';

const API_URL = 'http://localhost:3000/users';

type User = {
  name: string;
  email: string;
  country: string;
  gender: string;
};

export const App: FC = () => {
  const [selectedOption, setSelectedOption] = useState('name');
  const [filterValue, setFilterValue] = useState('');

  const filter = useMemo(
    () => (filterValue ? { selectedOption, filterValue } : null),
    [filterValue, selectedOption]
  );

  const users = useQuery({
    queryKey: ['users', filter],
    queryFn: async () => {
      let url = API_URL;
      if (filter) url += `?${filter.selectedOption}=${filter.filterValue}`;
      const response = await fetch(url);
      const data: User[] = await response.json();
      return data;
    },
  });

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="radio"
            id="nome"
            name="option"
            value="nome"
            checked={selectedOption === 'name'}
            onChange={() => handleOptionChange('name')}
          />
          <label htmlFor="nome">Nome</label>
        </div>
        <div>
          <input
            type="radio"
            id="email"
            name="option"
            value="email"
            checked={selectedOption === 'email'}
            onChange={() => handleOptionChange('email')}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input
            type="radio"
            id="genero"
            name="option"
            value="genero"
            checked={selectedOption === 'gender'}
            onChange={() => handleOptionChange('gender')}
          />
          <label htmlFor="genero">Gênero</label>
        </div>
        <div>
          <input
            type="radio"
            id="pais"
            name="option"
            value="pais"
            checked={selectedOption === 'country'}
            onChange={() => handleOptionChange('country')}
          />
          <label htmlFor="pais">País</label>
        </div>
        <input
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
      {users.isLoading && <div>Loading...</div>}
      {users.isError && <div>Error</div>}
      {users.data && (
        <div>
          <table>
            <thead>
              <tr>
                <th>nome</th>
                <th>email</th>
                <th>pais</th>
                <th>gênero</th>
              </tr>
            </thead>
            <tbody>
              {users.data.map((user) => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>{user.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
