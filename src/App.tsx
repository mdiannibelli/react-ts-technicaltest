import { useEffect, useMemo, useRef, useState } from 'react';
import { User } from './types/user';
import UserGrid from './components/UserGrid';

const USER_QUANTITY = 100;
const API_URL = `https://randomuser.me/api/?results=${USER_QUANTITY}`;

function App() {
  const [usernames, setUsernames] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isColored, setIsColored] = useState(false);
  const [isOrderByCountries, setIsOrderByCountries] = useState(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const usersCopy = useRef<User[]>([]);

  // Fetch
  useEffect(() => {
    const getUsernames = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(API_URL);
        const data = await res.json();
        setUsernames(data.results);
        usersCopy.current = data.results;
        setIsLoading(false);
      } catch (error) {
        throw new Error('Error at fetching API.');
      }
    };
    getUsernames();
  }, []);

  // Toggle Color
  const toggleColor = () => {
    setIsColored(!isColored);
  };

  // Filter by input
  const filteredUsers = useMemo(() => {
    console.log('filteredUsernames');
    return searchValue !== null && searchValue.length > 0 ?
      usernames.filter(u => {
        return u.location.country.toLowerCase().includes(searchValue.toLowerCase());
      }) : usernames;
  }, [usernames, searchValue]);

  // Order by countries
  const toggleOrderByCountries = () => {
    setIsOrderByCountries(!isOrderByCountries);
  };

  const sortedUsernames = useMemo(() => {
    console.log('sortedUsernames');
    return isOrderByCountries ?
      [...filteredUsers].sort((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      }) : filteredUsers;
  }, [filteredUsers, isOrderByCountries]);


  // Delete user
  const deleteUserById = (cell: string) => {
    setUsernames(usernames.filter(u => u.cell !== cell));
  };

  // Reset usernames
  const resetUsernames = () => {
    setUsernames(usersCopy.current);
  };

  // Filter by input
  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <>
      <main className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-semibold text-white mt-24">User Finder</h1>
        <header className='my-4 flex gap-x-4'>
          <button className='py-1 px-4 border-[1px] border-slate-700 rounded-md hover:bg-cyan-500 duration-300' onClick={toggleColor} >Color rows</button>
          <button disabled={searchValue !== null && searchValue.length !== 0} className={`${(searchValue !== null && searchValue.length !== 0) && 'bg-slate-600 bg-opacity-25 hover:bg-slate-600 hover:bg-opacity-25'} py-1 px-4 border-[1px] border-slate-700 rounded-md hover:bg-cyan-500 duration-300`} onClick={toggleOrderByCountries} >Order by Countries</button>
          <button className='py-1 px-4 border-[1px] border-slate-700 rounded-md hover:bg-cyan-500 duration-300' onClick={resetUsernames} >Reset users</button>
          <input className='select-none outline-none border-[1px] border-slate-700 rounded-md bg-slate-800 p-2' type="text" placeholder='Search country..' onChange={(e) => handleChangeValue(e)} />
        </header>
        <div className='w-full p-4'>
          {isLoading === true ? <p className='flex justify-center items-center text-xl text-white'>Loading...</p> : <UserGrid usernames={sortedUsernames} isColored={isColored} deleteUserById={deleteUserById} />}
        </div>
      </main>
    </>
  );
}

export default App;
