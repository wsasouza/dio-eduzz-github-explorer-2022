import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path='/' element={<Dashboard />} />
    <Route path='repositories/:repos' element={<Repository />} />
    <Route path='*' element={<Repository />} />
  </Routes>
);

export default AppRoutes;
