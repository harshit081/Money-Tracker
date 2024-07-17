import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleMessage, handleSuccess } from "../utils";
import {BottomNavigation, BottomNavigationAction, Button} from "@mui/material";
import In from "@mui/icons-material/SouthEastOutlined";
import Out from "@mui/icons-material/CallMadeOutlined";
import Transaction from "./Transaction";

import RestoreIcon from '@mui/icons-material/Restore';

import LogOut from "./Logout";

function Home() {
  const userid = localStorage.getItem("email").split("@")[0];
  const user = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(1);
  const [transactions, setTransactions] = useState("");

  const [all, setAll] = useState("active");
  const [expense, setExpense] = useState("");
  const [income, setIncome] = useState("");


  useEffect(() => {
    getTransactions().then((transactions) => {
      if (value === 1) {
        setTransactions(transactions);
      } else if (value === 0) {
        setTransactions(
          transactions.filter((transaction) => transaction.price >= 0)
        );
      } else if (value === 2) {
        setTransactions(
          transactions.filter((transaction) => transaction.price < 0)
        );
      }
    });
  }, [name, value]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("email");
    console.log("Successfully logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  async function getTransactions() {
    const url = "https://money-tracker-silk-delta.vercel.app/products" + `/transactions/${userid}`;
    console.log(url);
    const response = await fetch(url);
    console.log(response);
    const x = await response.json();
    x.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    console.log(x);
    return await x;
  }

  async function deleteTransaction(id) {
    const url = `https://money-tracker-silk-delta.vercel.app/products/transaction/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          setTransactions(
            transactions.filter((transaction) => transaction._id !== id)
          );
        } else {
          console.error("Failed to delete transaction", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  }

  function addNewTransaction(ev) {
    ev.preventDefault();
    if (!name) {
      handleError("Please provide valid price and name for transaction");
      console.error("Transaction");
    }else if(!datetime){
      handleError("Please provide valid datetime");
    }
    else {
      if(!description){
        handleMessage("Description Empty.");
        description=" ";
      }
      const url = "https://money-tracker-silk-delta.vercel.app/products" + "/transaction";
      const price = name.split(" ")[0];

      fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          userid: userid,
          price,
          name: name.substring(price.length + 1),
          description,
          datetime,
        }),
      }).then((response) => {
        response.json().then((json) => {
          setName("");
          setDescription("");
          setDatetime("");
          console.log("result", json);
        });
      });
    }
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }
  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];

  return (
    <>
      <main className="m-auto">
        <LogOut funct={handleLogOut}/>
        <div className="greet self-center gap-5">
          <h2 className="hello">Hello </h2>
          <h2 className="name"> {user}!</h2>
        </div>
        {/* <h2>Nice to meet you</h2> */}
        <h1
          className={
            "balance " + (balance > 100 ? "" : balance > 0 ? "yellow" : "red")
          }
        >
          ${balance}
          <span
            className={
              "span " + (balance > 100 ? "" : balance > 0 ? "yellow" : "red")
            }
          >
            {fraction}
          </span>
        </h1>
        <form onSubmit={addNewTransaction}>
          <div>
            <div className="basic">
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                placeholder={"+200 new samsung tv"}
              />
              <input
                type="datetime-local"
                value={datetime}
                onChange={(ev) => setDatetime(ev.target.value)}
              />
            </div>
            <div className="description">
              <input
                type="text"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                placeholder={"description"}
              />
            </div>
          </div>
          <button type="submit">Add new transaction</button>
        </form>
        {/* <DataScroller value={transactions} itemTemplate={Transaction} rows={3} buffer={0} inline scrollHeight="500px" header="Transactions"  />
      <DataView value={transactions} itemTemplate={Transaction} rows={2}></DataView> */}
        <div className="transactions">
          {transactions.length > 0 &&
            transactions.map((transaction) => (
              <Transaction value={transaction} funct={deleteTransaction} />
            ))}
        </div>
        <ToastContainer></ToastContainer>
        <BottomNavigation
          className="btm-nav"
          showLabels={false}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(newValue);
            if (newValue === 0) {
              setIncome("active");
              setAll("");
              setExpense("");
            } else if (newValue === 1) {
              setIncome("");
              setAll("active");
              setExpense("");
            } else if (newValue === 2) {
              setIncome("");
              setAll("");
              setExpense("active");
            }
            console.log(expense, all, income);
          }}
        >
          <BottomNavigationAction
            label="Income"
            value={0}
            icon={<In className="icn" />}
            className={income}
          />
          <BottomNavigationAction
            label="All"
            value={1}
            icon={<RestoreIcon className="icn" />}
            className={all}
          />
          <BottomNavigationAction
            label="Expenses"
            value={2}
            icon={<Out className="icn" />}
            className={expense}
          />
        </BottomNavigation>
      </main>
    </>
  );
}
export default Home;
