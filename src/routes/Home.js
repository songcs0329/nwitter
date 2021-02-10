import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';
import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';

const Home = ({userObj}) => {
  const [nweets, setNweets] = useState([])

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetsArray = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      setNweets(nweetsArray)
    })
  }, [])
  
  return (
    <div>
      <NweetFactory userObj={userObj}/>
      <div>
        {nweets.map(nweet => 
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        )}
      </div>
    </div>
  );
};

export default Home;