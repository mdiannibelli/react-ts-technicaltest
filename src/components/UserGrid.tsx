import { User } from '../types/user';

interface Props {
    usernames: User[]
    isColored: boolean
    deleteUserById: (id: string) => void
}

const UserGrid = ({ usernames, isColored, deleteUserById }: Props) => {
    return (
        <table className='w-full text-center'>
            <thead className='h-12'>
                <tr>
                    <th className='text-center'>Picture</th>
                    <th className='text-center'>Name</th>
                    <th className='text-center'>Lastname</th>
                    <th className='text-center'>Country</th>
                    <th className='text-center'>Email</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>

            <tbody>
                {usernames.map((user, index) => (
                    <tr key={index} className={`${isColored && (index % 2 === 0) ? 'bg-slate-500 bg-opacity-30' : 'bg-slate-700 bg-opacity-30'} hover:bg-cyan-500 duration-300`}>
                        <td className='flex justify-center'><img src={user.picture.thumbnail} alt={`Picture of ${user.name.first} ${user.name.last}`} /></td>
                        <td className='border-l-2 border-slate-700 border-opacity-50'>{user.name.first}</td>
                        <td className='border-l-2 border-slate-700 border-opacity-50'>{user.name.last}</td>
                        <td className='border-l-2 border-slate-700 border-opacity-50'>{user.location.country}</td>
                        <td className='border-l-2 border-slate-700 border-opacity-50'>{user.email}</td>
                        <td className='border-l-2 border-slate-700 border-opacity-50'><button onClick={() => deleteUserById(user.cell)} className='py-1 px-2 border-[1px] border-slate-700 rounded-md hover:bg-red-500 duration-300'>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserGrid;
