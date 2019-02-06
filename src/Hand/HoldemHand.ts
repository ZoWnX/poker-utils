import {Table, Seat, Position} from '../Table';
import {Card} from '../Card';
import {Action} from './Action';

export interface HoldemAction {
  action: Action;
  seat?: Seat;
  amount?: number;
}

export class HoldemHand {
  private table:Table;
  private gameActions:Array<HoldemAction>;

  public constructor(table:Table) {
    this.table = table;
    this.gameActions = new Array<HoldemAction>();
    this.setUp();
  }

  private setUp():void {
    if(this.table.numberOfSeats === 2) {
      this.gameActions.push({
        action: Action.getAction('blind'),
        seat: this.table.getSeat(2),
        amount: this.table.sb
      });
      this.gameActions.push({
        action: Action.getAction('blind'),
        seat: this.table.getSeat(1),
        amount: this.table.bb
      });
    } else {
      this.gameActions.push({
        action: Action.getAction('blind'),
        seat: this.table.getSeat(1),
        amount: this.table.sb
      });
      this.gameActions.push({
        action: Action.getAction('blind'),
        seat: this.table.getSeat(2),
        amount: this.table.bb
      });
    }
  }

  public whichSeatIsActionOn(step:number):Seat {
    if(step >= this.gameActions.length) {
      throw new Error ('Step exceeds number of steps');
    }

    let checkSeats:Array<Seat> = this.table.getAllSeats();

    let streetToStep:HoldemAction[] = this.getHandActionsForStreet(step);

    //remove all seats that have folded up to this step
    checkSeats = checkSeats.filter((seat) => {
      return !this.hasSeatFolded(seat, step)
    });
    

    let seatPtr:number = 0;
    let completeActionCount:number = 0;
    for(let i:number = 0; i<streetToStep.length; i++) {
      let ha:HoldemAction = streetToStep[i];
      if(ha.action === Action.getAction('fold')) {
        //do nothing
      } else if (ha.action === Action.getAction('check') ||
          ha.action === Action.getAction('call')) {
        completeActionCount++;
        seatPtr++;
      } else if (ha.action === Action.getAction('bet') ||
          ha.action === Action.getAction('blind')) {
        completeActionCount = 1;
        seatPtr++;
      }
      //console.log(`seatPtr ${seatPtr}`);
    }

    return checkSeats[seatPtr % checkSeats.length];
  }

  public whatActionsForStep(step:number):Action[] {
    const streetToStep:HoldemAction[] = this.getHandActionsForStreet(step);
    const seat:Seat = this.whichSeatIsActionOn(step);

    return Action.facingBetActions();
  }

  public pushAction(act:Action, seat:Seat, amt:number) {
    if(act === Action.getAction('call')) {
      amt = this.largestBet(this.gameActions.length);
    }

    this.gameActions.push({
      action: act,
      seat: seat,
      amount: amt
    });
  }

  private getHandActionsForStreet(step:number):HoldemAction[] {
    let checkActions:HoldemAction[] = this.gameActions.slice(0,step);

    //now lets assume all previous rounds of betting where correct
    //lets extract only the current round of betting for this step
    let idx:number = 0;
    let index:HoldemAction[] = checkActions.filter((ha) => {
      return ha.action === Action.getAction('river');
    });
    if(index.length === 0) {
      index = checkActions.filter((ha) => {
        return ha.action === Action.getAction('turn');
      });
    }
    if(index.length === 0) {
      index = checkActions.filter((ha) => {
        return ha.action === Action.getAction('flop');
      });
    }

    if(index.length === 0 ) {
      idx = 0;
    } else {
      idx = checkActions.indexOf(index[0]);
    }

    //this is beginning of the round to the step.
    //console.log(`idx - ${idx} - step - ${step}`);
    return this.gameActions.slice(idx, step+1);
  }

  private largestBet(step:number):number {
    return this.getHandActionsForStreet(step)
      .reverse()
      .filter((ha:HoldemAction)=> {
      return ha.action === Action.getAction('bet') || 
              ha.action === Action.getAction('blind');
    })[0].amount || 0;
  }

  private hasSeatFolded(seat:Seat, step:number):boolean {
    return this.gameActions.slice(0,step).some((ha) => {
      return (ha.action === Action.getAction('fold') &&
              ha.seat === seat);
    });
  }

  public hasMoreAction():boolean {
    return true;
  }

  public numberOfSteps():number {
    return this.gameActions.length;
  }

  public gameListToString():string {
    let s:string = "STEP\tSEAT\tACTION\tAMOUNT\n";
    for(let i:number = 0; i < this.gameActions.length; i++) {
      s += `[${i}]\t`;
      if(this.gameActions[i].action.playerAction) {
        s += `${this.gameActions[i].seat}\t`
        s += `${this.gameActions[i].action}\t`;
        s += `${this.gameActions[i].amount}\t`;
      } else {
        s += `DEALER\t${this.gameActions[i].action}\t`;
      }
      s += `\n`;
    }
    return s;
  }
}