import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Box, Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link, NavLink } from "react-router";
import { getProductByUrl } from "./testdb";


const ItemProducs = ({setCartProducts, cartProducts}) => {
    // const [product, setProduct] = useState(null)
    // const location = useLocation()
    // useEffect(() => {
    //     const pathParts = location.pathname.split('/');
    //     setProduct(getEventById())
    // }, [location.pathname]);
    const location = useLocation()
    const [product, setProduct] = useState();
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
                    <Button background="blue.500" rounded="md" p="4" color="gray.100" textAlign="right" fontSize="xl" mt="4" onClick={()=> setCartProducts([...cartProducts, product])}>Добавить в корзину</Button>
                </Box>
            </Link>
          ))}
        </div>
      </Container>
     );
}
export default ItemProducs;