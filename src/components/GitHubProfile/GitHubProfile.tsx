// src/components/GitHubProfile.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Profile {
  login: string;
  name: string;
  avatar_url: string;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
}

interface GitHubProfileProps {
  username: string | null;
  clicou: boolean;
}

const GitHubProfile: React.FC<GitHubProfileProps> = ({ username, clicou }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    if (clicou && username && username.trim() !== '' && username !== 'null') {
    const pegarperfil = async () => {
      try {
        const response = await axios.get<Profile>(`https://api.github.com/users/${username}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };
    
    pegarperfil();
  }},[username] );

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get<Repo[]>(`https://api.github.com/users/${username}/repos`);
        setRepos(response.data);
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
      }
    };

  fetchRepos();
  }, [clicou,username]);

  if (!profile) {
    return <div className='flex justify-center items-center h-screen w-full '>
        
        Digite seu Perfil
    
    </div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={profile.avatar_url}
          alt={profile.name}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
          <p className="text-gray-600">@{profile.login}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Repositórios:</h2>
      <ul className="space-y-2">
        {repos.map((repo) => (
          <li key={repo.id} className="bg-gray-100 p-4 rounded shadow">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GitHubProfile;
