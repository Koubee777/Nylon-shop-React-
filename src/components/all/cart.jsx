import { Flex, Box, Button, Container, Image } from "@chakra-ui/react";

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
        <Container background="blue.500" p="4">
            <Flex justify="center" p="4" rounded="md" direction="column" gap="10px"  fontSize="md" background="white" fontWeight="600">
                <Button background="blue.500" rounded="md" p="4" color="gray.100" textAlign="right" fontSize="xl">Купить: {totalPrice} руб.</Button>
                {cartProducts && cartProducts.map(el =>(
                    <Flex justify="space-between" direction="row" gap="10px" align="center">
                            <Flex 
                                align="center"
                                fontSize="xl"
                                fontWeight="500"
                                gap="15px"
                                direction="column"
                                justify="center" 
                                p="4" 
                                color="gray.900"
                                rounded="md"
                                borderColor="gray.100"
                                borderWidth="3px">
                                {el.title}
                                <Image height="200px" rounded="md" src={el.img} alt="Dan Abramov" />
                                </Flex>
                            <Flex 
                                background="gray.100" 
                                rounded="md"
                                fontWeight="600"
                                direction="column" 
                                maxH="max-content"
                                p="4" 
                                color="white" 
                                gap="5px" >
                                <Box color="red">цена со скидкой: {el.oldPrice} руб.</Box>
                                <Box color="gray.900">цена без скидки: {el.price} руб.</Box>
                            </Flex>
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
            
        </Container>
     );
}
 
export default Cart;