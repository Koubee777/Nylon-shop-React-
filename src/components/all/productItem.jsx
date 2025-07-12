import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Box, Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link, NavLink } from "react-router";
import { getProductByUrl } from "./testdb";
import { getAlldbProducts } from "./testdb";



const ItemProducs = ({setCartProducts, cartProducts}) => {
  const [products, setProducts] = useState([]);

    useEffect (()=> {
      const loadProducts = async () => {
        const allProducts = await getAlldbProducts();
        setProducts(allProducts)
      };
      loadProducts();
    },[])


    const location = useLocation()
    const [product, setProduct] = useState([]);
    useEffect (()=> {
        const pathParts = location.pathname.split('/');
        console.log(pathParts[2])
      const loadProduct = async () => {
        const getProduct = await getProductByUrl(pathParts[2]);
        setProduct(getProduct)
        console.log("продукт это", getProduct)
      };
      loadProduct(); 
    },[])


    const addToCart = (id) => {
      setCartProducts((prevCartProducts) => {
        // проверяем, есть ли товар с таким id в корзине
        const existingProductIndex = prevCartProducts.findIndex((product) => product.id === id);
        
        if (existingProductIndex !== -1) {
          // если товар найден, плюсуем
          const updatedCart = [...prevCartProducts];
          
          updatedCart[existingProductIndex] = {
            ...updatedCart[existingProductIndex],
            countInCart: updatedCart[existingProductIndex].countInCart + 1,
          };
          return updatedCart;
        } 
        else {
          // если нет, то добавляем
          const productToAdd = products.find((product) => product.id === id);
          return [...prevCartProducts, { ...productToAdd, countInCart: 1 }];
        }
      });
    };
    return ( 
      <Container>
        <div>
         {product && product.map(el =>(
                <Link>
                <Box key={el.title}
                    align="center"
                    fontSize="xl"
                    fontWeight="500"
                    gap="15px"
                    direction="column"
                    justify="center" 
                    color="gray.900"
                    rounded="md"
                    p="4"
                    borderColor="gray.100"
                    borderWidth="2px">
                    <Flex 
                      align="flex-start"
                      direction="column">
                        <Image bgColor="blue.100" height="300px" w="300px" rounded="md" src={el.image} alt="Dan Abramov"/>
                        <Flex
                            rounded="md"
                            fontWeight="600"
                            maxH="max-content"
                            alignItems="center"
                            color="gray.500" 
                            gap="5px" >
                            <Box color="red">{el.price} ₽</Box>
                            <Box color="gray.300" fontSize="14px" textDecoration="line-through">{el.oldPrice} ₽</Box>
                        </Flex>
                        <Box color="red.500" fontSize="14px">Осталось {el.left} шт</Box>
                        <Link  
                            color="blue.400"
                            transition="all 0.3s ease-in-out"
                            href="/.">{el.title}
                        </Link>
                        <NavLink to={`/catalog/${el.name}`}>Карточка</NavLink>
                      </Flex>
                      <Button background="blue.500" rounded="md" p="4" color="gray.100" textAlign="right" fontSize="xl" mt="4" onClick={()=> addToCart(el.id)}>Добавить в корзину</Button>
                          {cartProducts.map(prod =>(
                            prod.id === el.id && 
                            <Box color="red.500" fontSize="18px">В корзине {prod.countInCart} шт</Box>
                        ))}                </Box>
               
            </Link>
          ))}
        </div>
      </Container>
     );
}
export default ItemProducs;