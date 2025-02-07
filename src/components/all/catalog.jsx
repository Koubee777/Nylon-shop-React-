import { Box, Button, Container, Flex, Image } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import { Link, NavLink } from "react-router";

export const Catalog = ({products, setCartProducts, cartProducts}) => {
    
    const ProductCard = chakra("div", {
        base: {
            p: "80px",
            display: "flex",
            gap: "10px",
            shadow: "lg",
            rounded: "lg",
            bgColor: "white",
        },
        variants: {
          variant: {
            outline: {           
              border: "1px solid",
              borderColor: "red.500",
            },
            solid: {
              bgColor: "red.500",
              color: "white",
            },
            nix: {
                bgColor: "blue.300",
            }
          },
        },
      })
      
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
            <ProductCard>
                {products.map(el =>(
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
                        <NavLink to={`/catalog/${el.name}`}>
                          <Image bgColor="blue.100" height="300px" w="300px" rounded="md" src={el.img} alt="Dan Abramov"/>
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

                          <Button background="blue.500" rounded="md" p="4" color="gray.100" textAlign="right" fontSize="xl" mt="4" onClick={()=> addToCart(el.id)}>Добавить в корзину</Button>
                          {cartProducts.map(prod =>(
                            prod.id === el.id && 
                            <Box color="red.500" fontSize="18px">В корзине {prod.countInCart} шт</Box>
                        ))}
                    </Box>))}
            </ProductCard>
        </Container>
     );
}