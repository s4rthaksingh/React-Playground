import { useState, useEffect } from 'react'
import './App.css'
import { db } from '../firebase'
import { ref, set, onValue } from 'firebase/database'

function App() {
  const [moodState, setmoodState] = useState({})

  useEffect(() => {
    const moodsRef = ref(db,'moods');

    const unsubscribe = onValue(moodsRef, (snapshot) => {
      const data = snapshot.val();
      setmoodState(data);
      console.log(JSON.stringify(data));
    })

    return(() => unsubscribe())
  },[]);

  return (
    <>
    <div>
      <input type="text" name="" id="username" placeholder='Name'/>
      <input type="text" id="mood" placeholder='Mood emoji'/>
    </div>
    <div className='h-9/10 w-screen flex flex-wrap justify-center items-center gap-5'>
        {Object.keys(moodState).map((person, id) => (
          <MoodCard key={id} person={person} mood={moodState[person]}/>
      ))}
    </div>
    </>
  )
}

function MoodCard({person, mood}){
  return <div className='bg-gray-900 rounded-2xl w-50 h-50 flex flex-col justify-center'>
    <h2 className='text-2xl font-bold mb-5'>{person}</h2>
    <h1 className='text-7xl mb-12'>{mood}</h1>
  </div>
}

export default App
