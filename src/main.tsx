import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
// import './firebase';
// import { getAnalytics } from 'firebase/analytics';

// const analytics = getAnalytics(app);
// exports.checkDeadlines = functions.pubsub.schedule('every 1 hours').onRun(async (context) => {
//   const todosRef = collection(db, 'todos');
//   const todosSnapshot = await getDocs(todosRef);
//   todosSnapshot.forEach((doc) => {
//     const todo = doc.data();
//     if (todo.deadline && todo.deadline.toDate() < new Date()) {
//       updateDoc(doc(db, 'todos', doc.id), {expired: true});
//     }
//   });
// });

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
}
