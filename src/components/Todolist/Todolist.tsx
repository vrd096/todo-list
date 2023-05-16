import styles from './Todolist.module.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MyDay } from '../../pages/MyDay';
import { Important } from '../../pages/Important';
import { Inbox } from '../../pages/Inbox';

export const Todolist = () => {
  return (
    <div className={styles.todo}>
      <Routes>
        <Route path="/" element={<Navigate to="/today" />} />
        <Route path="/today" element={<MyDay />} />
        <Route path="/important" element={<Important />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </div>
  );
};
