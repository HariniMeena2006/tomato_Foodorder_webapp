import React, { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";
import { toast } from "react-toastify";

function List({url}) {
  const [list, setList] = useState([]);
  

 
const fetchData = async () => {
  try {
    const response = await axios.get(`${url}/api/food/list`);
    console.log("RESPONSE:", response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching food list");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    toast.error("Server error");
  }
};

  useEffect(() => {
    fetchData();
  }, []);
  const removeFood = async (foodId) => {
  try {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId,
    });

    if (response.data.success) {
      toast.success("Item deleted");
      fetchData(); // Refresh list after deletion
    } else {
      toast.error("Failed to delete item");
    }
  } catch (error) {
    console.error("Delete Error:", error);
    toast.error("Server error while deleting");
  }
};

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=>removeFood(item._id)} className="cursor">X</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
