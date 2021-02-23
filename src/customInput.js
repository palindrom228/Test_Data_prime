import { faAddressBook, faCalendar, faChevronDown, faSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import DatePicker from './UI/DatePicker'
import moment from 'moment'
const CustomInput = ({post}) => {
    const [date, setDate] = useState(moment().valueOf())
    const [dateIsOn, setDateIsOn] = useState(false)
    const changingDateFunc = (data) => {
        setDate(data)
    }
    const [focused, setFocused] = useState(false)
    const focus = (e) => {
        e.preventDefault()
        if(!focused){
            setFocused(true)
            textArea.current.focus()
            document.addEventListener('mousedown',outSideClick)
        }
    }
    const outSideClick = (e) => {
        if(!refInput.current.contains(e.target)){
            setFocused(false)
            textArea.current.blur()
            document.removeEventListener('mousedown',outSideClick)
        }
    }   
    const refInput = useRef()
    const textArea = useRef()
    const [selectIsOpened, setSelectIsOpened] = useState(false)
    const [selectValue, setSelectValue] = useState({
        _id: 0,
        value: 'No List'
    })
    const handleChangeSelected = (e) => {
        setSelectValue({_id: e.currentTarget.getAttribute('data'), value: e.currentTarget.getAttribute('name')})
    }
    const sendData = () => {

        if(text.length > 0) {
            setText('')
            setDate(moment().valueOf())
            setSelectValue({
                _id: 0,
                value: 'No List'
            })
            textArea.current.innerText = ''
            post(text, date.value,selectValue.value)
        }
    }
    const hide = () => {
    }
    const [text,setText] = useState('')
    const handleText = (e) => {
        if(e.key=='Enter'){
            e.preventDefault()
            console.log('enter')
            sendData()
        }else{
            setText(e.target.innerText)
        }
    }
    return(
        <div ref={refInput} className={focused?'CustomInputBox active':'CustomInputBox'} onClick={focus}>
            <div className='quadrat'>
                <div className='iconBox'><FontAwesomeIcon icon={faSquare}></FontAwesomeIcon></div>
                
            </div>
                <span ref={textArea} onKeyDown={handleText} className='inputItem' role="textbox" contentEditable='true'>
                </span>
            <div className='rightSide'>
                <div className='calendarBox'>
                    <FontAwesomeIcon icon={faCalendar} onClick={()=>setDateIsOn(!dateIsOn)}></FontAwesomeIcon>
                    <div className={dateIsOn?'datePickerBoxDrop isOnDateSelect':'datePickerBoxDrop'}>
                        <DatePicker onChange={changingDateFunc} hide={hide}></DatePicker>
                    </div>
                </div>
                <div className='select' onClick={()=>{setSelectIsOpened(!selectIsOpened)}}>
                    <div className='outLiendeCircle'></div>
                    <p>{selectValue.value}</p>
                    <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                    {selectIsOpened?<div className='dropDown'>
                        <ul>
                            <li className={selectValue===1?'selectedList':''} onClick={handleChangeSelected} data='1' name='Contacts List'><FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon>Contacts List</li>
                            <li className={selectValue===2?'selectedList':''} onClick={handleChangeSelected} data='2' name='Main List'><FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon>Main List</li>
                            <li className={selectValue===3?'selectedList':''} onClick={handleChangeSelected} data='3' name='Not Main List'><FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon>Not Main List</li>
                            <li className={selectValue===4?'selectedList':''} onClick={handleChangeSelected} data='4' name='Logic List'><FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon>Logic List</li>
                            <li className={selectValue===5?'selectedList':''} onClick={handleChangeSelected} data='5' name='To do List'><FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon>To do List</li>
                        </ul>
                    </div>:''}
                </div>
            </div>
        </div>
    )
}
export default CustomInput