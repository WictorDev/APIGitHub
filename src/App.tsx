import { useState } from 'react';
import GitHubProfile from './components/GitHubProfile/GitHubProfile.tsx'
import 'bootstrap-icons/font/bootstrap-icons.css';



import './App.css'




function App() {

  const [tempusername, settempusername] = useState<string>('');
  const [username1, setUsername] = useState<string | null>(null);
  const [clicou, setclicou] = useState<boolean>(false);


  const receberusername = (e: React.ChangeEvent<HTMLInputElement>) => {
    settempusername(e.target.value);
  };


  const enter = (event: React.KeyboardEvent<HTMLInputElement>) => {

    if (event.key === 'Enter') {
      event.preventDefault();
      click();
    }
  };


  const click = () => {

    if (tempusername.trim() !== '') {
      setUsername(tempusername);
      setclicou(true);
    }
  };



  return (
    <div className='flex flex-col  '>

      <div className='flex  w-full bg bg-black p-2 '>
        <div className=' flex cursor-pointer hover:scale-110 duration-500 '>
         <a href="https://github.com/" target="_blank"><img src="./src/components/GitImg/Gitimg.png" alt="git" className='rounded-[100px] w-20' /></a>
        </div>


        <div className='flex justify-end items-center gap-2  w-full '>


          <input className='flex p-2 w-52 border border-white bg bg-gray-300   rounded-[100px]'
            type="text"
            placeholder="     Digite seu User"
            defaultValue={tempusername}
            onChange={receberusername}
            onKeyDown={enter}
          />

          <button onClick={click} className='border border-black bg bg-gray-300 w-11 p-2 rounded-[50px] hover:scale-110 duration-700 '> <i className="text-black bi bi-search"></i> </button>
        </div>
      </div>


      <GitHubProfile username={username1} clicou={clicou} />

    </div>
  );
}

export default App  
