import { useState } from 'react';
import './App.css';
import CustomInput from './customInput';
import moment from 'moment'
import { faAddressBook, faCalendar, faChevronDown, faSquare } from "@fortawesome/free-solid-svg-icons"
import {faSquare as squareoute} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function App() {
  const [posts,setPosts] = useState([])
  const createPost = ( text, date = moment(), list = 'No List' ) => {
    const newPost = {
      _id: (moment() + Math.random() * 100),
      text,
      date,
      list
    }

    setPosts(prev=>{
      const newArray = prev.concat([newPost])
      return newArray
    })
  }
  return (
    <div className="App">
        <CustomInput post={createPost}></CustomInput>
        <div className='posts'>
            {
              posts.map((item)=>{
                return (
                  <div className='CustomInputBox active post' key={item._id}>
            <div className='quadrat'>
                <div className='iconBox'><FontAwesomeIcon icon={faSquare}></FontAwesomeIcon></div>
                
            </div>
                <span className='inputItem postsInput' role="textbox">
                  <p>{item.text}</p>
                </span>
            <div className='rightSide'>
                <div className='calendarBox postsCalendarItem'>
                  {moment(item.date).format('D/M/Y')}
                </div>
                <div className='select'>
                    <div className='outLiendeCircle'></div>
                    <p>{item.list}</p>
                </div>
            </div>
        </div>
                )
              })
            }
        </div>
    </div>
  );
}

export default App;
