import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { createCode } from "./mode-helper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useFirebase } from "@/hooks/useFirebase";

const CreateGame = ({ setOpen }: { setOpen: any }) => {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    getValues,
    setValue,
  } = useFormContext();

  const { createRoom } = useFirebase();

  const codeGenerated = watch("code");

  // On Mount get username from local storage
  if (!getValues("username")) {
    setValue("username", localStorage.getItem("username") ?? "");
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2 mt-4">
        <span className="text-2xl font-bold text-black">Create Game</span>
        <span className="text-sm text-gray-500">
          Enter your username to create a game
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8">
        {/* User Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            defaultValue={localStorage.getItem("username") ?? ""}
            {...register("username", {
              required: "Username is required",
            })}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="pass"
              checked={getValues("pass")}
              onCheckedChange={(checked) => setValue("pass", checked)}
            />
            <label
              htmlFor="pass"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Set a password for the game
            </label>
          </div>
          <Input
            type="password"
            {...register("password")}
            disabled={!watch("pass")}
            className={cn("", !watch("pass") && "hidden")}
          />
        </div>

        <Separator />

        {/* Code */}
        <div
          className={cn(
            "flex flex-col gap-2 w-full transition-all duration-300 ease-in-out",
            !codeGenerated && "hidden"
          )}
        >
          <span className=" flex flex-col text-sm text-gray-500 w-full">
            Share this code with your friend to join the game:
            <span className="text-lg font-bold text-black mt-4 text-center">
              {getValues("code")}
            </span>
          </span>
        </div>

        <Button
          type="submit"
          form="form-mode"
          disabled={!isDirty && !isValid}
          onClick={async () => {
            if (codeGenerated) {
              const code = getValues("code");
              await createRoom(code, getValues("username"));
              push(
                `/ultimate/play?username=${getValues(
                  "username"
                )}&code=${getValues("code")}`
              );

              setOpen(false);
            } else {
              const code = createCode();
              setValue("code", code);
            }
          }}
        >
          {codeGenerated ? "Join game" : "Generate code"}
        </Button>
      </div>
    </div>
  );
};

export default CreateGame;
