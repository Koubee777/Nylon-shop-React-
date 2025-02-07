import { Box, Container, Flex, Link } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import { NavLink } from "react-router";
export const Header = () => {
    const HeaderLink = chakra("div", 
    {
        base: {
            color: "gray.100"
        },
    })
    return (
        <Container bgColor="blue.500" padding="4" fontSize="xl" fontWeight="500" >
            <Flex justify="space-between" gap="10px">
                <Link href="#" color="white">ЛОГО</Link>
                <Flex justify="center" gap="10px">

                    <NavLink to={`/`}><HeaderLink>Главная</HeaderLink></NavLink>   
                    <NavLink to={`/catalog`}><HeaderLink>Каталог</HeaderLink></NavLink>   
                    <NavLink to={`/about`}><HeaderLink>о нас</HeaderLink></NavLink>   
                    
                </Flex>
                <NavLink to={`/cart`}><HeaderLink>Корзина</HeaderLink></NavLink>   
            </Flex>
        </Container>
     );
}