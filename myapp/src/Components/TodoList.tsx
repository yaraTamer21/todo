import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from 'react-hot-toast';


////////////////////////// get from localStorage ////////////////////////////////

// function to get todo from local storage
const gettodo = (): [] => {
  const lists = localStorage.getItem("list");
  if (lists) {
    return JSON.parse(localStorage.getItem("list") || "{}");
  } else {
    return [];
  }
};

// function to get todo from local storage
const getcompleted = (): [] => {
  const lists = localStorage.getItem("completed");
  if (lists) {
    return JSON.parse(localStorage.getItem("completed") || "{}");
  } else {
    return [];
  }
};

////////////////////////// End get from localStorage ////////////////////////////////



const TodoList = () => {

  //  aos
  AOS.init({
    duration: 2000,
    once: false,
  });
  // End aos


  // types of object
  interface inital {
    title: string;
    id: string;
    completed: boolean;
  }

  //   inital object
  const intialObject: inital = {
    title: "",
    id: "",
    completed: false,
  };


  ////////////////   useState ////////////////////

  //  object to take data
  const [data, setdata] = useState(intialObject);
  //   destruct of object inital
  const { title, id, completed } = data;


  //  take object when click on edit
  const [update, setupdate] = useState<any>(null);


  // array to take data when click on add button
  const [addTodo, setaddTodo] = useState<inital[]>(gettodo());


  // array to take data when click on completed button
  const [addCompleted, setaddCompleted] = useState<inital[]>(getcompleted());

  //////////////// End  useState ////////////////////


  // function take value from input
  const onHandleInput = (e: any) => {
    setdata({ ...data, [e.target.name]: e.target.value, id: uuidv4() });
  };

  // function to add in todo
  const onHandleTodo = (): void => {
    if (title == "") {

toast.error("please fill out this field")
    } else {
      if (!update) {
        setaddTodo([...addTodo, data]);
        toast.success(` item ${title} added successfully:)`)

        setdata(intialObject);
      } else {
        change(title, update.id, update.completed);
      }
    }
  };

  // function Handlecompleted
  const onHandleCompleted = (items: inital): void => {
    items.completed = !items.completed;
    if (items.completed) {
      setaddTodo(addTodo.filter((i) => i.id !== items.id));
      setaddCompleted([...addCompleted, items]);
    } else {
      setaddCompleted(addCompleted.filter((i) => i.id !== items.id));
      setaddTodo([...addTodo, items]);
    }
  };

  // function to delete item
  const onHandleDelet = (item: inital): void => {
    setaddTodo(addTodo.filter((i) => i.id !== item.id));
    setaddCompleted(addCompleted.filter((i) => i.id !== item.id));
    toast.error(` item ${title} deleted successfully:)`)
  };

  // function to update on item
  const onHandleUpdate = (item: inital) => {
    setupdate(item);
  };

  // function change of items when click to update
  const change = (title: string, id: string, completed: boolean) => {
    if (completed) {
      const setnewCompleted = addCompleted.map((i) =>
        i.id == id ? { title, id, completed } : i
      );
      setaddCompleted(setnewCompleted);
      toast.success(`item ${title} updated successfully`)
      setupdate(null);
      setdata(intialObject);
    } else {
      const setnewtodo = addTodo.map((i) =>
        i.id == id ? { title, id, completed } : i
      );
      setaddTodo(setnewtodo);
      toast.success(`item ${title} updated successfully`)

      setupdate(null);
      setdata(intialObject);
    }
  };


  ////////////////////////// useEffect //////////////////////////

  // useeffect to get data from  items to input
  useEffect(() => {
    if (update !== null) {
      setdata({ ...data, title: update.title });
    }
  }, [update]);

  // useeffect to put todo in localstorage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(addTodo));
  }, [addTodo]);

  // useeffect to put completed in localstorage
  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(addCompleted));
  }, [addCompleted]);

    ////////////////////////// End useEffect //////////////////////////


  return (
    <>
      <div className="todolist d-flex justify-content-center">
        <div className="paternt-todo">
          <h1 className="text-center">Todo-List</h1>

          <h3 className="mt-3 h5 fw-bold">ADD ITEM</h3>
          <hr />
          <div className="addtofrom  row">
            <div className="col-8">
              <input
                value={title || ""}
                onChange={onHandleInput}
                name="title"
                type="text"
                placeholder="Add items..."
                className="form-control"
              />
            </div>
            <div className="col-4">
              <button
                onClick={onHandleTodo}
                type="submit"
                className= {update?"btn btn-success px-5":"btn btn-primary px-5"}
              >
                 {update?"update":"Add"}  
              </button>
            </div>
          </div>
          

          <div className="mt-4">
            <h3 className="mt-3 h5 fw-bold">Todo</h3>
            <hr />

            {/* display todo items after click on add button */}
            {addTodo.length > 0 ? (
              <>
                {addTodo.map((i, index) => (
                  <>
                    <div key={index} data-aos="zoom-in" className="px-3">
                      <div className=" display-item row">
                        <div className="col-7">
                          <input
                            className={i.completed ? "underline" : ""}
                            value={i.title}
                          />
                        </div>
                        <div className="icons  col-5">
                          <button
                            onClick={() => onHandleCompleted(i)}
                            className="me-2"
                          >
                            <i className="fa-solid fa-circle-check"></i>
                          </button>
                          <button
                            onClick={() => onHandleUpdate(i)}
                            className="me-2"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            onClick={() => onHandleDelet(i)}
                            className="me-2"
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
              </>
            ) : (
              <div className="text-center ">
                <img
                  src="https://res.cloudinary.com/blogins/image/upload/v1664032608/ae8ac2fa217d23aadcc913989fcc34a2-removebg-preview_b97lxg.png"
                  className="w-50 image-empty "
                />
              </div>
            )}

            {/* add todo items  to completed  */}
            <div className="completed">
              <h3 className="mt-3 h5 fw-bold mt-4">Completed</h3>
              <hr />
              {addCompleted.length > 0 ? (
                addCompleted.map((i, index) => (
                  <>
                    <div key={index} data-aos="zoom-in" className="px-3">
                      <div className=" display-item row">
                        <div className="col-7">
                          <input
                            className={i.completed ? "underline" : ""}
                            value={i.title}
                          />
                        </div>
                        <div className="icons  col-5">
                          <button className="me-2">
                            <i
                              onClick={() => onHandleCompleted(i)}
                              className="fa-solid fa-circle-check"
                            ></i>
                          </button>
                          <button
                            onClick={() => onHandleUpdate(i)}
                            className="me-2"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            onClick={() => onHandleDelet(i)}
                            className="me-2"
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))
              ) : (
                <div className="text-center ">
                  <img
                    src="https://res.cloudinary.com/blogins/image/upload/v1664032608/ae8ac2fa217d23aadcc913989fcc34a2-removebg-preview_b97lxg.png"
                    className="w-50 image-empty "
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
