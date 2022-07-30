import { PageContainer, PageLayout } from "@components/layouts";
import { Select } from "@components/widgets";
import { useAuth } from "@core/hooks";
import { liveRoomsRef } from "@core/services";
import { FirebaseError } from "firebase/app";
import { push } from "firebase/database";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

export type RoomType = "default" | "annonymous";

const NewRoom: NextPage = () => {
  const { user } = useAuth();
  const [roomTitle, setRoomTitle] = useState("");
  const [roomType, setRoomType] = useState<RoomType>("default");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const route = useRouter();
  const selectLabelRef = useRef<HTMLLabelElement>(null);

  async function handleCreateNewRoom(e: FormEvent) {
    e.preventDefault();

    if (roomTitle.trim() === "") {
      inputRef.current?.focus();
      setRoomTitle("");
      toast.error("Please enter a title for the room");
      return;
    }

    if (!user && roomType === "default") {
      toast("Please login to create this room");
      route.push("/login");
      return;
    }

    switch (roomType) {
      case "default":
        try {
          const room = await push(liveRoomsRef(null, "room"), {
            title: roomTitle,
            createdBy: user?.id,
          });

          toast.success("Room created");
          route.push(`/rooms/live-rooms/${room.key}`);
        } catch (error) {
          const err = error as FirebaseError;
          toast.error(err.message);
        }
        break;

      case "annonymous":
        toast.error("Annonymous rooms are not yet supported");
        break;
    }
  }

  return (
    <PageContainer headTitle="OnlyRooms | Create a new Room">
      <PageLayout navbar footer>
        <main className="flex-1 container flex flex-col justify-center items-center">
          <h2 className="mb-12 text-3xl text-center font-title font-semibold">
            Create a new room
          </h2>

          <form
            className="form-control w-full md:w-1/2 gap-4"
            onSubmit={handleCreateNewRoom}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Give a title to your room"
              aria-label="Give a title to your room"
              autoFocus
              value={roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
              className="input bg-white outline-none focus:ring-2 focus:ring-secondary-focus focus:ring-offset-2 focus:ring-offset-base-100"
            />

            <label
              ref={selectLabelRef}
              className="mb-12 w-full flex justify-between items-center"
            >
              <span className="mr-auto">Room type:</span>
              <Select
                selectedValue={roomType}
                changeValue={(value: RoomType) => setRoomType(value)}
                options={[
                  { value: "default", text: "Default" },
                  { value: "annonymous", text: "Annonymous" },
                ]}
              />
            </label>

            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </main>
      </PageLayout>
    </PageContainer>
  );
};

export default NewRoom;
