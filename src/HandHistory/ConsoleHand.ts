import {Card} from '../Card';
import {Table, Position} from '../Table';
import {HoldemHand, Action} from '../Hand';
import * as readlineSync from 'readline-sync';

process.stdin.isTTY = process.stdout.isTTY = true;

const tbl:Table = new Table(5,1,2,0);
const h:HoldemHand = new HoldemHand(tbl);
let err:string = "";

do {
  process.stdout.write('\x1B[2J\x1B[0f'); //clear console
  if(err !== "") {
    console.log(`Error: ${err}`);
    err = "";
  }
  console.log(tbl.toString());
  console.log(h.gameListToString());
  console.log(`Action on : ${h.whichSeatIsActionOn(h.numberOfSteps()-1)}`);
  console.log(`Actions Aval : ${h.whatActionsForStep(h.numberOfSteps() -1)}`);
  let action:string = readlineSync.question('What action does player take?').trim().toLowerCase();
  let amt:number = 0;
  if(action === 'bet') {
    amt = Number(readlineSync.question('How much?'));
  }
  try {
    h.pushAction(
      Action.getAction(action),
      h.whichSeatIsActionOn(h.numberOfSteps() - 1),
      amt);
  } catch (e) {
    err = e.toString();
  }
} while (h.hasMoreAction());
/*
function updateToConsole(h:HoldemHand):void {
  const cbr:string = HoldemHand.bettingRoundToString(h.currentBettingRound());
  const currSeat:number = h.getCurrentSeat();
  //const currPlay:string = h.getTable().getSeat(currSeat).toString();
  const acts:Action[] = h.currentAllowedActions();
  console.log('-TABLE');
  console.log(h.getTable().toString());
  console.log('-HAND HISTORY');
  for(let i = BETTING_ROUND.PREFLOP; i<= BETTING_ROUND.RIVER; i++) {
    console.log(`--${HoldemHand.bettingRoundToString(i)}-${h.isBettingRoundFinished(i)}`);
    console.log(`\tidx\tSEAT\tACTION\tAMT`)
    for(let j = 0; j < h.getHandActions()[i].length; j++) {
      let iha:IHandAction = h.getHandActions()[i][j]; 
      console.log(`\t${j}\t${iha.seatNum}\t${iha.action.shortName}\t${iha.amount}`);
    }
  }
  console.log('-Current Action');
  console.log(`Round: ${cbr} | Seat: ${currSeat}`);
  console.log(`Actions: ${acts}`);
}





process.stdin.isTTY = process.stdout.isTTY = true;

let tbl:Table = new Table(4,1,2,0);
for(let i = 1; i <= tbl.numberOfSeats; i++) {
  tbl.getSeat(i).stack = Math.floor(Math.random() * 160) + 40;
}
let h:HoldemHand = new HoldemHand(tbl);
let err:string = "";
while(h.hasMoreAction()) {
  process.stdout.write('\x1B[2J\x1B[0f'); //clear console
  if(err !== "") {
    console.log(`Error: ${err}`);
    err = "";
  }
  updateToConsole(h);
  
  let action:string = readlineSync.question('What action does player take?').trim().toLowerCase();
  let detail:number = 0;
  if(action === 'bet') {
    detail = Number(readlineSync.question('How much?'));
  }
  try {
    h.pushAction(Action.getAction(action),detail);
  } catch (e) {
    err = e.toString();
  }
}
*/