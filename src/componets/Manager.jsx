import React from "react";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
    console.log(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    // alert("Copied to Clipboard")
    toast("Copied to Clipboard!");

    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };
  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      //IF any such id exists in the db delete it
      if(form.id){
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: form.id }),
      });
    }
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]));
      // console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
    } else {
      toast("Error:Password not saved!");
    }
  };

  const deletePassword = async (id) => {
    console.log("Deleting password with id ", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      // console.log(passwordArray);
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id ", id);
    setform({...passwordArray.filter((i) => i.id === id)[0], id: id});
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1350}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition="Slide"
      />
      <ToastContainer />
      <div className="relative h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        {/* <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div> */}
      </div>

      <div className="p-2 md:p-0 mx-auto md:mycontainer min-h-[100vh]">
        <h1 className="text-4xl py-6 mt-3 text font-bold text-center">
          <span className="text-purple-800">&lt;</span>
          Password Manager
          <span className="text-purple-800">&gt;</span>
        </h1>

        <p className="text-purple-700 text-lg text-center">
          Your Own Personal password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter website URL"
            className="rounded-full border border-purple-700 w-4/5 p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-4/5 gap-8 justify-between">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              className="rounded-full border border-purple-700 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                onChange={handleChange}
                ref={passwordRef}
                value={form.password}
                placeholder="Enter Password"
                className="rounded-full border border-purple-700 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-purple-500 hover:bg-purple-600 rounded-full border border-purple-700 px-4 py-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="mycontainter passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No Passwords to show </div>}

          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="text-white bg-purple-900">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-200">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconCopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              className="cursor-pointer"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          {item.username}
                          <div
                            className="lordiconCopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              className="cursor-pointer"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconCopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              className="cursor-pointer"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="items-center justify-center py-2 border border-white text-center">
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/ifsxxxte.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
