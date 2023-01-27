import React from 'react';
import '../../styles/homepage.css';

const [clotheList] = ({props}) => {
    if(!props._id.length) {
        return <h3>No Clothes Listed Yet</h3>;
    }

    return (
        <div>
            <h1>{title}</h1>
            {
                clotheList.map((clotheList, i) => (
                    <Clothes clotheList = {clotheList} key= {i}/>
                ))
            }
        </div>
    )
}