import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Heading,
  Center,
  Input,
  Table,
  Tbody,
  TableContainer,
  TableCaption,
  Thead,
  Td,
  Tr,
  Th,
  Tfoot,
  Button
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { faCircle as fullcircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as emptycircle } from '@fortawesome/free-regular-svg-icons';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';


const excel = require('exceljs'); 
const workbook = new excel.Workbook();
var initial_data = [[], [ ,1, 2, 3], [ ,4, 5, 2], [ ,7, 8, 5]];
var color_array = ["green", "green", "orange", "red", "red"]
var uploaded_data;

function handlefile(e){
  let excelfile = e.target.files[0]
  let sheet;
  console.log("File name: " + e.target.files[0].name)
  workbook.xlsx.load(excelfile).then(() => {
      sheet = workbook.worksheets[0]
      console.log(sheet.getSheetValues())
      uploaded_data = sheet.getSheetValues()
  })
}

function App() {

  const [livedata, setlivedata] = useState(initial_data)
  var results = livedata.map((row, index) =>
      <tr key={index}>{row.map(populate_td)}</tr>
  )
  function populate_td(col, ind){
    if(ind === 0){

    }
    else if(ind === 1){
      return <td>{col}</td>
    }
    else if(ind === 2){
      return <td>{col}</td>
    }
    else {
      let ratingcolor = color_array[col - 1]
      return <td><Rating initialRating={col} readonly
      emptySymbol={<FontAwesomeIcon icon={emptycircle} color='black'/>}
      fullSymbol={[<FontAwesomeIcon icon={fullcircle} color={ratingcolor}/>]}
      /></td>
    }
      
  }
  
  function refreshtable(e){
    console.log("Refresh the table")
    setlivedata((x) =>
      uploaded_data
    )
  }
  return (
    <ChakraProvider theme={theme}>
      
      <VStack height='100%'>
      <Heading >Allergy report</Heading>
      <Center><Box><Input type='file' onChange={handlefile}/></Box></Center>
      <Button onClick={refreshtable}>Refresh table</Button>

        <TableContainer>
          <Table>
            <Thead>
                <Tr>
                  <Th>Antigen</Th>
                  <Th>Concentration (kU/I)</Th>
                  <Th isNumeric>Reaction</Th>
                </Tr>
            </Thead>
            <Tbody>
              {results}
            </Tbody>
          </Table>
        </TableContainer>



      </VStack>
    </ChakraProvider>
  );
}

export default App;
