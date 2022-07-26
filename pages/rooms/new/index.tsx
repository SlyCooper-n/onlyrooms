import { PageContainer, PageLayout } from "@components/layouts";
import { Select } from "@components/widgets";
import { useAuth } from "@core/hooks";
import { db } from "@core/services";
import { push, ref } from "firebase/database";
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
          const roomRef = ref(db, "live-questions");

          const room = await push(roomRef, {
            title: roomTitle,
            createdBy: user?.id,
          });

          toast.success("Room created");
          route.push(`/rooms/live-questions/${room.key}`);
        } catch (error) {
          console.log(error);
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

            <Select
              selected={roomType}
              selectValues={["default", "annonymous"]}
              changeValue={(value: RoomType) => setRoomType(value)}
            />

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
