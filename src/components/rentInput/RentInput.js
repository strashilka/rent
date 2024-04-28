import {useState} from "react";
import "./RentInput.css"

export default function RentInput({name, value, type}) {
  const [text, setText] = useState(value);
  function handleOnChange(event) {

    // console.log(event.target)
    const name = event.target.name;
    const val = event.target.value.toString();
    setText(val);
    // let obj: ValuesObject = {};
    // obj[name] = value;
    //
    // setValues((prev) => {
    //   return {...prev, ...obj};
    // })
  }

  if (type === "textarea") {
    return <textarea id={name} name={name} value={text} rows={4}
                     onChange={handleOnChange} className="input"/>
  }
  return <input type="text" id={name} name={name} required value={text}
                onChange={handleOnChange} className="input"/>
}