import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Box, Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link, NavLink } from "react-router";

const ItemProducs = ({products, setCartProducts, cartProducts}) => {
    const [product, setProduct] = useState(null)
    const location = useLocation()
    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const productID = pathParts[pathParts.length - 1];
        const productTest = products.find(p => p.name === productID);
        setProduct(productTest)
    }, [location.pathname]);
    return ( 
        <div>
            {product && 
                <Link>
                <Box key={product.title}
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
                    
                    <Image bgColor="blue.100" height="300px" w="300px" rounded="md" src={product.img} alt="Dan Abramov"/>
                    <Flex
                        rounded="md"
                        fontWeight="600"
                        maxH="max-content"
                        alignItems="center"
                        color="gray.500" 
                        gap="5px" >
                        <Box color="red">{product.price} ₽</Box>
                        <Box color="gray.300" fontSize="14px" textDecoration="line-through">{product.oldPrice} ₽</Box>
                    </Flex>
                    <Box color="red.500" fontSize="14px">Осталось {product.left} шт</Box>
                    <Link  
                        color="blue.400"
                        transition="all 0.3s ease-in-out"
                        href="/.">{product.title}
                    </Link>
                    <NavLink to={`/catalog/${product.name}`}>Карточка</NavLink>
                    <Button background="blue.500" rounded="md" p="4" color="gray.100" textAlign="right" fontSize="xl" mt="4" onClick={()=> setCartProducts([...cartProducts, product])}>Добавить в корзину</Button>
                </Box>
            </Link>
          }
        </div>
     );
}
export default ItemProducs;