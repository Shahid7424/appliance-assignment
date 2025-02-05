"use client";
import { useState, useEffect } from "react";
import { 
  Input, Button, Card, Divider, 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter 
} from "@nextui-org/react";

// Function to get the next available user ID
const getNextUserId = () => {
  if (typeof window !== "undefined") {
    const lastUserId = localStorage.getItem("lastUserId");
    return lastUserId ? parseInt(lastUserId) + 1 : 1;
  }
  return 1;
};

const UserForm = () => {
  const [user, setUser] = useState({
    id: getNextUserId(),
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("userData");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser({ ...parsedUser, id: getNextUserId() });
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setUnsavedChanges(true);
  };

  const handleSubmit = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("lastUserId", user.id.toString());
      setUnsavedChanges(false);
      alert("User Data Saved!");

      // Update user ID for next entry
      setUser({
        id: getNextUserId(),
        name: "",
        address: "",
        email: "",
        phone: "",
      });
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    };
  }, [unsavedChanges]);

  return (
    <Card className="p-8 max-w-xl mx-auto shadow-xl bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">User Data Form</h2>

      <div className="grid grid-cols-1 gap-4">
        <Input label="User ID" value={user.id.toString()} readOnly />
        <Input label="Name" name="name" value={user.name} onChange={handleChange} />
        <Input label="Address" name="address" value={user.address} onChange={handleChange} />
        <Input label="Email" name="email" type="email" value={user.email} onChange={handleChange} />
        <Input label="Phone" name="phone" type="tel" value={user.phone} onChange={handleChange} />
      </div>

      <Button 
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200" 
        onClick={handleSubmit}
      >
        Save
      </Button>

      <Divider className="my-6" />

      {/* User Summary */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Last Saved User</h3>
        <p><strong>User ID:</strong> {user.id || "N/A"}</p>
        <p><strong>Name:</strong> {user.name || "N/A"}</p>
        <p><strong>Email:</strong> {user.email || "N/A"}</p>
        <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
        <p><strong>Address:</strong> {user.address || "N/A"}</p>
      </div>

      {/* Unsaved Changes Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalContent>
          <ModalHeader>Unsaved Changes</ModalHeader>
          <ModalBody>
            You have unsaved changes. Are you sure you want to leave?
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
            <Button color="danger" onClick={() => {
              setUnsavedChanges(false);
              setShowModal(false);
            }}>Discard</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default UserForm;
