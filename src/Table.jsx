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

  const toggleTheme = (id, prevRows) => {
    return prevRows.map(item => {
      if (item.id === id) {
        return item.hasTheme 
          ? { ...item, hasTheme: false } 
          : { ...item, hasTheme: true, themeCount: item.themeCount + 1 };
      } else {
        return item;
      }
    });
  };

  const toggleActive = (id, prevRows) => {
    return prevRows.map(item => {
      if (item.id === id) {
        return { ...item, active: (!item.active) };
      } else {
        return item;
      }
    });
  };

  const effectMap = {
    "Digit1": (prevRows) => swapInd(0, 1, prevRows),
    "Digit2": (prevRows) => swapInd(1, 2, prevRows),
    "Digit3": (prevRows) => swapInd(2, 3, prevRows),
    "Digit4": (prevRows) => swapInd(3, 4, prevRows),
    "Digit5": (prevRows) => swapInd(4, 5, prevRows),
    "KeyQ": (prevRows) => toggleTheme('Sop1', prevRows),
    "KeyW": (prevRows) => toggleTheme('Sop2', prevRows),
    "KeyE": (prevRows) => toggleTheme('Alt', prevRows),
    "KeyR": (prevRows) => toggleTheme('Ten1', prevRows),
    "KeyT": (prevRows) => toggleTheme('Ten2', prevRows),
    "KeyY": (prevRows) => toggleTheme('Bas', prevRows),
    "KeyA": (prevRows) => toggleActive('Sop1', prevRows),
    "KeyS": (prevRows) => toggleActive('Sop2', prevRows),
    "KeyD": (prevRows) => toggleActive('Alt', prevRows),
    "KeyF": (prevRows) => toggleActive('Ten1', prevRows),
    "KeyG": (prevRows) => toggleActive('Ten2', prevRows),
    "KeyH": (prevRows) => toggleActive('Bas', prevRows),
    "Escape": (prevRows) => voices
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      var doThis = effectMap[e.code];
      if (doThis) {
        console.log(`${e.code} detected`);
        setRows(doThis);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div id="mainwrap">
        <div className="titlewrap">
          <div className="titleitself">Fugue-O-Meter</div>
        </div>
        <div className="spacer"/>
        <div id="tablewrap">
          <table id="thetable" className="scorecard">
            <thead>
              <tr>
                <th>Voice</th>
                <th>Theme</th>
                <th>Tally</th>
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
                  >
                    <td className={`L ${row.active ? 'active' : 'inactive'}`}>{row.name}</td>
                    <td className={`M ${row.active ? 'active' : 'inactive'}`}>{row.hasTheme ? '\u{1F7E1}' : ''}</td>
                    <td className={`R ${row.active ? 'active' : 'inactive'}`}>{row.themeCount}</td>
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
