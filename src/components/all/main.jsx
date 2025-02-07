import { Box, Button, Flex } from "@chakra-ui/react";

export const Main = () => {
    return ( 
        <Flex justify="center" pt="100px">
            <Box 
                maxW="1/2"
                borderRadius="10px"
                p="10px"
                bgColor="gray.200"
                color="gray.800"
                textStyle="3xl"
                textAlign="center"
                >
                <h1>Это главная страница!</h1>
                <p>Посмотрите наши товары в каталоге.</p>
            </Box>
        </Flex>
        
     );
}