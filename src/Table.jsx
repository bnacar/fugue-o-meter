import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './table.css';

const voices = [
  { id: 'Sop1', name: 'Soprano I', active: false, hasTheme: false, themeCount: 0 },
  { id: 'Sop2', name: 'Soprano II', active: false, hasTheme: false, themeCount: 0 },
  { id: 'Alt', name: 'Alto', active: false, hasTheme: false, themeCount: 0 },
  { id: 'Ten1', name: 'Tenore I', active: false, hasTheme: false, themeCount: 0 },
  { id: 'Ten2', name: 'Tenore II', active: false, hasTheme: false, themeCount: 0 },
  { id: 'Bas', name: 'Basso', active: false, hasTheme: false, themeCount: 0 },
];

function Table() {
  const [rows, setRows] = useState(voices);

  const swapInd = (x, y, prevRows) => {
    var tempRows = prevRows.slice(0);
    var z = tempRows[x];
    tempRows[x] = tempRows[y];
    tempRows[y] = z;
    return tempRows;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        console.log('Space detected');
        setRows((prevRows) => [...prevRows].sort(() => Math.random() - 0.5));
      } else if (e.code === 'Digit1') {
        console.log('1 detected');
        setRows((prevRows) => swapInd(0, 1, prevRows));
      } else if (e.code === 'Digit2') {
        console.log('2 detected');
        setRows((prevRows) => swapInd(1, 2, prevRows));
      } else if (e.code === 'Digit3') {
        console.log('3 detected');
        setRows((prevRows) => swapInd(2, 3, prevRows));
      } else if (e.code === 'Digit4') {
        console.log('4 detected');
        setRows((prevRows) => swapInd(3, 4, prevRows));
      } else if (e.code === 'Digit5') {
        console.log('5 detected');
        setRows((prevRows) => swapInd(4, 5, prevRows));
      } else {
        setRows(voices);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div id="tablewrap">
        <h2>FUGUE-O-METER</h2>
        <div id="tablewrap">
          <table id="thetable">
            <thead>
              <tr>
                <th>Voice</th>
                <th>Theme<br/>Statements</th>
              </tr>
            </thead>
            <motion.tbody layout>
              <AnimatePresence>
                {rows.map((row) => (
                  <motion.tr
                    key={row.id}
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 30 }}
                    style={{ 
                      borderBottom: '1px solid #eee',
                      background: '#fff'
                    }}
                  >
                    <td>{row.name}</td>
                    <td>{row.themeCount}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Table
