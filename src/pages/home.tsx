import { useState, useEffect } from "react";
import { useSpring, animated, easings } from "react-spring";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Input } from "@mui/material";

export const Home = () => {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    id: "",
    address: "",
    email: "",
    phone: "",
  });
  const [editorContent, setEditorContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (hasUnsavedChanges) {
      event.preventDefault();
      event.returnValue = "";
    }
  };

  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, 5);
    return `${timestamp}-${randomNum}`;
  };

  const handleSave = () => {
    const newId = generateUniqueId();
    const updatedUserData = { ...userData, id: newId };

    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setHasUnsavedChanges(false);

    // Display submitted data in the rich text editor
    const formattedData = `
      <h2>Submitted Data:</h2>
      <pre>${JSON.stringify(updatedUserData, null, 2)}</pre>
    `;
    setEditorContent(formattedData);

    // Clear input fields
    setUserData({
      name: "",
      id: "",
      address: "",
      email: "",
      phone: "",
    });
  };

  const bgAnimation = useSpring({
    background: `linear-gradient(45deg, rgba(0,0,255,${
      count * 0.1
    }), rgba(255,0,0,${count * 0.1}))`,
    config: {
      tension: 170,
      friction: 26,
      easing: easings.easeInOutCubic,
    },
  });

  return (
    <animated.div
      style={{
        ...bgAnimation,
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
      }}
    >
      {/* Counter */}
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "10%",
            borderRadius: "5px",
            border: "1px solid black",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>{count}</h1>
            </div>
            <h2>Counter</h2>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Button
              style={{
                backgroundColor: "Green",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
              onClick={() => setCount(count + 1)}
            >
              +
            </Button>
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
              onClick={() => setCount(0)}
            >
              Reset
            </Button>
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
              onClick={() => setCount(count - 1)}
            >
              -
            </Button>
          </div>
        </div>
      </div>

      {/* Rich Text Editor */}
      <div>
        <h2>Rich Text Editor</h2>
        <Editor
          value={editorContent}
          onEditorChange={(newContent) => setEditorContent(newContent)}
          init={{
            plugins: "lists link image",
            toolbar: "bold italic underline | numlist bullist",
          }}
        />
      </div>

      {/* User Data Form */}
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "10%",
            borderRadius: "5px",
            border: "1px solid black",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>User Form</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
          <Input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder="Name"
          />
          <p>ID: {userData.id || "Auto-generated on Save"}</p>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>

      {/* Contact Info Form */}
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "10%",
            borderRadius: "5px",
            border: "1px solid black",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h2>Contact Form</h2>
            <div>
              <Input
                type="text"
                value={userData.address}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
                placeholder="Address"
              />
            </div>
            <div>
              <Input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                placeholder="Email"
              />
            </div>
            <div>
              <Input
                type="tel"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                placeholder="Phone"
              />
            </div>
            <div>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};
