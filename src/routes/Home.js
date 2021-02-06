import Nweet from 'components/Nweet';
import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("")
  const [nweets, setNweets] = useState([])

  // 실시간으로 받아오지 못함
  // const getNweets = async () => {
  //   const dbNweets = await dbService.collection("nweets").get()
    
  //   dbNweets.forEach(document => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     }
  //     setNweets(prev => [nweetObject, ...prev])
  //   })
  // }
  useEffect(() => {
    // getNweets()
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

  const onSubmit = async (event) => {
    event.preventDefault()
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    })
    setNweet("")
  }
  const onChange = (event) => setNweet(event.target.value)
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Nweet" />
      </form>
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