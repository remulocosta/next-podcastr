import { createContext } from 'react';
import { ReactNode } from 'react';
import { useState } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: Number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  setIsPlayingState: (state: boolean) => void;
  togglePlay: () => void;
}

type PlayerContextProviderProps = {
  children: ReactNode;
}


export const PlayerContext = createContext({} as PlayerContextData);


export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setIsPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider 
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        play,
        setIsPlayingState,
        togglePlay
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
