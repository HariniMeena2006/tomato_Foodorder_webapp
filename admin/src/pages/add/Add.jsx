import React, { useState } from "react";
import "./add.css";
import { assets } from "../../assetsss/assets";
import axios from "axios"
import { toast } from "react-toastify";
//state variable

function Add({url}) {
 
  const onSubmitHandler = async (event) => {
  event.preventDefault();

  const formData = new FormData(); // ✅ create the object

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", Number(data.price));
  formData.append("category", data.category);
  formData.append("image", image); // this is the actual file

 
    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message)
    } else {
       toast.error(response.data.message)
      
    }
  
};
const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name; // like "name" or "price"
    const value = event.target.value; // what the user typed

    setData((prevData) => ({
      ...prevData,
      [name]: value, // updates only the specific field
    }));
  };
  

  return (
    <div className="add">
      <form className="flex-col"onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="6"
            placeholder="Write content here"
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            ></input>
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Add;
