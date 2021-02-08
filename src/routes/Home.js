import Nweet from 'components/Nweet';
import { dbService, storageService } from 'fBase';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("")
  const [nweets, setNweets] = useState([])
  const [attachment, setAttachment] = useState()

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

  const onSubmit = async (event) => {
    event.preventDefault()
    let attachmentUrl = "";
    if(attachment !== "") {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
      const response = await attachmentRef.putString(attachment, "data_url")
      attachmentUrl = await response.ref.getDownloadURL()
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    }
    await dbService.collection("nweets").add(nweetObj)
    setNweet("")
    setAttachment("")
  }
  const onChange = (event) => setNweet(event.target.value)
  const onFileChange = (event) => {
    const {target: { files }} = event
    const theFile = files[0]
    const reader = new FileReader()
    reader.onload = (finished) => {
      const { currentTarget : { result } } = finished
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }
  const onClearAttachment = () => setAttachment(null)
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        { 
        attachment && 
        <div>
          <img src={attachment} width="50px" height="50px" alt="" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
        }
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