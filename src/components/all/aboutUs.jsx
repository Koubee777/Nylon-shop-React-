import { Box, Flex } from "@chakra-ui/react";

const AboutUs = () => {
    return ( 
        <Flex justify="center" pt="100px">
            <Box 
                maxW="1/4"
                borderRadius="10px"
                p="10px"
                bgColor="gray.200"
                color="gray.800"
                fontSize="18px"
                >Мы магазин качественных товаров для жизни суровых условиях</Box>
        </Flex>
        
     );
}
 
export default AboutUs;