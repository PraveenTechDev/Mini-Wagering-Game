import React, { createContext, useState, useContext } from 'react';

const JoinedChallengesContext = createContext();

export const useJoinedChallenges = () => useContext(JoinedChallengesContext);

export const JoinedChallengesProvider = ({ children }) => {
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const joinChallenge = (challenge) => {
    setJoinedChallenges((prevChallenges) => [...prevChallenges, challenge]);
  };

  const isJoined = (id) => {
    return joinedChallenges.some(ch => ch.id === id);
  };

  const selectChallenge = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const deselectChallenge = () => {
    setSelectedChallenge(null);
  };

  return (
    <JoinedChallengesContext.Provider value={{ 
      joinedChallenges, 
      joinChallenge, 
      isJoined, 
      selectedChallenge, 
      selectChallenge, 
      deselectChallenge 
    }}>
      {children}
    </JoinedChallengesContext.Provider>
  );
};
