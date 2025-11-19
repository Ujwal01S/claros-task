import type { IGetUsersResponse } from "@/types/user.types";
import CardSkeletion from "../card-skeletion";
import CustomCard from "../custom-card";
import { ScrollArea } from "@/components/ui/scroll-area";

const UserGridView = ({
  data,
  isPending,
}: {
  data: IGetUsersResponse;
  isPending: boolean;
}) => {
  return (
    <ScrollArea className="h-[calc(100vh-20vh)]">
      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeletion key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 ">
          {data?.length === 0 ? (
            <p>No Result Found</p>
          ) : (
            <>
              {data?.map((user) => (
                <CustomCard
                  key={user.id}
                  id={user.id}
                  imageUrl={user.avatar}
                  name={user.name}
                  email={user.email}
                  type="User"
                />
              ))}
            </>
          )}
        </div>
      )}
    </ScrollArea>
  );
};

export default UserGridView;
