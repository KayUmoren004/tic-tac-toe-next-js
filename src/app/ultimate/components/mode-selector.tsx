"use client";
import { Label } from "@/components/ui/label";

import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateGame from "./create-game";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import JoinGame from "./join-game";

type ModeType = {
  label: string;
  navigate?: string | null;
  modal?: boolean;
};

const modes: ModeType[] = [
  { label: "Play against a friend", modal: true },
  {
    label: "Play against the computer",
    //  navigate: "/ultimate/play"
    navigate: "https://g-umoren.net",
  },
  {
    label: "Watch a game",
    // navigate: "/ultimate/watch"
    navigate: "https://g-umoren.net",
  },
];

type FormValues = {
  username: string;
  pass?: any;
  password?: string;
  code: string | null;
};

const initialValues: FormValues = {
  username: "",
  code: null,
};

const ModeButton = ({ label, navigate }: ModeType) => {
  const methods = useForm<FormValues>({
    defaultValues: initialValues,
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    // Save username to local storage
    localStorage.setItem("username", data.username);

    // console.log(data);
  };

  // States
  const [open, setOpen] = useState<boolean>(false);

  const { push } = useRouter();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} id="form-mode">
        <Dialog open={open && !navigate} onOpenChange={setOpen}>
          <DialogTrigger className="w-full" asChild>
            <Button
              className="w-full"
              onClick={() => {
                if (navigate) {
                  push(navigate);
                }
              }}
            >
              {label}
            </Button>
          </DialogTrigger>
          {/* <DialogContent>
            <Tabs defaultValue="create" className="w-full">
              <TabsList>
                <TabsTrigger value="create">Create Game</TabsTrigger>
                <TabsTrigger value="join">Join Game</TabsTrigger>
              </TabsList>
              <TabsContent value="create">
                <CreateGame setOpen={setOpen} />
              </TabsContent>
              <TabsContent value="join">
                <JoinGame setOpen={setOpen} />
              </TabsContent>
            </Tabs>
          </DialogContent> */}
          <DialogContent>
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mt-4">
                <TabsTrigger value="create">Create Game</TabsTrigger>
                <TabsTrigger value="join">Join Game</TabsTrigger>
              </TabsList>
              <TabsContent value="create">
                <CreateGame setOpen={setOpen} />
              </TabsContent>
              <TabsContent value="join">
                <JoinGame setOpen={setOpen} />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </form>
    </FormProvider>
  );
};

const ModeSelector = () => {
  return (
    <div className="bg-black">
      <div className="container py-8 bg-black h-screen w-screen gap-4 flex flex-col">
        <Label className="text-white text-2xl font-bold text-center">
          Choose a mode to play
        </Label>
        <div className="grid grid-cols-1 gap-4">
          {modes.map((mode) => (
            <ModeButton key={mode.label} {...mode} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;
