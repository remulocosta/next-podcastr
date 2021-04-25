import { createContext } from 'react';
import { ReactNode } from 'react';
import { useContext } from 'react';
import { useState } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isLooping: boolean;
  isPlaying: boolean;
  isShuffling: boolean;
  clearPlayerState: () => void;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  setIsPlayingState: (state: boolean) => void;
  toggleLoop: () => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({
  children
}: PlayerContextProviderProps) {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [episodeList, setEpisodeList] = useState([]);
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setIsPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );

      setCurrentEpisodeIndex(nextRandomEpisodeIndex);

      return;
    }

    if (!hasNext) {
      clearPlayerState();
      return;
    }

    setCurrentEpisodeIndex(currentEpisodeIndex + 1);
  }

  function playPrevious() {
    const previousEpisodeIndex = currentEpisodeIndex - 1;

    if (!hasPrevious) {
      return;
    }

    setCurrentEpisodeIndex(previousEpisodeIndex);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        clearPlayerState,
        currentEpisodeIndex,
        hasNext,
        hasPrevious,
        isLooping,
        isPlaying,
        isShuffling,
        play,
        playList,
        playNext,
        playPrevious,
        setIsPlayingState,
        toggleLoop,
        togglePlay,
        toggleShuffle
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
