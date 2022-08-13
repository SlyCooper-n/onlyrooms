import { PageContainer, PageLayout } from "@components/layouts";
import { Select, Tabs, TabsContent } from "@components/widgets";
import { useAuth } from "@core/hooks";
import { liveRoomsRef } from "@core/services";
import { FirebaseSnapshotRoom } from "@core/types";
import { FirebaseError } from "firebase/app";
import { get, push } from "firebase/database";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

export type RoomType = "default" | "annonymous";

const NewRoom: NextPage = () => {
  const { user } = useAuth();
  const [roomTitle, setRoomTitle] = useState("");
  const [roomCode, setRoomCode] = useState("");
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
          route.push(`/rooms/admin/live-rooms/${room.key}`);
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

  async function handleEnterRoom(e: FormEvent) {
    e.preventDefault();

    try {
      const room = (await (
        await get(liveRoomsRef(roomCode, "room"))
      ).val()) as FirebaseSnapshotRoom;

      if (!room || room.isClosed) {
        setRoomCode("");
        toast.error("Room does not exist or it is already closed");
        return;
      }

      setRoomCode("");
      route.push(`/rooms/live-rooms/${roomCode}`);
    } catch (error) {
      const err = error as FirebaseError;
      toast.error(err.message);
    }
  }

  return (
    <PageContainer headTitle="OnlyRooms | Create a new Room">
      <PageLayout navbar footer>
        <main className="flex-1 container flex flex-col justify-center items-center">
          <Tabs triggers={["create", "enter"]}>
            <TabsContent value="create">
              <h2 className="mb-12 text-xl text-center font-title font-semibold">
                Create a new room
              </h2>

              <form
                className="form-control w-full gap-4"
                onSubmit={handleCreateNewRoom}
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Give a title to your room"
                  aria-label="Give a title to your room"
                  // autoFocus
                  value={roomTitle}
                  onChange={(e) => setRoomTitle(e.target.value)}
                  className="input bg-white outline-none focus:ring-2 focus:ring-secondary-focus focus:ring-offset-2 focus:ring-offset-base-100"
                />

                <label
                  ref={selectLabelRef}
                  className="mb-12 w-full flex justify-between items-center"
                >
                  <span className="mr-4">Room type:</span>

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
            </TabsContent>

            <TabsContent value="enter">
              <h2 className="mb-12 text-xl text-center font-title font-semibold">
                Enter in a room
              </h2>

              <form
                className="form-control w-full gap-4"
                onSubmit={handleEnterRoom}
              >
                <input
                  type="text"
                  placeholder="Type the room code"
                  aria-label="Type the room code"
                  // autoFocus
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="input bg-white outline-none focus:ring-2 focus:ring-secondary-focus focus:ring-offset-2 focus:ring-offset-base-100"
                />

                <label
                  ref={selectLabelRef}
                  className="mb-12 w-full flex justify-between items-center"
                >
                  <span className="mr-4">Room type:</span>

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
                  Enter
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </main>
      </PageLayout>
    </PageContainer>
  );
};

export default NewRoom;
