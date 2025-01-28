import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import type { UserModel } from "@/models/user.model.ts";
import Spinner from "@/components/ui/Spinner.tsx";

interface UserDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: UserModel;
  onSave: (updatedData: UserModel) => void;
  isEditDialog: boolean;
  isSubmitLoading: boolean;
}

export default function UserDataDialog({
  isOpen,
  onClose,
  userData,
  onSave,
  isEditDialog,
  isSubmitLoading,
}: UserDataDialogProps) {
  const [userChangedData, setUserChangedData] = useState<UserModel>(
    userData || ({} as UserModel),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserChangedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(userChangedData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditDialog ? "Edit User" : "Create User"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={userChangedData.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={userChangedData.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userChangedData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isSubmitLoading && <Spinner />}
              {isEditDialog ? "Save Changes" : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
