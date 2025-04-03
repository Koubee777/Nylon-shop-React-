import { Flex, Box, Button, Container, Image } from "@chakra-ui/react";
import { Link, NavLink } from "react-router";

const Cart = ({setCartProducts, cartProducts}) => {
  
      const plus = (id) => {
        setCartProducts((prevCartProducts) => {
          return prevCartProducts.map((product) =>
            product.id === id
              ? {
                  ...product,
                  countInCart: product.countInCart + 1,
                }
              : product
          );
        });
      };

      const minus = (id) => {
        setCartProducts((prevCartProducts) => {
          const updatedCart = prevCartProducts.map((product) => {
            if (product.id === id) {
              const updatedProduct = {
                ...product,
                countInCart: Math.max(product.countInCart - 1, 0), // ограничиваем минимальное значение 0
              };
    
              // удаляем если 0
              if (updatedProduct.countInCart === 0) {
                return null; // помечаем для удаления
              }
             
              return updatedProduct;
            }
            return product;
          });
          // удаляем все null из массива
          return updatedCart.filter((product) => product !== null);
        });
      };

      const calculateTotalPrice = () => {
        return cartProducts.reduce((total, product) => {
          return total + product.countInCart * product.price;
        }, 0);
      };
      const totalPrice = calculateTotalPrice();
    
    return ( 
        <Container background="blue.100" p="4">
          <Flex w="100%" p="40px 0px" gap="20px">
            <Flex justify="center" p="4" rounded="md" direction="column" gap="10px"  fontSize="md" background="white" fontWeight="600" maxW="500px">            
                {cartProducts && cartProducts.map(el =>(
                    <Flex justify="space-between" direction="row" gap="10px" align="center" >
                           <NavLink to={`/catalog/${el.name}`}>
                          <Image bgColor="blue.100" height="100px" w="100px" rounded="md" src={el.image} alt="Dan Abramov"/>
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
                          </NavLink>
                            <Flex   
                                fontSize="xl"
                                fontWeight="500"
                                gap="15px" 
                                justify="space-between"
                                align="center" 
                                p="4" 
                                maxH="max-content"
                                color="gray.900"
                                rounded="md"
                                borderColor="gray.100"
                                w="200px"
                                borderWidth="3px"
                                >  
                                 <Box  fontSize="xl" p="15px"  background="gray.100"  color="gray.900"    onClick={() => { minus(el.id)}}>-</Box>

                                  {el.countInCart}    

                                <Box  fontSize="xl" p="15px"  background="gray.100"  color="gray.900"    onClick={() => { plus(el.id)}}>+</Box>

                            </Flex>
                    </Flex>
                 ))}
            </Flex>
            <Button background="blue.500" rounded="md" p="4" color="gray.100" textAlign="right" fontSize="xl">Купить в один клик: {totalPrice} руб.</Button>
          </Flex>
            
        </Container>
     );
}
 
export default Cart;