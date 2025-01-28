import type { UserModel } from "@/models/user.model.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { MouseEventHandler } from "react";

function UserListCard({
  data,
  onCardClick,
}: {
  data: UserModel;
  onCardClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <Card
      onClick={onCardClick}
      className="hover:shadow-lg transition-shadow duration-300 cursor-pointer dark:shadow-gray-900"
    >
      <CardContent className="p-4 flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={data.avatar}
            alt={`${data.first_name} ${data.last_name}`}
          />
        </Avatar>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {data.first_name} {data.last_name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.email}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserListCard;
