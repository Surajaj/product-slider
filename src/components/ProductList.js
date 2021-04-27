import { useEffect, useState } from "react";
import { Block, Inline, Link } from 'vcc-ui';
import ProductDetails from "./ProductDetails";
import arrowRight from "../assets/chevron-circled.svg";

const DEVICES = {
    xsm: 786
}

function debounce(callback, wait, immediate = false) {
    let timeout = null 
  
  return function() {
    const callNow = immediate && !timeout
    const next = () => callback.apply(this, arguments)
    
    clearTimeout(timeout)
    timeout = setTimeout(next, wait)

    if (callNow) {
      next()
    }
  }
}

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [device, setDevice] = useState();

    const handleScroll = debounce((arg, event) => {
        const ele = document.querySelector(".list-wrapper");
        const productItemEle = document.querySelector(".list-wrapper .list-item");
        if(ele.scrollLeft >= productItemEle.clientWidth) setPage(Math.ceil(ele.scrollLeft/productItemEle.clientWidth))
      }, 100, true);

    useEffect(() => {
        const screen = window.innerWidth <= DEVICES?.xsm ? "sm" : "lg";
        setDevice(screen);
        fetch("/api/cars.json")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
        const listEle = document.getElementById("product-list");
        listEle.addEventListener('scroll', handleScroll)
        return () => {
            listEle.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleNavigate = (operation) => {
        const currentPage = operation === "next" ? page + 1 : page - 1;
        if(0 <= currentPage && currentPage <= (Math.floor(products.length/2))) {
            setPage(currentPage);
        }
    }

    const handleDotNavigator = (index) => {
        setPage(index);
    }

    return (
        <Block extend={{ padding: 20 }} className="product-list-container">
            <Block className="list-wrapper" id="product-list">
                {
                    products.map((item, index) => <div style={index === 0 && page > 0 && device !== "sm" ? {marginLeft: `calc(${page * -(device === "sm" ? 90 : 25)}% - 10px)`} : {}} key={item?.id} className="list-item"><ProductDetails data={item} /></div>)
                }
            </Block>
            <Block className="list-navigator">
                <div className="lg-navigator">
                    <Inline>
                        <img src={arrowRight} alt="arrow-left" width="40" className="rotate-left" onClick={() => handleNavigate("prev")} style={page === 0 ? {opacity: 0.5, cursor: "unset"} : {}} />
                    </Inline>
                    <Inline>
                        <img src={arrowRight} alt="arrow-right" width="40" className="rotate-right" style={page === (Math.floor(products.length/2)) ? {opacity: 0.5,cursor: "unset"} : {}} onClick={() => handleNavigate("next")}/>
                    </Inline>
                </div>
                <div className="sm-navigator">
                    {
                        products.map((item,index) => <Link key={item?.id} href="#" className={`dot-link ${index === page ? "active" : ""}`} onClick={() => handleDotNavigator(index)}></Link>) 
                    }
                </div>
            </Block>
        </Block>
    )
}

export default ProductList
