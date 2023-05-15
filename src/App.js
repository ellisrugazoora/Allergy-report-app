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
var initial_data = [[], [ ,"Antigen 1", "Conc. 1", 3], [ ,"Antigen 2", "Conc. 2", 2], [ ,"Antigen 3", "Conc. 3", 5]];
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
//hello world hey hey
function App() {

  const [livedata, setlivedata] = useState(initial_data)
  var results = livedata.map((row, index) =>
      <tr key={index}>{row.map(populate_td)}</tr>
  )
  function populate_td(col, ind){
    if(ind === 0){

    }
    else if(ind === 1){
      return <td style={{border: '1px solid'}}>{col}</td>
    }
    else if(ind === 2){
      return <td style={{border: '1px solid'}}>{col}</td>
    }
    else {
      let ratingcolor = color_array[col - 1]
      return <td style={{border: '1px solid'}}><Rating initialRating={col} readonly
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
    <ChakraProvider theme={theme} >
      
      <VStack height='100%'>
      <Heading color='blue'>Allergy report</Heading>
      <Center><Box><Input type='file' onChange={handlefile} /></Box></Center>
      <Button colorScheme='blue' onClick={refreshtable}>Refresh table</Button>

        <TableContainer >
          <Table style={{border: '1px solid', borderRadius:'10%'}}>
            <Thead>
                <Tr>
                  <Th style={{border: '1px solid'}}>Antigen</Th>
                  <Th style={{border: '1px solid'}}>Concentration (kU/I)</Th>
                  <Th style={{border: '1px solid'}} isNumeric>Reaction</Th>
                </Tr>
            </Thead>
            <Tbody>
              {results}
            </Tbody>
          </Table>
        </TableContainer>
        <Button colorScheme='blue'>Download as PDF</Button>
        <Button colorScheme='blue'>Send to customer as PDF</Button>


      </VStack>
    </ChakraProvider>
  );
}

export default App;
