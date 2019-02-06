import {Position} from './Position';
import {Seat} from './Seat';

export class Table {
  public numberOfSeats: number;
  public seats:Seat[];
  public sb:number;
  public bb:number;
  public bigbet:number;
  public ante:number;

  public constructor(numberOfSeats:number, sb:number, bb:number, ante:number) {
    this.numberOfSeats = numberOfSeats;
    this.seats = [];
    for(let i = 0; i < this.numberOfSeats; i++) {
      let p:Position = Position.getPosition(this.numberOfSeats, i+1);
      this.seats[i] = new Seat(p.shortName, 0, p, i+1);
    }

    this.sb = sb;
    this.bb = bb;
    this.bigbet = bb;
    this.ante = ante;
  }

  public getSeat(seatNum:number):Seat {
    if(seatNum <= 0 || seatNum > this.numberOfSeats) {
      throw new Error("getSeat() seatNum needs to be > 0 and < numberOfSeats");
    }
    return this.seats[seatNum-1];
  }

  // Creates copy of array
  public getAllSeats():Array<Seat> {
    let allSeats:Array<Seat> = new Array<Seat>();
    for(let i:number = 0; i < this.numberOfSeats; i++) {
      allSeats.push(this.seats[i]);
    }
    return allSeats;
  }

  public getNumberOfSeats():number { return this.numberOfSeats; }

  public toString():string {
    let str:string = "";
    for(let i = 0; i < this.numberOfSeats; i++) {
      const p:Position = Position.getPosition(this.numberOfSeats, i+1);
      str += `Seat${i+1}(${p.shortName}) - ${this.seats[i].toString()}`;
      if(i !== this.numberOfSeats - 1) {
        str += '\n';
      }
    }
    return str;
  }

}
