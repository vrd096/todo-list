import styles from './Todolist.module.scss';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MyDay } from '../../pages/MyDay';

const LazyImportant = React.lazy(
  () => import(/* webpackChunkName: "Important" */ '../../pages/Important'),
);
const LazyInbox = React.lazy(() => import(/* webpackChunkName: "Inbox" */ '../../pages/Inbox'));

export const Todolist = () => {
  return (
    <div className={styles.todo}>
      <Routes>
        <Route path="/" element={<Navigate to="/today" />} />
        <Route path="/today" element={<MyDay />} />
        <Route
          path="/important"
          element={
            <Suspense fallback={<div>Loading…</div>}>
              <LazyImportant />
            </Suspense>
          }
        />
        <Route
          path="/inbox"
          element={
            <Suspense fallback={<div>Loading…</div>}>
              <LazyInbox />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};
