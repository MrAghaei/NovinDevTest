import { useState, useEffect } from "react";
import { useUser } from "@/repositories/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UserDataDialog from "@/components/UserDataDialog.tsx";
import { useNavigate, useParams } from "react-router";
import { UserModel } from "@/models/user.model.ts";
import Spinner from "@/components/ui/Spinner.tsx";

export default function UserDetailPage() {
  //region hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    fetchUserById,
    userData,
    isUserFetchLoading,
    deleteUserById,
    updateUserById,
    isUpdateUserLoading,
    isDeleteLoading,
  } = useUser();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      console.log(id);
      await fetchUserById(Number(id));
    }
    fetchData().then();
  }, [id, fetchUserById]);
  //endregion

  //region functions
  async function handleDelete(): Promise<void> {
    await deleteUserById(Number(id));
    navigate("/user/list");
  }
  async function handleUpdate(updatedData: UserModel): Promise<void> {
    await updateUserById(Number(id), updatedData);
    setIsEditDialogOpen(false);
  }
  //endregion
  if (isUserFetchLoading) {
    return <div className={"flex justify-center"}>Loading...</div>;
  }

  if (!userData) {
    return <div className={"flex justify-center"}>No user found!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button></button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={userData.avatar}
                alt={`${userData.first_name} ${userData.last_name}`}
              />
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">
                {userData.first_name} {userData.last_name}
              </h2>
              <p className="text-gray-500">{userData.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p>
              <strong>ID:</strong> {userData.id}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>First Name:</strong> {userData.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {userData.last_name}
            </p>
          </div>
          <div className="mt-6 space-x-2">
            <Button onClick={() => setIsEditDialogOpen(true)}>Edit</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  {isDeleteLoading && <Spinner />}
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the user account and remove their data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
      <UserDataDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        userData={userData}
        isEditDialog={true}
        isSubmitLoading={isUpdateUserLoading}
        onSave={(updatedData) => {
          console.log("Updated user data:", updatedData);
          handleUpdate(updatedData);
        }}
      />
    </div>
  );
}
