export const Items = ({id, title, img}) => {

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
}