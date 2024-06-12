// import { GameState } from "@/lib/types/game";
import { Cell } from "@/lib/types/game";
import firebase from "../lib/firebase/config";
import {
  getFirestore,
  doc,
  setDoc,
  Firestore,
  DocumentReference,
  SetOptions,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);

type Player = {
  name: string | null;
  symbol: "X" | "O" | null;
};

type PlayerMoves = number[];

export type GameState = {
  players: Player[];
  mini_moves: {
    X?: Cell[] | undefined;
    O?: Cell[] | undefined;
  } | null;
  big_moves: {
    X?: Cell[] | undefined;
    O?: Cell[] | undefined;
  } | null;
  gameID?: string | null;
  currentPlayer: Player["symbol"];
  boardDisabled: boolean;
  winner?: Player["symbol"] | "Tie" | null;
  id: string;
  nextBigCell: string | number | null;
};

// Generate Random Room ID (4 numbers and 1 letter)
const generateRoomID = () => {
  let roomID = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < 4; i++) {
    roomID += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return roomID;
};

// Determine who is the first player pick a number between 0 and 1, 0 == player 1 is X, 1 == player 2
function determineFirstPlayer(): {
  player1: Player["symbol"];
  player2: Player["symbol"];
} {
  const players = ["player1", "player2"];
  const firstPlayer = players[Math.floor(Math.random() * players.length)];
  const secondPlayer = firstPlayer === "player1" ? "player2" : "player1";

  console.log("First Player: ", firstPlayer);

  const result: {
    player1: Player["symbol"];
    player2: Player["symbol"];
  } = {
    player1: firstPlayer === "player1" ? "X" : "O",
    player2: firstPlayer === "player2" ? "X" : "O",
  };

  console.log(result);

  return result;
}

export const useFirebase = () => {
  // Create a room
  const createRoom = async (code: string | null, username: string) => {
    if (!code) return;

    const roles = determineFirstPlayer();

    // Initial Room Data
    const initialRoomData: GameState = {
      id: code,
      players: [
        // Player 1
        {
          name: username,
          symbol: roles.player1,
        },

        // Player 2
        {
          name: null,
          symbol: roles.player2,
        },
      ],
      mini_moves: null,
      big_moves: null,
      currentPlayer: "X",
      boardDisabled: false,
      winner: null,
      gameID: `${generateRoomID()}-${generateRoomID()}`,
      nextBigCell: null,
    };

    try {
      await setDoc(doc(db, "rooms", initialRoomData.id), initialRoomData);
    } catch (e: any) {
      console.log("Error @useFirebase.createRoom: ", e?.message);
    }
  };

  // Join a room and update relevant data
  const joinRoom = async (code: string | null, username: string) => {
    if (!code) return;

    try {
      const roomRef = doc(db, "rooms", code);
      await updateDoc(roomRef, {
        "players.1.name": username,
        boardDisabled: false,
      });
      // const roomSnap = await getDoc(roomRef);

      // if (!roomSnap.exists()) {
      //   console.log("Room does not exist!");
      //   return;
      // }

      // const roomData = roomSnap.data() as GameState;

      // // Update Player 2
      // roomData.players[1].name = username;

      // // Update Room Data
      // await setDoc(roomRef, roomData);
    } catch (e: any) {
      console.log("Error @useFirebase.joinRoom: ", e?.message);
    }
  };

  // Listen to room changes
  const roomChanges = (
    code: string | null,
    callback: (data: GameState | null | undefined) => void
  ) => {
    if (!code) return;

    const roomRef = doc(db, "rooms", code);
    const unsubscribe = onSnapshot(roomRef, (doc) => {
      const roomData = doc.data() as GameState;
      // console.log("Current data: ", roomData);

      callback(roomData);
    });

    return unsubscribe;
  };

  // Send Move to Firebase
  const sendMove = async (
    code: string | null,
    bigCell: Cell | null | undefined,
    smallCell: Cell
  ) => {
    if (!code) return;

    console.log("Sending Move: ", bigCell, smallCell);

    const roomRef = doc(db, "rooms", code);

    await updateDoc(roomRef, {
      mini_moves: {
        [String(smallCell.value)]: smallCell,
      },
      big_moves: {
        [String(bigCell?.value)]: bigCell,
      },
      currentPlayer: bigCell?.value === "X" ? "O" : "X",
      nextBigCell: smallCell.uid,
    });
  };

  return { createRoom, joinRoom, roomChanges, sendMove };
};
