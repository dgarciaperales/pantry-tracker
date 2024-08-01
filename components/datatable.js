import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { db } from '../app/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import TextField from "@mui/material/TextField";
//import { Icon } from '@mui/material';

/*


*/

export default function DataTable() {
  //const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [item, setItem] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  //Function to handle row removal
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRows(items);
    setFilteredRows(items);
  };


  const handleRowRemove = async (id) => {
    await deleteDoc(doc(db, 'items', id));
    //setRows(rows.filter(row => row.id !== id));
    //setFilteredRows(filteredRows.filter(row => row.id !== id));
    setRows((prevRows) => prevRows.filter(row => row.id !== id));
    setFilteredRows((prevRows) => prevFilteredRows.filter(row => row.id !== id));
  };

  //Define the columns with 'handleRowRemove' in scope
  const columns = [
    { field: 'item', headerName: 'Item', width: 150 },
    { field: 'brand', headerName: 'Brand', width: 150 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 130,
      editable: true,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="number"
            value={params.value}
            onChange={(e) => params.api.setEditCellValue({ id: params.id, field: 'quantity', value: e.target.value })}
            style={{ width: "100%" }}
          />
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <IconButton color="secondary" onClick={() => handleRowRemove(params.row.id)}>
          <DeleteIcon/>
        </IconButton>
      ),
    },
  ];

  /*
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRows(items);
      setFilteredRows(items);
    };
    fetchData();
  }, []);
  */

  useEffect(() => {
    fetchData();
  }, []);


  const handleSearch = () => {
    setFilteredRows(rows.filter(row => row.item.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const handleRowAdd = async () => {
    const newRow = { item, brand, quantity: parseInt(quantity, 10) };
    const existingRow = rows.find(row => row.item === item && row.brand === brand);

    if (existingRow) {
      const updatedQuantity = existingRow.quantity + newRow.quantity;
      const updatedRow = { ...existingRow, quantity: updatedQuantity };
      await updateDoc(doc(db, 'items', existingRow.id), updatedRow);
      //setRows(rows.map(row => (row.id === existingRow.id ? updatedRow : row)));
      //setRows((prevRows) => prevRows.map(row => (row.id === existingRow.id ? updatedRow: row)));
      //setFilteredRows((prevFilteredRows) => prevFilteredRows.map(row => (row.id === existingRow.id ? updatedRow : row)));
    } else {
      const docRef = await addDoc(collection(db, 'items'), newRow);
      const addedRow = { id: docRef.id, ...newRow };
      //Add new row to state immediately
      //setRows((prevRows) => [...prevRows, addedRow]);
      //setFilteredRows((prevFilteredRows) => [...prevFilteredRows, addedRow]);
    }

    setItem('');
    setBrand('');
    setQuantity('');

    fetchData();
  };

  const handleRowEdit = async (newRow) => {
    const { id, ...updateData } = newRow;
    await updateDoc(doc(db, 'items', id), updateData);
    //added 2 lines
    //setRows((prevRows) => prevRows.map(row => (row.id === id ? newRow: row)));
    //setFilteredRows((prevFilteredRows) => prevFilteredRows.map(row => (row.id === id ? newRow : row)));
    fetchData();
    return newRow;
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
        <div style={{ marginBottom: 16 }}>
          <input 
            type="text"
            placeholder="Item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            style={{ marginRight: 8, color: 'black' }}
          />
          <input 
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={{ marginRight: 8, color: 'black' }}
          />
          <input 
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ marginRight: 8, color: 'black' }}
          />
          <IconButton color="primary" onClick={handleRowAdd}>
            <AddIcon/>
          </IconButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom:16 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: 8 }}
          />
          <IconButton color="primary" onClick={handleSearch} style={{ width: 40, height:40 }}>
            <SearchIcon />
          </IconButton>
        </div>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          editMode='row'
          processRowUpdate={handleRowEdit}
        />
    </div>
  );
}




  /*
  useEffect(() => {
    setFilteredRows(rows.filter(row => row.item.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, rows]);
  */

