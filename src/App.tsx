import { Routes, Route, Navigate } from "react-router";
import UserListPage from "@/pages/user-list/UserListPage.tsx";
import UserDetailPage from "@/pages/user-detail/UserDetailPage.tsx";
import UserPage from "@/pages/user/UserPage.tsx";

function App() {
  return (
    <>
      <div className={"border-b h-20 bg-red-400"}>header</div>
      <div className={"container mx-auto py-28"}>
        <Routes>
          <Route path="user" element={<UserPage />}>
            <Route path="list" element={<UserListPage />} />
            <Route path="detail/:id" element={<UserDetailPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/user/list" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
