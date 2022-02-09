import { Routes, Route } from "react-router-dom";

import { App } from "./App";
import { Commits } from './pages/Commits';
import { Issues } from './pages/Issues';
import { PullRequest } from './pages/PullRequest';

export function MainRoutes(){
  return (
    <Routes>
      <Route path="commits" element={<Commits />} />
      <Route path="issues" element={<Issues/>} />
      <Route path="pullrequests" element={<PullRequest/>} />
    </Routes>
  );
}