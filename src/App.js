import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoutes";
import EachProduct from "./components/EachProduct";
import Payment from "./components/PaymentSuccess";
import cartContext from "./context/cartContext";
import NotFound from "./components/NotFound";
import "./App.css";

const App = () => {
  let [cartList, setcartList] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('cartData'));
    if(storedData === null) {
      localStorage.setItem('cartData', [])
    }else if(storedData.length > 0) {
      setcartList(storedData)
    } 
  }, [])

  useEffect(() => {
    /* console.log(cartList, "carList") */
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }, [cartList])


  
  const addCartItem = async (productData) => {
    const productObject = cartList.find((each) => each.id === productData.id);
    /* console.log(productObject); */
    if(productObject) {
      setcartList((prevState) => {
        return prevState.map((each) => {
          if (each.id === productData.id) {
            const updatedCount = each.count + productData.count;
            each.count = updatedCount;
            return { ...each, count: updatedCount };
          }
          return each;
        });
      });
    } else {
      const updatedCartList = [...cartList, productData];
      setcartList(updatedCartList);
    }
    
  };

  const deleteCartItem = (productId) => {
    /* console.log(productId); */
    const updatedCartList = cartList.filter((each) => each.id !== productId);
    setcartList(updatedCartList);
  };

  const increaseCartItem = (productData) => {
    setcartList((prevState) => {
      return prevState.map((each) => {
        if (each.id === productData.id) {
          const updatedCount = each.count + 1;
          return { ...each, count: updatedCount };
        }
        return each;
      });
    });
  };

  const decreaseCartItem = (productData) => {
    if (productData.count > 1) {
      setcartList((prevState) => {
        return prevState.map((each) => {
          if (each.id === productData.id) {
            const updatedCount = each.count - 1;
            return { ...each, count: updatedCount };
          }
          return each;
        });
      });
    } else {
      deleteCartItem(productData.id);
    }
    console.log(productData);
  };

  /* console.log(cartList); */
  return (
    <Router>
      <cartContext.Provider
        value={{
          cartList,
          addCartItem: addCartItem,
          deleteCartItem: deleteCartItem,
          increaseCartItem: increaseCartItem,
          decreaseCartItem: decreaseCartItem,
        }}
      >
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/products/:id" element={<EachProduct />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          
        </Routes>
        
      </cartContext.Provider>
    </Router>
  );
};

export default App;
