import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { db } from '../app/firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";


const initialColumns = [
  { field: 'item', headerName: 'Item', width: 150 },
  { field: 'brand', headerName: 'Brand', width: 150 },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 130,
    editable: true,
    renderCell: (params) => (
      <div style = {{ display: "flex", alignItems: "center"}}>
        <input
          type="number"
          value={params.value}
          onChange={(e) => params.api.setEditCellValue({ id: params.id, field: 'quantity', value: e.target.value})} 
          style={{ width: "100%"}}
        />
      </div>
    ),
  },
];

export default function DataTable() {
  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState([]);
  const [item, setItem] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setRows(items);
    };
    fetchData();
  }, []);

  const addColumn = () => {
    const newColumn = {
      field: `custom${nextColumnId}`,
      headerName: `Custom ${nextColumnId}`,
      width: 150,
      editable: true,
    };
    setColumns([...columns, newColumn]);
    setNextColumnId(nextColumnId + 1);
  };
  

  const handleRowAdd = async () => {
    const newRow = { item, brand, quantity: parseInt(quantity, 10) };
    const existingRow = rows.find(row => row.item === item && row.brand == brand);

    if (existingRow) {
      const updatedQuantity = existingRow.quantity + newRow.quantity;
      const updatedRow = { ...existingRow, quantity: updatedQuantity };
      await updateDoc(doc(db, 'items', existingRow.id), updatedRow);
      setRows(rows.map(row => (row.id === existingRow.id ? updatedRow : row)));
    } else {
      const docRef = await addDoc(collection(db, 'items'), newRow);
      setRows([...rows, { id: docRef.id, ...newRow }]);
    }

    setItem('');
    setBrand('');
    setQuantity('');
  };

  const handleRowEdit = async (newRow) => {
    const { id, ...updateData } = newRow;
    await updateDoc(doc(db, 'items', id), updateData);
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
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination : {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          editMode='row'
          processRowUpdate={handleRowEdit}
        />
    </div>
  );
}


/*
const initialRows = [
  { id: 1, item: 'Apple', brand: 'Brand A', quantity: 5 },
  { id: 2, item: 'Orange', brand: 'Brand B', quantity: 10 },
  { id: 3, item: 'Banana', brand: 'Brand C', quantity: 7 },
  { id: 4, item: 'Grape', brand: 'Brand D', quantity: 0 },
  { id: 5, item: 'Pineapple', brand: 'Brand E', quantity: 1 },
];
*/

/*return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
  */