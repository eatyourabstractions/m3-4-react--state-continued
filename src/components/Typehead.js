import React, {useState} from 'react';
import styled from 'styled-components';

const MyInp = styled.input`
    width: 350px;
    height: 50px;
    border-radius: 10px;
    font-size: 30px;
    border: 2px solid;

`;

const ClearBtn = styled.button`
    background-color: blue;
    color: white;
    padding: 0px 20px 0px 20px;
    border-radius: 10px;
    border: none;
    margin-left: 10px;
    font-size: 30px;
`;

const Wrapper = styled.div`
    display: flex;
    padding: auto 0px auto 0px;
    
`;

const Suggestion = styled.li`
  // styles here, including hover styles.
  list-style:none;
  
  max-width: 500px;
  padding: 10px;
  
  background-color: ${props => props.isSelected ? 'tomato' : ''};
`;

const Typehead = ({suggestions, handleSelect}) =>{
    
    const original = suggestions.map(book => book.title)
    const [minidata, setMinidata] = useState([""])
    const [inputVal, setInputVal] = useState("");
    const [displayList, setDisplay] = useState("none")
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0)
   

    const handleClear = () =>{
        setInputVal("")
        setMinidata([""])
        setDisplay('none')
    }
    const handleOnChange = (val) =>{
        setInputVal(val);
        
        if(val !== "" && val.length > 1){
            let myarr = [...original.filter(name => name.toLowerCase().includes(val.toLowerCase()))]
            myarr.unshift(val)
            setMinidata(myarr )
            setDisplay('block')
        } else{ 
            setMinidata([""])
            setDisplay('none')
        }
    }
    const accentuate = (phrase, substr) =>{
        let startIdx = phrase.toLowerCase().indexOf(substr.toLowerCase())
        let firstPart = phrase.slice(0, startIdx)
        let lastPart = phrase.slice(startIdx)
        
        return [firstPart, lastPart]
    }
    const handleKeysPressed = (ev) =>{
        switch (ev.key) {
            case "Enter": {    
                handleSelect(minidata[selectedSuggestionIndex]);
              return;
            }
            case "ArrowUp": {
                if(selectedSuggestionIndex >= 1){
                    setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                }
                return;
            }
            case "ArrowDown": {
                if(selectedSuggestionIndex < minidata.length - 1){
                    setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                }
                return;
            }
          }
    }
    return (
        <div style={{display:"flex",flexDirection:"column"}}>
        <Wrapper>
            <MyInp type="text" value={inputVal} onKeyDown={(e) => handleKeysPressed(e)} onChange={(ev) =>{handleOnChange(ev.target.value)}}  /> 
            <ClearBtn onClick={() => handleClear()}>Clear</ClearBtn>
            
        </Wrapper>
        <div style={{display:`${displayList}`, boxShadow: `10px 10px 5px 0px rgba(0,0,0,0.16)`, marginTop:'5px'}}>
        {
                 minidata.map((todo, index) => {
                     let isSelected = selectedSuggestionIndex === index ? true : false;
                     let [first, last] = accentuate(todo, inputVal);
                     
                      return (<Suggestion key={todo} isSelected={isSelected} onClick={() => handleSelect(todo)}>
                     <span>
                            {first}
                                <span style={{fontWeight: 'bold'}}>{last}</span>
                            </span>
                 </Suggestion> )
                 })
            }
            </div>
        </div>
    )
}





export default Typehead;