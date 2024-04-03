import React, { useState, useEffect } from 'react';
import { FcTodoList } from 'react-icons/fc';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa';

const getLocalData = () => {
  const lists = localStorage.getItem('mytodolist');
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  var [listData, setListData] = useState('');
  var [itemsList, setItemsList] = useState(getLocalData());
  var [editItem, setEditItem] = useState('');
  var [togglebtn, settogglebtn] = useState(false);

  //add items

  const addItems = () => {
    if (!listData) {
      alert('fill some data');
    } else if (listData && togglebtn) {
      setItemsList(
        itemsList.map((curele) => {
          if (curele.id === editItem) return { ...curele, name: listData };
          return curele;
        })
      );
      setListData('');
      setEditItem(null);
      settogglebtn(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: listData,
        completed: false, // Added completed property
      };
      setItemsList([...itemsList, myNewInputData]);
      setListData('');
    }
  };

  // edit items

  const editItems = (index) => {
    const item_to_edit = itemsList.find((curele) => {
      return curele.id === index;
    });
    settogglebtn(true);
    setListData(item_to_edit.name);
    setEditItem(index);
  };

  //delete items

  const deleteItem = (index) => {
    const updatedItem = itemsList.filter((curele) => {
      return curele.id !== index;
    });
    setItemsList(updatedItem);
    // console.log(itemsList);
  };

  // toggle completion status

  const toggleCompletion = (index) => {
    const updatedItems = itemsList.map((item) => {
      if (item.id === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItemsList(updatedItems);
  };

  // add in local storage

  useEffect(() => {
    localStorage.setItem('mytodolist', JSON.stringify(itemsList));
  }, [itemsList]);

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="text-center">
        <FcTodoList className="w-20 h-20 mx-auto text-white" />
        <figcaption className="text-white text-4xl mt-12">
          Add Your List Here ✌
        </figcaption>
        <div className="mt-12 flex gap-2 justify-center items-center">
          <input
            type="text"
            placeholder="✍ Add Item"
            className="p-2 rounded-md w-full"
            value={listData}
            onChange={(event) => {
              setListData(event.target.value);
            }}
          />
          {togglebtn ? (
            <FaEdit
              className="-ml-10 cursor-pointer pointer-events-auto z-10 bg-none text-2xl text-green-500 hover:scale-110 duration-200"
              onClick={addItems}
            />
          ) : (
            <IoIosAddCircleOutline
              className="-ml-10 cursor-pointer pointer-events-auto z-10 bg-none text-2xl text-gray-600 hover:scale-110 duration-200"
              onClick={addItems}
            />
          )}
        </div>
        {/* show items */}
        <div className="mt-12">
          {itemsList.map((items) => {
            return (
              <div
                className={`eachItem bg-gray-200 p-4 rounded-md mb-3 flex justify-between items-center ${
                  items.completed ? 'line-through' : ''
                }`}
                key={items.id}
              >
                <h3 className="text-gray-600 font-semibold uppercase">
                  {items.name}
                </h3>
                <div className="flex gap-3">
                  <FaEdit
                    className="text-2xl text-blue-600 hover:scale-110 duration-200"
                    onClick={() => editItems(items.id)}
                  />
                  <FaTrash
                    className="text-2xl text-red-600 hover:scale-110 duration-200 "
                    onClick={() => deleteItem(items.id)}
                  />
                  <FaCheckCircle
                    className={`text-2xl ${
                      items.completed ? 'text-green-500' : 'text-gray-400'
                    } hover:scale-110 duration-200`}
                    onClick={() => toggleCompletion(items.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {/* remove items */}
        <div className="mt-12">
          <button
            className="relative rounded px-5 py-2 overflow-hidden group bg-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-700 transition-all ease-out duration-300"
            onClick={() => {
              setItemsList([]);
            }}
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            Remove All
          </button>
        </div>
      </div>
    </div>
  );
};
export default Todo;
