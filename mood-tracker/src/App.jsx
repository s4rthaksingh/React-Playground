import { useState, useEffect } from "react";
import "./App.css";
import { db } from "../firebase";
import { ref, set, onValue, update } from "firebase/database";
import EmojiPicker from 'emoji-picker-react';


function App() {
  const [moodState, setmoodState] = useState({});
  const [currentName, setCurrentName] = useState(null);
  const [currentMood, setCurrentMood] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const moodsRef = ref(db, "moods");

  const emojis = ['😊', '😢', '😡', '😴', '🤔', '😍', '😎', '��', '😤', '��'];

  useEffect(() => {
    const unsubscribe = onValue(moodsRef, (snapshot) => {
      const data = snapshot.val();
      setmoodState(data);
      console.log(JSON.stringify(data));
    });

    return () => unsubscribe();
  }, []);

  function updateMood(e) {
    if (!currentMood || !currentName) return;
    let newMoodState = { ...moodState, [currentName]: currentMood };
    set(moodsRef, newMoodState);
    e.target.textContent = "Updated!";
    setTimeout(() => (e.target.textContent = "Update"), 3000);

    setShowEmojiPicker(false);
  }

  const onEmojiClick = (emojiObject) => {
    setCurrentMood(emojiObject.emoji);
    setShowEmojiPicker(false);
  }

  return (
    <>
      <div className="m-10">
        <input
          type="text"
          name=""
          id="username"
          placeholder="Name"
          className="outline-0 border-0"
          maxLength={10}
          onChange={(e) => setCurrentName(e.target.value)}
        />
       <div className="relative inline-block">
  <input
    type="text"
    id="mood"
    placeholder="Set your mood"
    className="outline-0 border-0 bg-transparent cursor-pointer"
    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
    value={currentMood || ""}
    readOnly
  />
  
  {showEmojiPicker && (
    <div className="absolute z-10 mt-2">
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  )}
</div>
        <button onClick={(e) => updateMood(e)}>Update</button>
      </div>
      <div className="h-9/10 w-screen flex flex-wrap justify-center items-center gap-5">
        {Object.keys(moodState).map((person, id) => (
          <MoodCard key={id} person={person} mood={moodState[person]} />
        ))}
      </div>
    </>
  );
}

function MoodCard({ person, mood }) {
  return (
    <div className="bg-gray-900 rounded-2xl w-50 h-50 flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-5">{person}</h2>
      <h1 className="text-7xl mb-12">{mood}</h1>
    </div>
  );
}

export default App;
