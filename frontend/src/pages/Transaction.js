import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";


function Transaction(props){
  const dateObj=new Date(props.value.datetime)
  const date = dateObj.toISOString().split('T')[0];
  const time = dateObj.toISOString().split('T')[1].split('.')[0].slice(0,5);

    return (
            <div className="transaction" key={props.value.id}>
              <div className="left">
                <div className="name">{props.value.name}</div>
                <div className="description">{props.value.description}</div>
              </div>
              <div className="right">
                <div
                  className={
                    "price " + (props.value.price > 0 ? "green" : "red")
                  }
                >
                  {props.value.price > 0
                    ? "+" + props.value.price
                    : props.value.price}
                </div>
                <div className="datetime">{date+" "+time}</div>
                <div
                  className="icon"
                  onClick={() => props.funct(props.value._id)}
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
    );
}

export default Transaction;
