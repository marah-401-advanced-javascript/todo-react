import {useState} from 'react';

function useForm(props){
    
  const [item, setItem] = useState({});
  
  const handleInputChange = e => {
    setItem( {...item, [e.target.name]: e.target.value , complete : false });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    const emptyItem = {};
    setItem(emptyItem);
    // item && setItem({ ...item, item });
  };

  return [item, handleInputChange, handleSubmit];
}

export default useForm;