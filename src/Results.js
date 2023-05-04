import { Td, Tr } from "@chakra-ui/react";



function Results(props){
    console.log("The results component")
    console.log(props.name)
    var array = [1, 2, 3];
    var result = array.map((x, y) =>
        <Td>{x}</Td>
    )
    return (
        <Tr>{result}</Tr>
    )
}

export default Results